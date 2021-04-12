import { deleteMessages } from "@store/messages/actions";
import {
  ADD_CHAT,
  DELETE_CHAT,
  TOGGLE_CHAT_BLINK
} from './types';


export const addChat = (name) => ({
  type: ADD_CHAT,
  name,
});

export const deleteChat = (id) =>
  (dispatch) => {
    dispatch({ type: DELETE_CHAT, id });
    dispatch(deleteMessages(id));
  };

export const toggleChatBlink = (id, toggle) =>
  (dispatch) => {
    dispatch({ type: TOGGLE_CHAT_BLINK, id, toggle });

    if (toggle) {
      setTimeout(() => {
        dispatch({ type: TOGGLE_CHAT_BLINK, id, toggle: false });
      }, 1000);
    }
  }

