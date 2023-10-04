import { useContext } from 'react';
import DataContext from './DataContext';

function Messages() {
  const { messages } = useContext(DataContext);
  if (null === messages) return null;
  return (
    <div className='show-message'>
      {messages.map((mes) => (
        <div className={'alert alert-' + mes.type} role='alert'>
          {mes.text}
        </div>
      ))}
    </div>
  );
}

export default Messages;