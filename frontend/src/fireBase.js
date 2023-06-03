import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPLZ2O7L753JHEFDhivCdbytN1JiYqinQ",
  authDomain: "auth-dev-ee578.firebaseapp.com",
  projectId: "auth-dev-ee578",
  storageBucket: "auth-dev-ee578.appspot.com",
  messagingSenderId: "651858506973",
  appId: "1:651858506973:web:8aac1df0d43d3b9e40d734",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
