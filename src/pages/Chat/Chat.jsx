import './style.scss';

import { useParams } from 'react-router-dom';
import { MessageField } from '@components/MessageField';
import { ChatList } from '@components/ChatList';

export const Chat = () => {
  const { chatId } = useParams();

  return (
    <div className="chat">
      <div className="chat__message-field">
        <MessageField chatId={chatId} />
      </div>
      <div className="chat__chat-list">
        <ChatList activeId={chatId} />
      </div>
    </div>
  );
};