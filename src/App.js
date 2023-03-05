import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouters from './components/AppRouters';
import Loader from './components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from './index';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { store } from './store/store';
import {getCookie, setCookie } from './components/FuncForCookie';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const {auth} = useContext(Context);
  const [user, loading] = useAuthState(auth.getAuth());
  if (!getCookie('theme')) setCookie('theme', 'light');
  const [mode, setMode] = React.useState(getCookie('theme') === 'dark' ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setCookie('theme', mode === 'light' ? 'dark' : 'light');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  if (loading) {
    return <Loader/>
}

  if (store.getState().THEME.payload === 'dark')
    document.body.style.backgroundImage = "url('images/dark.webp')";
  else document.body.style.backgroundImage = "url('images/light.webp')";

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar/>
        <AppRouters/>
      </BrowserRouter>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
