import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, deleteUser } from "firebase/auth";
import App from "./class/App.js";
import { auth, googleSignIn, deleteDataOfDatabase, editDataOfDatabase } from "./firebase.js";
import "./style/modal-window.css";
import "./style/preloader.css";
import "./style/style.css";
import "./style/styleCheckbox.css";

const methodsAuth = {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  deleteUser,
  googleSignIn,
  auth,
  editDataOfDatabase,
  deleteDataOfDatabase,
};

const app = new App(methodsAuth);

app.start();
