import { createStore, combineReducers } from "redux";

import { profileReducer } from "./profile/reducer";
import { chatListReducer } from "./chatList/reducer";
import { messagesReducer } from "./messages/reducer";


export const store = createStore(
  combineReducers({
    profile: profileReducer,
    chatList: chatListReducer,
    messages: messagesReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);