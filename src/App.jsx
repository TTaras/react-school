import {Switch, Redirect, Route, useLocation} from 'react-router-dom';
import {Header} from '@/Components';
import {Main} from '@pages';


export const App = () => {
    const {pathname} = useLocation();
    return (
        <div>
            <Header/>
            <Switch>
                <Redirect from='/:url*(/+)' to={pathname.slice(0, -1)}/>

                <Route exact path='/'>
                    <Main />
                </Route>
            </Switch>
        </div>
    );
};
