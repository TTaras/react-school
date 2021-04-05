import './style.scss';

import storage from "@utils/storage";
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageField } from '@components/MessageField';
import { ChatList } from '@components/ChatList';
import { AUTHORS } from '@utils/constants';

export const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    storage.ready((data) => {
      const chatList = data?.chatList || {};

      if (!chatList[chatId]) {
        throw new Error('undefined chat');
      }

      const storedMessages = data[`chat_${chatId}`] || [];
      setMessages(storedMessages);
    });
  }, [chatId]);

  const handlerAddMessage = useCallback((text, author = AUTHORS.ME) => {
    const newMessages = [...messages, {
      id: `id_${messages.length + 1}`, author, text
    }];

    storage.set(`chat_${chatId}`, newMessages)
      .then(() => setMessages(newMessages));
  }, [chatId, messages]);

  return (
    <div className="chat">
      <div className="chat__message-field">
        <MessageField messages={messages} chatId={chatId} handlerAddMessage={handlerAddMessage} />
      </div>
      <div className="chat__chat-list">
        <ChatList activeId={chatId} />
      </div>
    </div>
  );
};