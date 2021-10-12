import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyANEHC7WXOG8Bi6LJuV7bEHuuNVQxsAabo",
  authDomain: "sisvssis-chats.firebaseapp.com",
  projectId: "sisvssis-chats",
  storageBucket: "sisvssis-chats.appspot.com",
  messagingSenderId: "608800973405",
  appId: "1:608800973405:web:69682c441ddbc177da23b4"
}).auth()
