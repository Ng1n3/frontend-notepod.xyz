import { Priority, TodoActions, TodoState } from "./types";

export const initialState: TodoState = {
  todos: [],
  isLoading: false,
  currentTodo: null,
  priority: Priority.LOW,
  error: '',
};

export function reducer(state: TodoState, action: TodoActions) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'todos/loaded':
      return { ...state, isLoading: false, todos: action.payload };

    case 'todo/loaded':
      return { ...state, isLoading: false, currentTodo: action.payload };

    case 'todo/created':
      return {
        ...state,
        isLoading: false,
        todos: [...state.todos, action.payload],
        currentTodo: action.payload,
      };

    case 'todo/restored':
      return {
        ...state,
        isLoaded: false,
        todos: [...state.todos, action.payload],
      };

    case 'todo/updated':
      return {
        ...state,
        isLoading: false,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        currentTodo: action.payload,
      };

    case 'todo/deleted':
      return {
        ...state,
        isLoading: false,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        currentTodo:
          state.currentTodo?.id === action.payload.id
            ? null
            : state.currentTodo,
      };

    case 'todo/cleared':
      return {
        ...state,
        isLoading: false,
        currentTodo: null,
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unkown action type');
  }
}