// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuOu7ROh7OchfqNxK3sa_J5KNvKF-o2C4",
  authDomain: "devlift-44085.firebaseapp.com",
  projectId: "devlift-44085",
  storageBucket: "devlift-44085.appspot.com",
  messagingSenderId: "681733508707",
  appId: "1:681733508707:web:6480d86b72e08993e8b256",
  measurementId: "G-696D79L9Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app as firebaseApp, firebaseConfig}