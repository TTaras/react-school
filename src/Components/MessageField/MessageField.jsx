import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { MessageList } from '@components/MessageList';
import { MessageInput } from '@components/MessageInput';
import { AUTHORS } from '@utils/constants';

import { addMessage } from "@store/messager/actions";


export const MessageField = ({ chatId }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.messager);
  const chatList = data.chatList;
  const chats = data.chats;
  const messages = chats[chatId] || [];

  if (!chatList[chatId]) {
    throw new Error('undefined chat');
  }

  const handlerAddMessage = useCallback((text, author = AUTHORS.ME) => {
    dispatch(addMessage(text, author, chatId));
  }, [chatId, dispatch]);

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
  }, [messages.length, handlerAddMessage]);

  return (
    <div className="message-field">
      <MessageList messages={messages} />
      <MessageInput chatId={chatId} handlerAddMessage={handlerAddMessage} />
    </div>
  );
};