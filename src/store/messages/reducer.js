import { ADD_MESSAGE, DELETE_MESSAGES, DELETE_MESSAGE } from './types';

const initialState = {};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const messages = state[action.chatId] || [];
      const newId = `id_${Date.now()}`;

      return {
        ...state,
        [action.chatId]: messages.concat({
          id: newId,
          author: action.author,
          text: action.text,
        })
      }
    }

    // delete chat (all messages)
    case DELETE_MESSAGES: {
      const messages = { ...state };
      if (messages[action.chatId]) {
        delete messages[action.chatId];
      }

      return messages;
    }

    // delete message by messageId in chatId
    case DELETE_MESSAGE: {
      const messages = { ...state };
      const chatMessages = messages[action.chatId];
      if (chatMessages) {
        let index;

        for (let i = 0; i < chatMessages.length; i++) {
          if (chatMessages[i].id === action.messageId) {
            index = i;
            break;
          }
        }

        if (index !== undefined) {
          chatMessages.splice(index, 1);
        }
      }

      return messages;
    }

    default:
      return state;
  }
};