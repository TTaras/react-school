import { ADD_MESSAGE } from "./types";

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

    default:
      return state;
  }
};