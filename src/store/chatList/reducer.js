import { ADD_CHAT, DELETE_CHAT, TOGGLE_CHAT_BLINK } from "./types";

const initialState = {};

export const chatListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT: {
      const newId = `id_${Date.now()}`;
      return {
        ...state,
        [newId]: {
          id: newId,
          name: action.name,
          isBlink: false,
        }
      };
    }

    case DELETE_CHAT: {
      const chats = { ...state };
      if (chats[action.id]) {
        delete chats[action.id];
      }

      return chats;
    }

    case TOGGLE_CHAT_BLINK: {
      const chat = state[action.id];
      if (!chat) return;

      const obj = {
        ...state,
        [action.id]: {
          ...chat,
          isBlink: !!action.toggle
        }
      }

      return obj;
    }

    default:
      return state;
  }
};