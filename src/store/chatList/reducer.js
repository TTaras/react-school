import { ADD_CHAT } from "./types";

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
        }
      };
    }

    default:
      return state;
  }
};