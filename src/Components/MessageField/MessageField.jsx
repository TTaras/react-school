import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { MessageList } from '@components/MessageList';
import { MessageInput } from '@components/MessageInput';
import { AUTHORS } from '@utils/constants';

import { addMessage, deleteMessage } from "@store/messages/actions";

import Alert from '@material-ui/lab/Alert';

export const MessageField = ({ chatId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const chatList = useSelector(state => state.chatList);
  const chatMessages = messages[chatId] || [];

  const handlerAddMessage = useCallback((text, author = AUTHORS.ME) => {
    dispatch(addMessage(text, author, chatId));
  }, [chatId, dispatch]);

  const handlerDeleteMessage = useCallback(messageId => {
    dispatch(deleteMessage(messageId, chatId));
  }, [dispatch, chatId]);

  if (!chatList[chatId]) {
    return (
      <Alert severity="error">Undefined chat</Alert>
    );
  }

  return (
    <div className="message-field">
      <MessageList messages={chatMessages} handlerDeleteMessage={handlerDeleteMessage} />
      <MessageInput chatId={chatId} handlerAddMessage={handlerAddMessage} />
    </div>
  );
};