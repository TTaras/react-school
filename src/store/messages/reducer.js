import { ADD_MESSAGE, DELETE_MESSAGES } from './types';

const initialState = {};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const messages = state[action.chatId] || [];
      const newId = `id_${messages.length + 1}`;

      return {
        ...state,
        [action.chatId]: messages.concat({
          id: newId,
          author: action.author,
          text: action.text,
        })
      }
    }

    case DELETE_MESSAGES: {
      const messages = { ...state };
      if (messages[action.id]) {
        delete messages[action.id];
      }

      return messages;
    }

    default:
      return state;
  }
};