import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Login } from "../redux/userSlice";
const firebaseConfig = {
  apiKey: "AIzaSyCC9j4o7EEprYzqg965lWrwK3yQy25j14s",
  authDomain: "recipe-app-ff759.firebaseapp.com",
  projectId: "recipe-app-ff759",
  storageBucket: "recipe-app-ff759.appspot.com",
  messagingSenderId: "595811004796",
  appId: "1:595811004796:web:3198aade8806bc650534f9",
  measurementId: "G-349R6V1D5Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
