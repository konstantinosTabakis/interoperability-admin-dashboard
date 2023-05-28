 
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_DB,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

 
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db = getFirestore(app)
// const analytics = getAnalytics(app);