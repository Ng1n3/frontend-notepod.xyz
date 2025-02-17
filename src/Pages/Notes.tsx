import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import NotesBody from '../Components/NotesBody';
import {useNotes} from '../hook/useNotes';

export default function Notes() {
  const { id } = useParams();
  const { fetchNote } = useNotes();
  const fetchNoteRef = useRef(fetchNote);
  const initalLoadDone = useRef(false);

  useEffect(() => {
    fetchNoteRef.current = fetchNote;
  }, [fetchNote]);

  useEffect(() => {
    async function fetchData() {
      if (id && initalLoadDone.current) {
        try {
          initalLoadDone.current = true;
          await fetchNoteRef.current(id, false);
        } catch (error) {
          console.error('error fetching Notes', error);
        }
      }
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <Header />
      <NotesBody />
    </div>
  );
}