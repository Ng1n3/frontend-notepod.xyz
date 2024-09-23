import useNotes from '../context/useNotes';
import Button from './Button';
import Spinner from './Spinner';

interface verifyDeleteProp {
  noteId: number;
  onClose: () => void;
}

export default function VerifyDelete({noteId, onClose}:verifyDeleteProp) {
  const { isLoading, deleteNote } = useNotes();
  if (isLoading) return <Spinner />;
  function handleDelete() {
    deleteNote(noteId);
    onClose();
  }
  return (
    <div>
      <h3>Are you sure you want to delete this note </h3>
      <div>
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </div>
    </div>
  );
}
