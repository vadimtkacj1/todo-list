import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCA05rU-m3LtoQXE23pntPZS3CEVkouPPk",
  authDomain: "to-do-aced8.firebaseapp.com",
  databaseURL: "https://to-do-aced8-default-rtdb.firebaseio.com",
  projectId: "to-do-aced8",
  storageBucket: "to-do-aced8.appspot.com",
  messagingSenderId: "341614437728",
  appId: "1:341614437728:web:027095566a26ba3b506a05",
  databaseURL: "https://to-do-aced8-default-rtdb.firebaseio.com/",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const googleSignIn = new GoogleAuthProvider(firebase);
const auth = getAuth(firebase);

const editDataOfDatabase = (path, data) => {
  const referenceDataUser = ref(database, path);
  set(referenceDataUser, data);
};

const getDataOfDatabase = (path) => {
  const referenceDataUser = ref(database);

  return get(child(referenceDataUser, path));
};

const deleteDataOfDatabase = (path) => {
  const referenceDataUser = ref(database);

  return remove(child(referenceDataUser, path));
};

export { editDataOfDatabase, getDataOfDatabase, deleteDataOfDatabase, auth, googleSignIn };
