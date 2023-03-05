import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { DialogOpenAction, ThemeChangeAction } from '../store/actionCreators/SettingsActionCreator';
import { store } from '../store/store';
import { useDispatch } from 'react-redux';
import { ColorModeContext } from '../App';
import { Accordion, AccordionDetails, AccordionSummary, Icon } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSettings = (props) => {
  const [open, setOpen] = React.useState(store.getState().DIALOG_OPEN);
  const dispatch = useDispatch();
  const colorMode = React.useContext(ColorModeContext);

  const handleClose = () => {
    props.dispatch(DialogOpenAction({payload: false}));
    setOpen(false);
  };

  const handleThemeChange =(e) => {
    store.getState().THEME.payload === 'light' ? dispatch(ThemeChangeAction({payload: 'dark'}))
    : dispatch(ThemeChangeAction({payload: 'light'}));
    colorMode.toggleColorMode();
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button
          aria-controls={open ? 'positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}>
            <ListItemText primary="Theme" secondary={store.getState().THEME.payload} onClick={handleThemeChange}/>
          </ListItem>
          <Divider />
        </List>
        <Accordion>
          <AccordionSummary
           expandIcon={<ExpandMore />}
          aria-controls="about-content"
          id="about-header">
            <Typography>
              About
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Это приложения было создано в качестве курсового проекта по дисциплине "Технологии frontend-разработки"<br/>
              Создатель: Тимошенко Дмитрий Валерьевич, ФИТ 2ПОИБМС-7.<br/>
              <small>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved</small>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Dialog>
    </div>
  );
}

export default DialogSettings;