import { Container, Grid, TextField, Button, Avatar, Paper } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useContext, useState } from 'react';
import { Context } from '../index';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import { PhotoCamera } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import ModalImage from "react-modal-image";
import './Chat.css';
import NotFound from './NotFound';
//import { LOADING_MESSAGE_URL } from './constants';

const Chat = () => {
    const [file, setFile] = useState([]);
    const [messageRef, setMessageRef] = useState({});
    const [bUpdMes, setbUpdMes] = useState(false);
    const {auth, db, firestore, fStorage} = useContext(Context);
    const [user] = useAuthState(auth.getAuth());
    const [value, setValue] = useState('');
    const url = document.location.search.slice(1);
    try {
    var [messages, loading] = useCollectionData(
        firestore.query(firestore.collection(db, '/chats/', url, 'messages'), firestore.orderBy('createdAt'))
    );}
    catch {
        var messages = 0;
        var loading = 0;
        return <NotFound/>
    }

    const EnterPress = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            setValue(value.trim());
            sendMessage(file);
        }
    }

    const UpdateMessage = (message) => {
        if (bUpdMes === false) {
             if (message.uid === user.uid) {
                setMessageRef(firestore.doc(db, '/chats/', url, 'messages', message.id));
                setValue(message.text);
                setbUpdMes(true);
        }
        }else {
            if (value === "") {
                firestore.deleteDoc(messageRef);
            }
            else {
            firestore.updateDoc(messageRef, {
                text: value,
            })
            }
            setbUpdMes(false);
            setValue('');
        }
    }

    const SaveImages = async (docRef) => {
        try {
            let fileobj = file; 
            setFile([]);
            let publicImageURL = "";
        for (let i = 0; i < fileobj.length; i++) {
            if (fileobj[i].size >= 10*1024*1024 || !fileobj[i].name.match(/(?:jpg|jpeg|png|webp)$/g))
                continue;
            let filePath = `files/${user.uid}/${docRef.id}/${fileobj[i].name}`;
            let newImageRef = fStorage.ref(fStorage.getStorage(), filePath);
            let fileSnapShot;
            await fStorage.uploadBytesResumable(newImageRef, fileobj[i]).then((snapshot) => {
                fileSnapShot = snapshot;
            });
            publicImageURL += await fStorage.getDownloadURL(newImageRef) + '\n';

            await firestore.updateDoc(docRef, {
                imageURL: publicImageURL,
                storageUri: fileSnapShot.metadata.fullPath
            })
        }
    }
        catch (error) {
            console.error('There was an error uploading a file to Cloud Storage:', error);
        }
    }

    if (loading) {
        return null;
        //return <Loader/>
    }

    const sendMessage = async () => {
        if (bUpdMes === true) {
            UpdateMessage(value);
            return;
        }
        if (value === '' || value === '\n') {
            return;
        }
        
        const docRef = firestore.doc(firestore.collection(db, '/chats/', url, 'messages'));
        await firestore.setDoc(docRef, {
            id: docRef.id,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            imageURL: null,
            text: value.trim(),
            createdAt: firestore.serverTimestamp()
        });
        if (file.length !== 0)
            SaveImages(docRef);
        setValue('');
    }

const Scrolling = (e) => {
    e.currentTarget.scrollIntoView(false);
}

    return (
        <Container>
            <Grid 
                container
                justifyContent={"center"}
                sx={{height: window.innerHeight - 50, marginTop: 0, alignContent: "flex-start"}}>
                <Paper style={{width:'80%', height: (file.length > 0) ? '60vh': '70vh', border: '1px solid gray', overflowY: 'auto', marginTop: '120px'}} className="Chating">
                {messages.map((message, index) =>
                <div key={index} onLoad={e => Scrolling(e)} style={{
                    margin: 10,
                    border: user.uid === message.uid ? '2px solid green' : '2px solid red',
                    marginLeft: user.uid === message.uid ? 'auto' : '10px',
                    width: 'fit-content',
                    maxWidth: '55%',
                    wordBreak: 'break-word',
                    padding: 5,
                    borderRadius: "3px"
                }}>
                    <Grid container sx={{
                        alignItems: 'center'
                    }}>
                        <Avatar sx={{
                            height: '100%',
                            width: '40px',
                            maxHeight: '40px',
                            marginRight: '5px'
                            }} src={message.photoURL.toString()}/>
                        <div>{message.displayName}</div>
                    </Grid>
                    <div onClick={e => UpdateMessage(message)} style={{
                        marginLeft: '45px',
                    }}>{message.text}</div>
                    {/*  Printing files on page with check for empty */}
                    <div>{message.imageURL ? (message.imageURL.split('\n').map((el, i) => 
                       el !== "" ? <ModalImage key={i} small={el.toString()} medium={el.toString()} showRotate/> : null)) : null}</div>
                    </div>
                )}
                </Paper>
                <Paper 
                    className='formInputPaper'
                    sx={{width: '80%', margin: 3}}
                    direction={'row'}
                    alignitems={'flex-start'}
                    >
                    <IconButton color="primary" aria-label="upload picture" component="label" sx={{width: '5%'}} className='IconButtonform'>
                        <input hidden accept="image/*" type="file" onChange={e => (file.length < 9) ? setFile([...file, e.currentTarget.files[0]]) : null}/>
                        <PhotoCamera/>
                    </IconButton>
                        <TextField multiline
                        className='TextFieldform'
                        maxRows={'3'}
                        onKeyDown={(e) => EnterPress(e)}
                        sx={{width: '88%'}}
                        aligncontent={'flex-start'}
                        variant={'outlined'}
                        fullWidth
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        />
                        <Button
                        className='ButtonformInput'
                        id='sendMess'
                        onClick={() => sendMessage()}
                        sx={{width: '2%', height: '100%', minWidth: '7%'}}
                        variant={"contained"}
                        ><SendIcon/></Button>
                    </Paper>
                    <Grid
                    container
                    alignItems={'start'}
                    sx={{width: '80%'}}>
                    {file.map((fil, index) => {
                            return <Grid item key={index}
                    sx={{width: '25%'}}
                    justifyContent={'space-between'}
                    >
                    <ModalImage small={URL.createObjectURL(fil)} medium={URL.createObjectURL(fil)}/>
                    </Grid>})}</Grid>
            </Grid>
        </Container>
    );
}

export default Chat;
