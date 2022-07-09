// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/app";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyCk12QbHLxalv81DeNakovAFe7wCyZfr0k",
  authDomain: "lifehack-ab5fd.firebaseapp.com",
  projectId: "lifehack-ab5fd",
  storageBucket: "lifehack-ab5fd.appspot.com",
  messagingSenderId: "821420703462",
  appId: "1:821420703462:web:995e4461a1d46c70890527",
  measurementId: "G-J7HV25NLQ8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db };
