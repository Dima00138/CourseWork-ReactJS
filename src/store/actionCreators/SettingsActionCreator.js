import { createAction } from '@reduxjs/toolkit';
import { DIALOG_OPEN, THEME } from '../actions/SettingsAction';

export const DialogOpenAction = createAction(DIALOG_OPEN);

export const ThemeChangeAction = createAction(THEME);