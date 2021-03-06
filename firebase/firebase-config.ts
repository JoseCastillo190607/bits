import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAMbYneoQjkjgsuvEVt-AMcNkYPNhBnCpo",
    authDomain: "itseekers-1582214344227.firebaseapp.com",
    databaseURL: "https://itseekers-1582214344227.firebaseio.com",
    projectId: "itseekers-1582214344227",
    storageBucket: "itseekers-1582214344227.appspot.com",
    messagingSenderId: "1060099751666",
    appId: "1:1060099751666:web:17953adf7459040c629a6b",
    measurementId: "G-DJSG0GBX0G",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const oAuthProvider = new firebase.auth.OAuthProvider('microsoft.com');

export {
    db,
    googleAuthProvider,
    oAuthProvider,
    firebase
};