// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzWKYPy0wRs1L6vRbH0w-aHu1Y-O84BmI",
  authDomain: "partyshark-f73dd.firebaseapp.com",
  projectId: "partyshark-f73dd",
  storageBucket: "partyshark-f73dd.firebasestorage.app",
  messagingSenderId: "205337610124",
  appId: "1:205337610124:web:0f941ff030a35190a838a9",
  measurementId: "G-0MFYJ4KX9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
const auth = getAuth(app);
const db = getFirestore(app);
export {provider, db, auth};
export default app;