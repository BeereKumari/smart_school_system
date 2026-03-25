import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmLqt6Q6IB5NUFbTkySCxX8CScYj_SwL0",
  authDomain: "smart-school-system-2d50b.firebaseapp.com",
  projectId: "smart-school-system-2d50b",
  storageBucket: "smart-school-system-2d50b.firebasestorage.app",
  messagingSenderId: "297736027542",
  appId: "1:297736027542:web:9732d28ddf65bc05dfb1b7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)

export const googleProvider = new GoogleAuthProvider();


















