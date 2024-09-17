import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DeletedPasswordBody.module.css';

const todos = [
  {
    task: 'Complete project proposal',
    description:
      'Write and submit the project proposal for the new client project. Include timeline, budget, and resource allocation.',
    dueDate: '2024-09-15',
    deletedDate: '2024-08-20',
    priority: 'High',
  },
  {
    task: 'Schedule team meeting',
    description:
      'Arrange a team meeting to discuss the upcoming sprint goals and assign tasks to team members.',
    dueDate: '2024-08-25',
    deletedDate: '2024-08-19',
    priority: 'Medium',
  },
  {
    task: 'Update documentation',
    description:
      'Review and update the user documentation for the latest software release. Ensure all new features are properly documented.',
    dueDate: '2024-09-10',
    deletedDate: '2024-08-18',
    priority: 'Low',
  },
  {
    task: 'Fix issue #34',
    description:
      'Review codebase and fix the issues of  payment not being updated on the frontend page of the user when he logs in as a vip user.',
    dueDate: '2024-09-12',
    deletedDate: '2024-08-17',
    priority: 'High',
  },
  {
    task: 'Upgrade Axios package',
    description:
      'Review the previous code for understanding and update the axios packages to take advantage of the new style of fetching so we do not have to use fetch',
    dueDate: '2024-09-15',
    deletedDate: '2024-08-16',
    priority: 'Medium',
  },
];

const WORDS_BODY_LIMIT = 10;
const WORDS_HEAD_LIMIT = 3;

function shortentext(text: string, wordsLimit: number) {
  const words = text.split(' ');
  if (words.length > wordsLimit) {
    return words.slice(0, wordsLimit).join(' ') + '...';
  }
  return text;
}


export default function DeletedTodos() {
  return (
    <div>
      <h1 className={styles.deletedHeading}>Deleted Todos</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Descriptoin</th>
              <th>Priority</th>
              <th>deletedDate</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((entry, index) => (
              <tr key={index}>
                <td>{shortentext(entry.task, WORDS_HEAD_LIMIT)}</td>
                <td>{shortentext(entry.description, WORDS_BODY_LIMIT)} </td>
                <td>{entry.priority} </td>
                <td className={styles.copy}>
                  {entry.deletedDate}
                  <span>
                    <FontAwesomeIcon
                      icon={faTrashCanArrowUp}
                      className={styles.pics}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
