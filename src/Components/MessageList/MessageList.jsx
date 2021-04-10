import './style.scss';
import { Message } from '@components/Message';


export const MessageList = ({ messages, handlerDeleteMessage }) => {
  const Messages = messages.map((el) => <Message
    key={el.id}
    author={el.author}
    text={el.text}
    id={el.id}
    handlerDeleteMessage={handlerDeleteMessage}
  />);

  return (
    <div className="message-list">
      {Messages}
    </div>
  );
};