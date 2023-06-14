import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: "auth-prod-8dd8b.firebaseapp.com",
  projectId: "auth-prod-8dd8b",
  storageBucket: "auth-prod-8dd8b.appspot.com",
  messagingSenderId: "451091817497",
  appId: "1:451091817497:web:a850378aec341752f1b688",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
