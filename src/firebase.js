import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAZBG_Yt5dsIMRLJN-96ewO1tVHrbUUL3I",
  authDomain: "facebook-messenger-clone-612c5.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-612c5.firebaseio.com",
  projectId: "facebook-messenger-clone-612c5",
  storageBucket: "facebook-messenger-clone-612c5.appspot.com",
  messagingSenderId: "52748382473",
  appId: "1:52748382473:web:7f899f3ef4e93e19ec23d8",
  measurementId: "G-Y9KGHNMEGN",
});

const db = firebaseApp.firestore();

export default db;
