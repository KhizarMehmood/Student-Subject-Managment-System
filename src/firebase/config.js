import { initializeApp , getApp ,getApps} from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDKgzcu27E0QNePNyR9e_o8YORGTU-Cc40",
  authDomain: "student-managment-63541.firebaseapp.com",
  projectId: "student-managment-63541",
  storageBucket: "student-managment-63541.appspot.com",
  messagingSenderId: "470996328424",
  appId: "1:470996328424:web:8c94c75fb459d8502f8e5d"
};
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const auth = getAuth(app)
export {auth, app}