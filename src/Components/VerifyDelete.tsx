import useNotes from '../hook/useNotes';
import useSafeNavigate from '../hook/useSafeNavigate';
import useTodos from '../hook/useTodos';
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
  const navigate = useSafeNavigate();
  const { isLoading, deleteNote, clearCurrentNote } = useNotes();
  const { deleteTodo } = useTodos();
  if (isLoading) return <Spinner />;
  function handleDelete() {
    if (itemType === 'note') {
      deleteNote(id);
      clearCurrentNote();
      navigate('/notes');
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
