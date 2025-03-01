import { useCallback, useReducer } from "react";
import { Todo, TodoActions, TodoProviderProps, TodoState } from "./types";
import { initialState, reducer } from "./reducer";
import useSafeNavigate from "../../hook/useSafeNavigate";
import { BASE_URL } from "../../util/Interfaces";
import { TodoContext } from "./TodoContext";

function TodoProvider({ children }: TodoProviderProps) {
  const [{ todos, error, currentTodo, isLoading, priority }, dispatch] =
    useReducer<(state: TodoState, action: TodoActions) => TodoState>(
      reducer,
      initialState
    );

  const navigate = useSafeNavigate();

  const fetchTodos = useCallback(async function () {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query GetTodos($isDeleted: Boolean) {
                getTodos(isDeleted: $isDeleted) {
                  id,
                  title,
                  body,
                  updatedAt,
                  priority,
                  dueDate,
                  user {
                    id,
                    email,
                    username
                  },
                  deletedAt
                  }
                }`,
          variables: {
            isDeleted: false,
          },
        }),
      });
      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      dispatch({ type: 'todos/loaded', payload: data.data.getTodos });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading data...',
      });
    }
  }, [dispatch]);

  async function createTodo(newTodo: Todo) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation CreateTodo($title: String! $body: String! $priority: String!, $dueDate: String!) {
            createTodo(title: $title, body: $body, priority: $priority, dueDate: $dueDate) {
              id,
              title,
              body,
              dueDate,
              priority,
              deletedAt,
              isDeleted
              user {
                email
                username
                }
            }
          }`,
          variables: {
            title: newTodo.title,
            body: newTodo.body,
            priority: newTodo.priority,
            dueDate: newTodo.dueDate,
          },
        }),
      });
      const data = await res.json();
      // console.log("created new Todo", data);
      dispatch({ type: 'todo/created', payload: data.data.createTodo });
      clearCurrentTodo();
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating a todo...',
      });
    }
  }

  async function deleteTodo(todoId: string) {
    dispatch({ type: 'loading' });
    // console.log("todoId", todoId);
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation SoftDeleteTodo($id: String!) {
            softDeleteTodo(id: $id) {
                id
                title
                body
                dueDate
                priority
                isDeleted
                deletedAt
                updatedAt
                user{
                    email
                    username
                }
            }
        }`,
          variables: { id: todoId },
        }),
      });
      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const deletedTodo = data.data.softDeleteTodo;
      dispatch({ type: 'todo/deleted', payload: deletedTodo });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting a todo...',
      });
    }
  }

  async function fetchTodo(id: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query GetTodo($id: String!) {
            getTodo(id: $id) {
              id
              title
              body
              priority
              dueDate
              isDeleted
              deletedAt
              user {
                  id
                  username
                  email
              }
            }
          }`,
          variables: {
            id,
          },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const todo = data.data.getTodo;
      dispatch({ type: 'todo/loaded', payload: todo });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error fetching todo...',
      });
    }
  }

  function setCurrentTodo(todo: Todo | null) {
    if (todo) {
      dispatch({ type: 'todo/loaded', payload: todo });
      navigate(`/todos/${todo.id}`);
    } else {
      dispatch({ type: 'todo/cleared' });
      navigate('/todos');
    }
  }

  async function updateTodo(updatedTodo: Todo) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation updateTodo($title: String, $body: String, $isDeleted: Boolean, $deletedAt: String, $dueDate: String, $priority: String, $id: String!) {
          updateTodo(title: $title, body: $body, isDeleted: $isDeleted, deletedAt: $deletedAt, dueDate: $dueDate, priority: $priority, id: $id) {
            id
            title
            body
            isDeleted
            dueDate
            priority
            deletedAt
            user {
                id
                email
                username
            }
          }
          }`,
          variables: {
            id: updatedTodo.id,
            title: updatedTodo.title,
            body: updatedTodo.body,
            priority: updatedTodo.priority,
            dueDate: updatedTodo.dueDate,
          },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const todo = data.data.updateTodo;
      dispatch({ type: 'todo/updated', payload: todo });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error updating Todo...',
      });
    }
  }

  const clearCurrentTodo = useCallback(async function () {
    dispatch({ type: 'todo/cleared' });
  }, []);

  async function searchTodo(searchTerm: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query SearchTodo($searchTerm: String!) {
                    searchTodo(searchTerm: $searchTerm) {
                      id
                      title
                      body
                      updatedAt
                      isDeleted
                      deletedAt
                      user {
                          id
                          username
                          email
                      }
                    }
                  }`,
          variables: {
            searchTerm,
          },
        }),
      });
      const data = await res.json();
      console.log('data from searchTodo', data);
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const searchedItems = data.data.searchNote;
      dispatch({ type: 'todos/loaded', payload: searchedItems });
    } catch {
      dispatch({
        type: 'rejected',
        payload: `There was an error searching for ${searchTerm}...`,
      });
    }
  }

  return (
    <TodoContext.Provider
      value={{
        error,
        dispatch,
        clearCurrentTodo,
        fetchTodos,
        isLoading,
        todos,
        currentTodo,
        setCurrentTodo,
        searchTodo,
        createTodo,
        deleteTodo,
        updateTodo,
        priority,
        fetchTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider };