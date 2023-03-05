import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AvatarUser from './AvatarUser';
import { NavLink } from 'react-router-dom';
import { CHATCHOOSE_ROUTE, LOGIN_ROUTE } from './constants';
import { useContext } from 'react';
import { Context } from '../index';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {

  const {auth} = useContext(Context);
  const history = useHistory();
  const [user] = useAuthState(auth.getAuth());

    return (
    <Box sx={{ flexGrow: 1, justifyContent: 'space-around', position: 'fixed', width: '100%', zIndex: 999}}>
      <AppBar position="static">
        <Toolbar sx={{
           justifyContent: 'space-around',
           paddingLeft: 5,
           }}>
          <Typography variant="h6" component="div" sx={{
            flexGrow: 0, cursor: 'pointer'
            }} onClick={() => history.push(CHATCHOOSE_ROUTE)}>
            Чатик
          </Typography>
          {user ? <AvatarUser/> : <NavLink to={LOGIN_ROUTE} style={{textDecoration: "none"}}><Button variant='outlined' color='inherit' sx={{ color: "white"}}>Login</Button></NavLink>}
        </Toolbar>
      </AppBar>
    </Box>
    );
}

export default Navbar;
