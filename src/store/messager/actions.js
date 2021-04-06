import { ADD_CHAT } from "./types";
import { ADD_MESSAGE } from "./types";


export const addChat = (name) => ({
  type: ADD_CHAT,
  name,
});

export const addMessage = (text, author, chatId) => ({
  type: ADD_MESSAGE,
  text,
  author,
  chatId,
});