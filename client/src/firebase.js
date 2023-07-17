import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDg4q8jhZeh0X8zMeDfYM8MWEcEKFbpi4o",
  authDomain: "ecommerce-app-1fe2c.firebaseapp.com",
  projectId: "ecommerce-app-1fe2c",
  storageBucket: "ecommerce-app-1fe2c.appspot.com",
  messagingSenderId: "868598800359",
  appId: "1:868598800359:web:87a98c5ccfe17ab255a742",
};

firebase.initializeApp(firebaseConfig);

//export
export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
