import './style.scss';
import { Message } from '@components/Message';


export const MessageList = ({ messages }) => {
  const Messages = messages.map((el) => <Message
    key={el.id}
    author={el.author}
    text={el.text}
  />);

  return (
    <div className="message-list">
      {Messages}
    </div>
  );
};