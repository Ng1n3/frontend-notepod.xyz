import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DeletedPasswordBody.module.css';

const notes = [
  {
    title: 'Items for Mexico',
    body: 'Mollit aliquip Lorem voluptate cillum magna cupidatat sit commodo consequat cillum. Ut esse magna nisi magna ex pariatur commodo consequat cillum cupidatat id reprehenderit esse. Irure qui consequat occaecat commodo duis aliquip nostrud quis adipisicing ea ipsum do. Reprehenderit do ex mollit mollit Lorem occaecat reprehenderit non id anim. Nulla nisi dolor tempor labore irure commodo voluptate.',
    date: '20/08/2024',
  },
  {
    title: 'Items for Mexico',
    body: 'Mollit aliquip Lorem voluptate cillum magna cupidatat sit commodo consequat cillum. Ut esse magna nisi magna ex pariatur commodo consequat cillum cupidatat id reprehenderit esse. Irure qui consequat occaecat commodo duis aliquip nostrud quis adipisicing ea ipsum do. Reprehenderit do ex mollit mollit Lorem occaecat reprehenderit non id anim. Nulla nisi dolor tempor labore irure commodo voluptate.',
    date: '20/08/2024',
  },
  {
    title: 'Items for Mexico',
    body: 'Mollit aliquip Lorem voluptate cillum magna cupidatat sit commodo consequat cillum. Ut esse magna nisi magna ex pariatur commodo consequat cillum cupidatat id reprehenderit esse. Irure qui consequat occaecat commodo duis aliquip nostrud quis adipisicing ea ipsum do. Reprehenderit do ex mollit mollit Lorem occaecat reprehenderit non id anim. Nulla nisi dolor tempor labore irure commodo voluptate.',
    date: '20/08/2024',
  },
  {
    title: 'Items for Mexico',
    body: 'Mollit aliquip Lorem voluptate cillum magna cupidatat sit commodo consequat cillum. Ut esse magna nisi magna ex pariatur commodo consequat cillum cupidatat id reprehenderit esse. Irure qui consequat occaecat commodo duis aliquip nostrud quis adipisicing ea ipsum do. Reprehenderit do ex mollit mollit Lorem occaecat reprehenderit non id anim. Nulla nisi dolor tempor labore irure commodo voluptate.',
    date: '20/08/2024',
  },
  {
    title: 'Items for Mexico',
    body: 'Mollit aliquip Lorem voluptate cillum magna cupidatat sit commodo consequat cillum. Ut esse magna nisi magna ex pariatur commodo consequat cillum cupidatat id reprehenderit esse. Irure qui consequat occaecat commodo duis aliquip nostrud quis adipisicing ea ipsum do. Reprehenderit do ex mollit mollit Lorem occaecat reprehenderit non id anim. Nulla nisi dolor tempor labore irure commodo voluptate.',
    date: '20/08/2024',
  },
  {
    title: 'Items for Mexico',
    body: 'Mollit aliquip Lorem voluptate cillum magna cupidatat sit commodo consequat cillum. Ut esse magna nisi magna ex pariatur commodo consequat cillum cupidatat id reprehenderit esse. Irure qui consequat occaecat commodo duis aliquip nostrud quis adipisicing ea ipsum do. Reprehenderit do ex mollit mollit Lorem occaecat reprehenderit non id anim. Nulla nisi dolor tempor labore irure commodo voluptate.',
    date: '20/08/2024',
  },
  {
    title: 'Items for Mexico',
    body: 'Mollit aliquip Lorem voluptate cillum magna cupidatat sit commodo consequat cillum. Ut esse magna nisi magna ex pariatur commodo consequat cillum cupidatat id reprehenderit esse. Irure qui consequat occaecat commodo duis aliquip nostrud quis adipisicing ea ipsum do. Reprehenderit do ex mollit mollit Lorem occaecat reprehenderit non id anim. Nulla nisi dolor tempor labore irure commodo voluptate.',
    date: '20/08/2024',
  },
];

const WORDSBODYLIMIT = 10;
const WORDSHEADLIMIT = 3;

function shortentext(text: string, wordsLimit: number) {
  const words = text.split(' ');
  if (words.length > wordsLimit) {
    return words.slice(0, wordsLimit).join(' ') + '...';
  }
  return text;
}

export default function DeletedNotesBody() {
  return (
    <div>
      <h1 className={styles.deletedHeading}>Deleted Notes</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <th>Title</th>
            <th>body</th>
            <th>Deleted Date</th>
          </thead>
          <tbody>
            {notes.map((entry, index) => (
              <tr key={index}>
                <td>{shortentext(entry.title, WORDSHEADLIMIT)}</td>
                <td>{shortentext(entry.body, WORDSBODYLIMIT)}</td>
                <td className={styles.copy}>
                  {entry.date}{' '}
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
