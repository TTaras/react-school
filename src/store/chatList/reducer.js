import { ADD_CHAT } from "./types";
import { TOGGLE_CHAT_BLINK } from './types';

const initialState = {};

export const chatListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT: {
      const newId = `id_${Object.keys(state).length + 1}`;
      return {
        ...state,
        [newId]: {
          id: newId,
          name: action.name,
          isBlink: false,
        }
      };
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