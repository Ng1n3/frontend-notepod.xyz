import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CurrentTodoBody() {
  return (
    <div>
      <ul>
        <li>
          <span>
            <FontAwesomeIcon icon={faCircle} size="lg" /> 
          </span>
          Lorem ipsum
        </li>
        <li>
          <span>
            <FontAwesomeIcon icon={faCircle} size="lg" /> 
          </span>
          Lorem ipsum
        </li>
        <li>
          <span>
            <FontAwesomeIcon icon={faCircle} size="lg" /> 
          </span>
          Lorem ipsum
        </li>
        <li>
          <span>
            <FontAwesomeIcon icon={faCircle} size="lg" /> 
          </span>
          Lorem ipsum
        </li>
      </ul>
    </div>
  );
}
