import './style.scss';

import { useState, useEffect, useCallback } from "react";
import { MessageList } from '@components/MessageList';
import { MessageInput } from '@components/MessageInput';
import { AUTHORS } from '@utils/constants';


export const MessageField = () => {
  const [ messages, setMessages ] = useState([ { id: 'id_1', author: AUTHORS.BOT, text: 'Hey!' } ]);

  const handlerAddMessage = useCallback((text, author = AUTHORS.ME) => {
    setMessages((oldMessages) => [ ...oldMessages, {
      id: `id_${oldMessages.length + 1}`, author, text
    } ]);
  }, []);

  useEffect(() => {
    let timer;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.author !== AUTHORS.BOT) {
      timer = setTimeout(() => {
        handlerAddMessage('Ok', AUTHORS.BOT);
      }, 400);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [ messages, handlerAddMessage ]);

  return (
    <div className='message-field'>
      <MessageList messages={messages}/>
      <MessageInput handlerAddMessage={handlerAddMessage}/>
    </div>
  );
};