import { ADD_CHAT } from "./types";
import { ADD_MESSAGE } from "./types";

const initialState = {
  chatList: {},
  chats: {},
};

export const messagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT: {
      const newId = `id_${Object.keys(state.chatList).length + 1}`;
      return {
        ...state,
        chatList: {
          ...state.chatList,
          [newId]: {
            id: newId,
            name: action.name,
          }
        }
      };

      /*storage.set('chatList', newList)
        .then(() => setChatList(newList));*/
    }

    case ADD_MESSAGE: {
      const newState = Object.assign({}, state);
      const messages = newState.chats[action.chatId] || [];
      const newId = `id_${messages.length + 1}`;

      messages.push({
        id: newId,
        author: action.author,
        text: action.text,
      });

      newState.chats[action.chatId] = messages;

      return newState;

      /*storage.set(`chat_${chatId}`, newMessages)
      .then(() => setMessages(newMessages));*/
    }

    default:
      return state;
  }
};