import React from 'react';
import { useContext } from 'react';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Paper, Typography } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Login.css';
import { FacebookAuthProvider, GithubAuthProvider, linkWithCredential, OAuthProvider } from 'firebase/auth';
import { LoginAction } from '../store/actionCreators/LoginActionCreator';
import {useDispatch} from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();
    const {auth} = useContext(Context);
    let [user] = useAuthState(auth.getAuth());


    //link credential from others auths
    const linkCredentialFunc = (result, email, pendingCred) => {
        //check identity of emails
        if (result.user.email === email)
        //link credential to exist login
        return linkWithCredential(result.user, pendingCred).then().catch(e => console.log(e));
        else {
            alert("Неправильный адрес почты");
            return;
        }
    }
    //linking other accounts to auth
    const linkOtherAccounts = (error) => {
        //get credential and mail
        const pendingCred = OAuthProvider.credentialFromError(error);
        var email = error.customData.email;
        //get methods of signIn
        auth.fetchSignInMethodsForEmail(auth.getAuth(), email).then((methods) => {
            alert("К этой почте уже привязана учетная запись. Требуется авторизация с основной учетной записи.")
            // searching methods of auth
            if (methods[0] === "github.com") {
                //signIn with google
                auth.signInWithPopup(auth.getAuth(), new auth.GithubAuthProvider()).then((result) => {
                    // linking credential
                   linkCredentialFunc(result, email, pendingCred);
                })
            }
            else if (methods[0] === "facebook.com") {
                 //signIn with facebook
                 auth.signInWithPopup(auth.getAuth(), new auth.FacebookAuthProvider()).then((result) => {
                    //linking credential
                    linkCredentialFunc(result, email, pendingCred);
                })
            }
            else if (methods[0] === "google.com") {
                //signIn with google
                auth.signInWithPopup(auth.getAuth(), new auth.GoogleAuthProvider()).then((result) => {
                    // linking credential
                   linkCredentialFunc(result, email, pendingCred);
                })
            }
            return;
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //Login with google account
    const loginGoogle = async () => {
        const provider = new auth.GoogleAuthProvider();
        await auth.signInWithPopup(auth.getAuth(), provider).then((result) => {
            dispatch(LoginAction(result.user.uid));
            user = result.user;
            
        })
        .catch((error) => {
            //if not login (email exists in db with other method of login)
            if (error.code === 'auth/account-exists-with-different-credential') {
                linkOtherAccounts(error);
            }});
    }

    //Login with facebook account
    const loginFacebook = async () => {
        const provider = new FacebookAuthProvider();
        await auth.signInWithPopup(auth.getAuth(), provider).then((result) => {
            dispatch(LoginAction(result.user.uid));
            user = result.user;
        })
        .catch((error) => {
            //if not login (email exists in db with other method of login)
            if (error.code === 'auth/account-exists-with-different-credential') {
               linkOtherAccounts(error);
    }});
    }

    //Login with github account
    const loginGitHub = async () => {
        const provider = new GithubAuthProvider();
        await auth.signInWithPopup(auth.getAuth(), provider).then((result) => {
            dispatch(LoginAction(result.user.uid));
            user = result.user;
        })
        .catch((error) => {
            //if not login (email exists in db with other method of login)
            if (error.code === 'auth/account-exists-with-different-credential') {
                linkOtherAccounts(error);
    }});
    }

    return (
        <div className="login">
            <Paper sx={{textAlign: "center", width: 450, minHeight: 300, borderRadius: 15, padding: "55px", paddingTop: "100px"}}>
                <Typography variant="h3" sx={{fontFamily: "Poppins-Bold", fontWeight: 600, paddingBottom: "60px"}}>SignUp using</Typography>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <FacebookRoundedIcon className="AnimateIcons" sx={{width: 120, height: 120, color: "blue"}} onClick={loginFacebook}/>
                <GoogleIcon className="AnimateIcons" sx={{width: 120, height: 120, color: "red"}} onClick={loginGoogle}/>
                <GitHubIcon className="AnimateIcons" sx={{width: 120, height: 120, color: "black"}} onClick={loginGitHub}/>
                </div>

            </Paper>
        </div>
    );
}

export default Login;
