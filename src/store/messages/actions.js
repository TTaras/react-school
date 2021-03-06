import { ADD_MESSAGE, DELETE_MESSAGES, DELETE_MESSAGE } from "./types";
import { toggleChatBlink } from "@store/chatList/actions";
import { AUTHORS } from '@utils/constants';


export const addMessage = (text, author, chatId) =>
  (dispatch, getStore) => {
    dispatch({ type: ADD_MESSAGE, text, author, chatId });

    if (author === AUTHORS.ME) {
      const messageList = getStore().messages[chatId] || [];
      const lastMessage = messageList.length && messageList[messageList.length - 1];

      if (lastMessage && lastMessage.author !== AUTHORS.BOT) {
        setTimeout(() => {
          dispatch({ type: ADD_MESSAGE, text: 'Ok', author: AUTHORS.BOT, chatId });
          dispatch(toggleChatBlink(chatId, true));
        }, 400);
      }
    }
  }

export const deleteMessages = (chatId) => ({
  type: DELETE_MESSAGES,
  chatId
})

export const deleteMessage = (messageId, chatId) => ({
  type: DELETE_MESSAGE,
  messageId,
  chatId
})
