// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { Auth, UserCredential, User } from "@firebase/auth";
import { FirebaseApp } from "@firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATuOgoCMDVAdSdoCKjTnVRBl-Rp4B_MOk",
  authDomain: "rest-graphiql-client-ddd20.firebaseapp.com",
  projectId: "rest-graphiql-client-ddd20",
  storageBucket: "rest-graphiql-client-ddd20.appspot.com",
  messagingSenderId: "689233167995",
  appId: "1:689233167995:web:3cf48723677de48404c4de",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
// const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const name = email;
  const res: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user: User = res.user;
  return user;
};

const logout = () => {
  return signOut(auth);
};

export { registerWithEmailAndPassword, logInWithEmailAndPassword, logout };
