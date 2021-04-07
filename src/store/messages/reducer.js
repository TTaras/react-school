import { ADD_MESSAGE } from "./types";

const initialState = {};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const newState = Object.assign({}, state);
      const messages = newState[action.chatId] || [];
      const newId = `id_${messages.length + 1}`;

      messages.push({
        id: newId,
        author: action.author,
        text: action.text,
      });

      newState[action.chatId] = messages;

      return newState;
    }

    default:
      return state;
  }
};