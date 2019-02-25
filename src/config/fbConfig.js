import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
    apiKey: "AIzaSyC1ed_8aUoxR_qmKxncz65NnZY8yvU-NRU",
    authDomain: "project-manager-eee25.firebaseapp.com",
    databaseURL: "https://project-manager-eee25.firebaseio.com",
    projectId: "project-manager-eee25",
    storageBucket: "project-manager-eee25.appspot.com",
    messagingSenderId: "117222536290"
  };
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;