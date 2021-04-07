import { ADD_MESSAGE } from "./types";

export const addMessage = (text, author, chatId) => ({
  type: ADD_MESSAGE,
  text,
  author,
  chatId,
});