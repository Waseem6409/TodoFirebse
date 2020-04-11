import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCMM9ASS3vE8ihNk2CJezqPFgSpyQLBJAo",
    authDomain: "todo-app-82923.firebaseapp.com",
    databaseURL: "https://todo-app-82923.firebaseio.com",
    projectId: "todo-app-82923",
    storageBucket: "todo-app-82923.appspot.com",
    messagingSenderId: "953946830763",
    appId: "1:953946830763:web:b6edf8866aa2b13b8784ee",
    measurementId: "G-L1SHJPL946"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase