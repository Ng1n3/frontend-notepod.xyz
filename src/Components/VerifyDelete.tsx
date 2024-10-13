import useNotes from '../context/useNotes';
import useTodos from '../context/useTodos';
import Button from './Button';
import Spinner from './Spinner';

interface verifyDeleteProp {
  id: string;
  onClose: () => void;
  itemType: string;
}

export default function VerifyDelete({
  id,
  onClose,
  itemType,
}: verifyDeleteProp) {
  const { isLoading, deleteNote, clearCurrentNote } = useNotes();
  const { deleteTodo } = useTodos();
  if (isLoading) return <Spinner />;
  function handleDelete() {
    if (itemType === 'note') {
      deleteNote(id);
      clearCurrentNote();

    }
    if (itemType === 'todo') {
      // console.log('hi i reached here');
      deleteTodo(id);
    }
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
