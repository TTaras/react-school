import { ADD_CHAT, TOGGLE_CHAT_BLINK } from './types';

export const addChat = (name) => ({
  type: ADD_CHAT,
  name,
});

export const toggleChatBlink = (id, toggle) =>
  (dispatch) => {
    dispatch({ type: TOGGLE_CHAT_BLINK, id, toggle });

    if (toggle) {
      setTimeout(() => {
        dispatch({ type: TOGGLE_CHAT_BLINK, id, toggle: false });
      }, 1000);
    }
  }