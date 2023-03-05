import { createReducer } from '@reduxjs/toolkit';
import { DIALOG_OPEN, THEME } from '../actions/SettingsAction';
import { initialState } from '../initialState';
import {LOGIN, LOGOUT} from './../actions/LoginActions';

const rootReducer = createReducer([], (builder) => {
    builder
        .addCase(LOGIN, (state = initialState, action) => {
            return {...state, 'LOGIN': action.payload}
        })
        .addCase(LOGOUT, (state = initialState, action) => {
            return {...state, 'LOGIN': action.payload}
        })
        .addCase(DIALOG_OPEN, (state = initialState, action) => {
            return {...state, 'DIALOG_OPEN': action.payload}
        })
        .addCase(THEME, (state = initialState, action) => {
            return {...state, 'THEME': action.payload}
        })
})

export default rootReducer;