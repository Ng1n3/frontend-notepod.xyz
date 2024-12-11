import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import useTodos from '../../hook/useTodos';
import { TodoProvider } from '../TodoContext';

const TestTodoContext = () => {
  const { todos, isLoading } = useTodos();

  return (
    <>
      <div data-testid="todo-length">{todos.length}</div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
    </>
  );
};

describe('intial contex', () => {
  it('should give a list of todos', async () => {
    render(
      <MemoryRouter>
        <TodoProvider>
          <TestTodoContext />
        </TodoProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const todoLength = screen.getByTestId('todo-length');
      const loadingState = screen.getByTestId('loading-state');
      expect(todoLength.textContent).toBe('4');
      expect(loadingState.textContent).toBe('loaded');
    });
  });
});

const TestSingleTodo = ({ todoId }: { todoId: string }) => {
  const { isLoading, currentTodo, fetchTodo } = useTodos();
  return (
    <>
      <button data-testid="fetch-todo" onClick={() => fetchTodo(todoId)}>
        Fetch Todo
      </button>
      <div data-testid="current-todo">
        <div data-testid="todo-id">{currentTodo?.id}</div>
        <div data-testid="todo-title">{currentTodo?.title}</div>
        <div data-testid="todo-body">{currentTodo?.body}</div>
        <div data-testid="todo-priority">{currentTodo?.priority}</div>
      </div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
    </>
  );
};

describe('fetch a single todo', () => {
  it('fetch a todo by using an id', async () => {
    const todoid = 'bk2hTJN89x';

    render(
      <MemoryRouter>
        <TodoProvider>
          <TestSingleTodo todoId={todoid} />
        </TodoProvider>
      </MemoryRouter>
    );

    user.click(screen.getByTestId('fetch-todo'));

    await waitFor(() => {
      const todoId = screen.getByTestId('todo-id');
      const todoTitle = screen.getByTestId('todo-title');
      const todoBody = screen.getByTestId('todo-body');
      const todoPriority = screen.getByTestId('todo-priority');
      const loadingState = screen.getByTestId('loading-state');

      expect(todoId.textContent).toBe(todoid);
      expect(todoTitle.textContent).toBe('Grocery Shopping');
      expect(todoBody.textContent).toBe(
        'Buy milk, eggs, and bread from the store.'
      );
      expect(todoPriority.textContent).toBe('MEDIUM');
      expect(loadingState.textContent).toBe('loaded');
    });
  });
});