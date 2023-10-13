import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWKu6PcoihgsTxxBElYsSs25vLbvpTm5E",
  authDomain: "excuse-tracker-b5211.firebaseapp.com",
  projectId: "excuse-tracker-b5211",
  storageBucket: "excuse-tracker-b5211.appspot.com",
  messagingSenderId: "973641966437",
  appId: "1:973641966437:web:829db4e1148d43e107b78c",
  measurementId: "G-0P23KYPH6V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app);
export const storage = getStorage(app);