import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAmnLylfHUwTaxQUIamNs-EfSxTKWmHfAQ",
  authDomain: "music-converter-6012d.firebaseapp.com",
  databaseURL: "https://music-converter-6012d-default-rtdb.firebaseio.com",
  projectId: "music-converter-6012d",
  storageBucket: "music-converter-6012d.appspot.com",
  messagingSenderId: "432937566136",
  appId: "1:432937566136:web:dde99d6568b9141a01594d",
};

// init firebase
firebase.initializeApp(firebaseConfig);
// init services
const projectFirestore = firebase.firestore()
// init auth
const projectAuth = firebase.auth()
export { projectFirestore, projectAuth }