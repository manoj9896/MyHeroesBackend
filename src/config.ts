import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FireBase_API_KEY,
  authDomain: process.env.FireBase_AUTH_DOMAIN,
  projectId: process.env.FireBase_Project_Id,
  storageBucket: process.env.FireBase_Storage_Bucket,
  messagingSenderId: process.env.FireBase_Messaging_Sender_Id,
  appId: process.env.FireBase_App_Id,
  measurementId: process.env.FireBase_Measurement_Id,
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const SECRET = process.env.SECRET