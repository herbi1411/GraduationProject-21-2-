import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import "firebase/compat/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyCTAfxa1YY9alXmSWVza4JbQewdIxAr5Bk",
    authDomain: "eye-saver-c21eb.firebaseapp.com",
    projectId: "eye-saver-c21eb",
    storageBucket: "eye-saver-c21eb.appspot.com",
    messagingSenderId: "733348902521",
    appId: "1:733348902521:web:3dda54392c9c99e1ae06a8",
    measurementId: "G-XEBD63W1K6"
  };

firebase.initializeApp(firebaseConfig);

const authService = firebase.auth();
export const dbService = firebase.firestore();
export const firebaseInstance = firebase;
export default authService;