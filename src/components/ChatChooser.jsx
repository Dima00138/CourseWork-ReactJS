import React from 'react';
import { useContext, useState } from 'react';
import { Context } from '../index';
import { useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Backdrop, Button, Grid, TextField, Card, CardContent, Typography, Modal, Fade, InputAdornment, IconButton, Paper } from '@mui/material';
import { Container } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { CHAT_ROUTE } from './constants';
import { Delete, Visibility, VisibilityOff } from '@mui/icons-material';
import './ChatChooser.css';

const ChatChooser = () => {
    const {auth, db, firestore} = useContext(Context);
    const history = useHistory();
    const [user] = useAuthState(auth.getAuth());
    const [password, setPassword] = useState('');
    const [passwordE, setPasswordE] = useState('');
    const [errorPassE, seterrorPassE] = useState(false);
    const [name, setName] = useState('');
    const [showPassword, setShowPass] = useState(false);
    const [open, setOpen] = useState([false, null]);
    const [rooms, loading] = useCollectionData(
        firestore.query(firestore.collection(db, 'rooms'), firestore.orderBy('createdAt'))
    );

    if (loading) {
        return null;
    }

    const AddRoom = async () => {
        const docRef = firestore.doc(firestore.collection(db, 'rooms'));
        if (name.length < 3) return;
        await firestore.setDoc(docRef, {
            id: docRef.id,
            uid: user.uid,
            displayName: name,
            password: password,
            createdAt: firestore.serverTimestamp()
        });
        setName('');
        setPassword('');
    }

    const handlerDeleteRoom = async (room) => {
        await firestore.deleteDoc(firestore.doc(db, 'rooms', room.id));
    }

    const GoingToChat = (room) => {
        if (room.password === '' || room.password === passwordE) history.push(CHAT_ROUTE+'?'+room.id);
        else if (open[0] === false) {
            setOpen([true, room]);
        }
        else {
            seterrorPassE(true);
        }
    }

    return (
        <Container maxWidth={"xl"}>
        <Grid container
        justifyContent={"center"}
        sx={{ height: window.innerHeight - 50, marginTop: 0, alignContent: "flex-start"}}
        spacing={10}
        direction={"row"}
        alignItems={"center"}>
            <Grid item xs={6}
            sx={{marginTop: 5}}
            justifyContent="center"
            alignItems="center">
            <Paper style={{border: '1px solid black', padding: 10, display: 'flex', justifyContent: 'space-around'}} className="addRoom">
                <TextField label="Name"
                name="name"
                id="name-bas"
                type="text"
                size={"small"}
                inputProps={{maxLength: 16}}
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <TextField label="Password"
                name="password"
                id="password-bas"
                type={!showPassword ? "password" : "text"}
                size={"small"}
                inputProps={{maxLength: 16}}
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputProps={{
              endAdornment: <InputAdornment position="end" style={{padding: 0, margin: 0}}>
                <IconButton style={{padding: 0, margin: 0}}
                  aria-label="toggle password visibility"
                  onClick={() => setShowPass(!showPassword)}
                  onMouseDown={e => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              
            }}
                />
                <Button variant="contained" color="primary" name='Name' onClick={AddRoom}>Добавить комнату</Button>
            </Paper>
            </Grid>
            <br/>
            <Grid container spacing={3}
            justifyContent="center"
            alignItems="center" >
                {rooms.map((room, index) => 
                    <Grid item xs={2} key={index}
                    className="Cardclass"
                    justifyContent="center" sx={{marginTop: '20px'}}>
                        <Card variant="outlined" style={{width:'200px', minHeight: 'calc(20vh + 40px)', height:'180px', border: '1px solid gray', margin: 'auto auto'}}>
                        {user.uid === room.uid ? <IconButton arial-label="delete" color="secondary" sx={{float: 'right'}} onClick={() => handlerDeleteRoom(room)}><Delete/></IconButton> : null}
                        <CardContent sx={{height: 'calc(16vh + 40px)'}}>
                            <Typography gutterBottom sx={{wordBreak: 'break-all', minHeight: '50%'}} align={'center'} variant="h5" component="h2">
                                {room.displayName}
                            </Typography>
                            <Typography gutterBottom align={'center'} variant="h6" component="h5">
                                {room.password === '' ? 'Открытая' : 'Защищенная'}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => GoingToChat(room)}>
                                Присоединиться
                            </Button>
                        </CardContent>
                        </Card>
                    </Grid>)}
                
            </Grid>
        </Grid>
        <Modal
        sx={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10}}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open[0]}
        onClose={() => setOpen([false, null])}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open[0]}>
          <Paper style={{padding: '16px 32px 24px', border: '1px solid black', zIndex:20}}>
            <h2 id="transition-modal-title" style={{textAlign: 'center'}}>Комната: {open[1] ? open[1].displayName : null}</h2>
            <div id="transition-modal-description" style={{display: 'flex', justifyContent: 'space-between', paddingTop: 30}}>
            <form onSubmit={(e) => {e.preventDefault();GoingToChat(open[1])}}>
            <TextField label="Password" error={errorPassE}
                placeholder='Password'
                name="Epassword"
                id="password-exist"
                type={!showPassword ? "password" : "text"}
                size={"small"}
                inputProps={{maxLength: 16}}
                value={passwordE}
                onChange={e => setPasswordE(e.target.value)}
                InputProps={{
              endAdornment: <InputAdornment position="end" style={{padding: 0, margin: 0}}>
                <IconButton style={{padding: 0, margin: 0}}
                  aria-label="toggle password visibility"
                  onClick={() => setShowPass(!showPassword)}
                  onMouseDown={e => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }}
                />
                <Button variant="contained" sx={{marginLeft:1, padding: "7px 16px"}} color="primary" onClick={() => GoingToChat(open[1])}>Войти</Button>
                </form>
                </div>
          </Paper>
        </Fade>
      </Modal>
        </Container>
    );
}

export default ChatChooser;
