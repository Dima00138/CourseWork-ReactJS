import {getCookie } from './../components/FuncForCookie';

export const initialState = {
    'LOGIN': {payload: false},
    'DIALOG_OPEN': {payload: false},
    'THEME': {payload: getCookie('theme') === 'dark' ? 'dark' : 'light'} 
}
