import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';

import { profileReducer } from "./profile/reducer";
import { chatListReducer } from "./chatList/reducer";
import { messagesReducer } from "./messages/reducer";
import { aboutReducer } from "./about/reducer";

const persistConfig = {
  key: 'react-messager',
  storage,
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const rootReducer = combineReducers({
  profile: profileReducer,
  chatList: chatListReducer,
  messages: messagesReducer,
  about: aboutReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

const persistor = persistStore(store);

export { store, persistor };
