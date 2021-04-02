import {Switch, Route} from 'react-router-dom';
import {Header} from '@components/Header';
import {MessageField} from '@components/MessageField';
import {ChatList} from '@components/ChatList';

//import {Container} from '@material-ui/core';
//import Paper from '@material-ui/core/Paper';
//import {Grid} from '@material-ui/core';


export const App = () => {
    return (
        <>
            <Header/>
            <Switch>
                <Route exact path='/'>
                    <MessageField />
                    <ChatList />
                </Route>
            </Switch>
        </>
    );
};

