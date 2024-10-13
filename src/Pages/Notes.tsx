import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import NotesBody from '../Components/NotesBody';
import useNotes from '../context/useNotes';

export default function Notes() {
  const { id } = useParams();
  const { fetchNote } = useNotes();
  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          await fetchNote(id);
        } catch (error) {
          console.error('error fetching Notes', error);
        }
      }
    }
    fetchData();
  }, [id, fetchNote]);

  return (
    <div>
      <Header />
      <NotesBody />
    </div>
  );
}
