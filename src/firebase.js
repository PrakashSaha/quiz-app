// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add Firestore if needed

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKdG2cftRfEyh7Rz0XRGpx-RP-Bowz_LE",
  authDomain: "quiz-app-ba76d.firebaseapp.com",
  projectId: "quiz-app-ba76d",
  storageBucket: "quiz-app-ba76d.appspot.com", // Corrected typo from "firebasestorage.app"
  messagingSenderId: "430599419388",
  appId: "1:430599419388:web:6cc3979656e378f800ee79",
};

// Initialize Firebase app
const firebase = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(firebase);
export const db = getFirestore(firebase); // If Firestore is used

export default firebase;
