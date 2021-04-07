import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { MessageList } from '@components/MessageList';
import { MessageInput } from '@components/MessageInput';
import { AUTHORS } from '@utils/constants';

import { addMessage } from "@store/messages/actions";

import Alert from '@material-ui/lab/Alert';

export const MessageField = ({ chatId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const chatList = useSelector(state => state.chatList);
  const messageList = messages[chatId] || [];

  const handlerAddMessage = useCallback((text, author = AUTHORS.ME) => {
    dispatch(addMessage(text, author, chatId));
  }, [chatId, dispatch]);

  useEffect(() => {
    let timer;
    const messageList = messages[chatId] || [];
    const lastMessage = messageList.length && messageList[messageList.length - 1];

    if (lastMessage && lastMessage.author !== AUTHORS.BOT) {
      timer = setTimeout(() => {
        handlerAddMessage('Ok', AUTHORS.BOT);
      }, 400);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [messages, chatId, handlerAddMessage]);


  if (!chatList[chatId]) {
    return (
      <Alert severity="error">Undefined chat</Alert>
    );
  }

  return (
    <div className="message-field">
      <MessageList messages={messageList} />
      <MessageInput chatId={chatId} handlerAddMessage={handlerAddMessage} />
    </div>
  );
};