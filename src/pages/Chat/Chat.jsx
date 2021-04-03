import './style.scss';

import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MessageField } from '@components/MessageField';
import { ChatList } from '@components/ChatList';
import { AUTHORS } from '@utils/constants';

export const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState({
    'id_1': [{ id: 'id_1', author: AUTHORS.BOT, text: 'Hey!' }],
    'id_2': [{ id: 'id_1', author: AUTHORS.BOT, text: 'Hey!' }],
    'id_3': [{ id: 'id_1', author: AUTHORS.BOT, text: 'Hey!' }],
    'id_4': [{ id: 'id_1', author: AUTHORS.BOT, text: 'Hey!' }],
    'id_5': [{ id: 'id_1', author: AUTHORS.BOT, text: 'Hey!' }],
  });

  const chatMessages = messages[chatId];

  if (!chatMessages) {
    throw new Error('undefined chat');
  }

  const handlerAddMessage = useCallback((text, author = AUTHORS.ME) => {
    setMessages((oldMessages) => {
      const newMessages = Object.assign({}, oldMessages);

      newMessages[chatId] = [...newMessages[chatId], {
        id: `id_${newMessages[chatId].length + 1}`, author, text
      }];

      return newMessages;
    });
  }, [chatId]);

  return (
    <div className="chat">
      <div className="chat__message-field">
        <MessageField messages={chatMessages} handlerAddMessage={handlerAddMessage}/>
      </div>
      <div className="chat__chat-list">
        <ChatList activeId={chatId}/>
      </div>
    </div>
  );
};