import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {Provider} from 'react-redux';
import {store} from './../src/store/store';

const app = initializeApp({
  apiKey: "AIzaSyAlw5PZH6Uzn7y7ks4Eo_eHowyOiuJHejM",
  authDomain: "reactcourseproject-a53e5.firebaseapp.com",
  projectId: "reactcourseproject-a53e5",
  storageBucket: "reactcourseproject-a53e5.appspot.com",
  messagingSenderId: "630117701678",
  appId: "1:630117701678:web:e796aa6d97ee4dbbdee7bf"
});

const auth = {getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail};
const firestore = {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
};
const fStorage = {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
}
const db = getFirestore(app);
export const Context = createContext(null);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Context.Provider value={{
    firestore,
    db,
    auth,
    fStorage,
  }}>
  <Provider store={store}>
      <App/>
      </Provider>
  </Context.Provider>
  </React.StrictMode>
);