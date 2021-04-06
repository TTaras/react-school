import { CHANGE_NAME } from "./types";

const initialState = {
  name: "Name1",
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME: {
      return state;
    }
    default:
      return state;
  }
};