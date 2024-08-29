// Import the functions you need from the SDKs you need
import {initializeApp, FirebaseError} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut, getAuth,
} from "firebase/auth";
import {getFirestore, collection, addDoc,} from "firebase/firestore";
import {consoleLogValuesError} from "@app/lib/utils/consoleUtils";
import {Auth, UserCredential, User} from "@firebase/auth";
import {FirebaseApp} from "@firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATuOgoCMDVAdSdoCKjTnVRBl-Rp4B_MOk",
    authDomain: "rest-graphiql-client-ddd20.firebaseapp.com",
    projectId: "rest-graphiql-client-ddd20",
    storageBucket: "rest-graphiql-client-ddd20.appspot.com",
    messagingSenderId: "689233167995",
    appId: "1:689233167995:web:3cf48723677de48404c4de"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
// const db = getFirestore(app);


const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (err: FirebaseError | any) {
        if (err.code === "auth/invalid-credential") {
            alert("Ошибка логин/пароль");
        } else {
            consoleLogValuesError(err);
            if (err) {
                alert((err as Error).message);
            }
        }
    }
};


const registerWithEmailAndPassword = async (email: string, password: string) => {
    const name = email;

    try {
        const res: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user: User = res.user;
        return user;
    } catch (err) {
        consoleLogValuesError(err);
        if (err) {
            alert((err as Error).message);
        }
    }
};

const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        consoleLogValuesError(err);
        if (err) {
            alert((err as Error).message);
        }
    }
};

const logout = () => {
    return signOut(auth);
};



export {registerWithEmailAndPassword, logInWithEmailAndPassword, sendPasswordReset, logout};

