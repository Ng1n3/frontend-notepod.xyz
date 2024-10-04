import { useNavigate } from 'react-router-dom';

export default function useSafeNavigate() {
  const navigate = useNavigate();
  return function (to: string) {
    if (typeof navigate === 'function') {
      navigate(to);
    } else {
      console.warn('Navigation is not available in this context');
    }
  };
}
