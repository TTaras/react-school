import { CHANGE_NAME } from "./types";

const initialState = {
  name: "Default name",
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.name
      };
    }
    default:
      return state;
  }
};