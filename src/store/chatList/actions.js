import { ADD_CHAT } from "./types";

export const addChat = (name) => ({
  type: ADD_CHAT,
  name,
});