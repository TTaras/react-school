import { createStore, combineReducers } from "redux";

import { profileReducer } from "./profile/reducer";
import { messagerReducer } from "./messager/reducer";

// ====== combineReducers and devtools ext =====
export const store = createStore(
  combineReducers({
    profile: profileReducer,
    messager: messagerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.dispatch({type: 'CHANGE_NAME', payload: 'new name'});
//import storage from "@utils/storage";

/*
storage.ready((data) => {
  const chatList = data?.chatList || {};
  const storedMessages = data[`chat_${chatId}`] || [];
  setMessages(storedMessages);
});*/
