// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6U_esRvW0uxRa_xeYtKzTcJyt6MGr5BQ",
  authDomain: "dailylog-4e056.firebaseapp.com",
  projectId: "dailylog-4e056",
  storageBucket: "dailylog-4e056.appspot.com",
  messagingSenderId: "736030648166",
  appId: "1:736030648166:web:f7d8ad68ded3c55311caa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

// logs collection



export {auth,db}