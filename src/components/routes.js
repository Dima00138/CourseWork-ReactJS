import { CHAT_ROUTE, CHATCHOOSE_ROUTE, LOGIN_ROUTE } from "./constants";
import Login from "./Login";
import Chat from "./Chat";
import ChatChooser from "./ChatChooser";
import NotFound from "./NotFound";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <Login/>
    },
    {
        path: "*",
        component: <NotFound/>
    }
];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        component: <Chat/>
    },
    {
        path: CHATCHOOSE_ROUTE,
        component: <ChatChooser/>
    },
    {
        path: "*",
        component: <NotFound/>
    }
]