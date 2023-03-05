import React from 'react';
import { useContext } from 'react';
import {Route, Switch, Redirect, useLocation} from "react-router-dom";
import { CHATCHOOSE_ROUTE, LOGIN_ROUTE } from './constants';
import { privateRoutes, publicRoutes } from './routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';

const AppRouters = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth.getAuth());
    const location = useLocation();

    return user ?
    (
        <Switch>
            {privateRoutes.map(({path, component}, i) => 
                <Route key={i} path={path} exact={false}>
                    {location.pathname === "/login" || location.pathname === "/" ? 
                    (<Redirect to={CHATCHOOSE_ROUTE}/>) :
                    component}
                </Route>
            )}
            
        </Switch>
    )
    :
    (
        <Switch>
            {publicRoutes.map(({path, component}, i) => 
                <Route key={i} path={path} exact={true}>
                {location.pathname.startsWith("/chat") || location.pathname === "/chat_choose" || location.pathname === "/" ? 
                    (<Redirect to={LOGIN_ROUTE}/>) :
                    component}
                </Route>
            )}
        </Switch>
    );
}

export default AppRouters;
