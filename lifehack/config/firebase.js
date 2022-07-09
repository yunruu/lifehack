// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/app";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyCPCzJjkPxeBLeR9xfQDZAqEpDM3eBn7Cc",
  authDomain: "lifehack-5c58f.firebaseapp.com",
  projectId: "lifehack-5c58f",
  storageBucket: "lifehack-5c58f.appspot.com",
  messagingSenderId: "228742078756",
  appId: "1:228742078756:web:c0d29e8e23746de8a253b1"
  
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db };
