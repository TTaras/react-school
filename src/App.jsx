import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { Header } from '@components/Header';

import { Home } from '@pages/Home';
import { Chats } from '@pages/Chats';
import { Chat } from '@pages/Chat';
import { UserProfile } from '@pages/UserProfile';


export const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />

        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
        <Route exact path="/chats">
          <Chats />
        </Route>
        <Route exact path="/chats/:chatId">
          <Chat />
        </Route>

        {/* TODO: или на страницу 404 */}
        <Redirect to="/" />
      </Switch>
    </>
  );
};

