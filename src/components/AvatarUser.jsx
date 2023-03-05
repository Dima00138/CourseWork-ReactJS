import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { Context } from '../index';
import { DialogOpenAction } from '../store/actionCreators/SettingsActionCreator';
import DialogSettings from './DialogSettings';
import { store } from '../store/store';

const AvatarUser = () => {

    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [opened, setOpened] = React.useState(store.getState().DIALOG_OPEN.payload);

    const subscribe = store.subscribe(() => {
      setOpened(!opened);
    });

    const {auth} = useContext(Context);
    const [user] = useAuthState(auth.getAuth());
    const settings = ['Settings', 'Logout'];

        const handleOpenUserMenu = (event) => {
            setAnchorElUser(event.currentTarget);
          };        
          
          const handleCloseUserMenu = (setting) => {
            if (setting === "Settings") {
              dispatch(DialogOpenAction({payload: true}));
              
            }
            if (setting === "Logout") {
              subscribe();
              auth.signOut(auth.getAuth()).then(
                
              ).catch((error) => 
              console.log(error)
              );
            }
            setAnchorElUser(null);
          };

    return (
        <Box>
        {opened ? <DialogSettings dispatch={dispatch}/> : null}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user ? user.displayName : null} src={user ? user.photoURL : null } />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">
                      {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            </Box>
    );
}

export default AvatarUser;
