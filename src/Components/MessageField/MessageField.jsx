import './style.scss';

import { useEffect } from 'react';
import { MessageList } from '@components/MessageList';
import { MessageInput } from '@components/MessageInput';
import { AUTHORS } from '@utils/constants';


export const MessageField = ({ messages, chatId, handlerAddMessage }) => {
  useEffect(() => {
    let timer;
    const lastMessage = messages.length && messages[messages.length - 1];

    if (lastMessage && lastMessage.author !== AUTHORS.BOT) {
      timer = setTimeout(() => {
        handlerAddMessage('Ok', AUTHORS.BOT);
      }, 400);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [messages, handlerAddMessage]);

  return (
    <div className="message-field">
      <MessageList messages={messages}/>
      <MessageInput handlerAddMessage={handlerAddMessage} chatId={chatId} />
    </div>
  );
};