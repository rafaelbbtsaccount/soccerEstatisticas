import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyASpovDIO04n0V9SGZaH1KZkCnDOOcPSok",
    authDomain: "soccerapp-86c7e.firebaseapp.com",
    databaseURL: "https://soccerapp-86c7e.firebaseio.com",
    projectId: "soccerapp-86c7e",
    storageBucket: "soccerapp-86c7e.appspot.com",
    messagingSenderId: "316614283606",
    appId: "1:316614283606:web:f7e0fb1bcf9221ec"
  };

const firebaseApp = firebase.initializeApp(config);

//   export firestore database
export default firebaseApp.firestore();