import TodoListItem from './TodoListItem';
import styles from './NoteListBody.module.css'
import ListHeader from './ListHeader';

const todos = [
  {
    task: 'Complete project proposal',
    description:
      'Write and submit the project proposal for the new client project. Include timeline, budget, and resource allocation.',
    dueDate: '2024-09-15',
    deletedDate: '',
    priority: 'High',
  },
  {
    task: 'Schedule team meeting',
    description:
      'Arrange a team meeting to discuss the upcoming sprint goals and assign tasks to team members.',
    dueDate: '2024-08-25',
    deletedDate: '',
    priority: 'Medium',
  },
  {
    task: 'Update documentation',
    description:
      'Review and update the user documentation for the latest software release. Ensure all new features are properly documented.',
    dueDate: '2024-09-10',
    deletedDate: '',
    priority: 'Low',
  },
  {
    task: 'Fix issue #34',
    description:
      'Review codebase and fix the issues of  payment not being updated on the frontend page of the user when he logs in as a vip user.',
    dueDate: '2024-09-12',
    deletedDate: '',
    priority: 'High',
  },
  {
    task: 'Upgrade Axios package',
    description:
      'Review the previous code for understanding and update the axios packages to take advantage of the new style of fetching so we do not have to use fetch',
    dueDate: '2024-09-15',
    deletedDate: '',
    priority: 'Medium',
  },
];

export default function TodoListBody() {
  return (
    <div>
      <ListHeader/>
      <div className={styles.listBody}>
        {todos.map((todo, index) => (
          <TodoListItem
            key={index}
            task={todo.task}
            description={todo.description}
            dueDate={todo.dueDate}
            priority={todo.priority}
            deletedDate={todo.deletedDate}
          />
        ))}
      </div>
    </div>
  );
}
