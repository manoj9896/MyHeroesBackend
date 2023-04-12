import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FireBase_API_KEY,
  authDomain: process.env.FireBase_AUTH_DOMAIN,
  projectId: "ipl2023-league",
  storageBucket: "ipl2023-league.appspot.com",
  messagingSenderId: "857409743293",
  appId: "1:857409743293:web:56903f4b5a230a4752cad4",
  measurementId: "G-3SFBH4MQK2",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
