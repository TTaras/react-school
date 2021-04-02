import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Header } from '@components/Header';
import { MessageField } from '@components/MessageField';
import { ChatList } from '@components/ChatList';


export const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header/>
      <Switch>
        <Redirect from='/:url*(/+)' to={pathname.slice(0, -1)}/>

        <Route exact path='/'>
          <MessageField/>
          <ChatList/>
        </Route>

        {/* TODO: или на страницу 404 */}
        <Redirect to='/'/>
      </Switch>
    </>
  );
};

