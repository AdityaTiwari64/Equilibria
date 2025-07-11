import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFFDojHh-VDxjCmlvtgj5blJ3UzNSDcqI",
  authDomain: "equilibra-d7fff.firebaseapp.com",
  projectId: "equilibra-d7fff",
  storageBucket: "equilibra-d7fff.appspot.com",
  messagingSenderId: "1021471242032",
  appId: "1:1021471242032:web:7f3a748e42c755d6837af5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db }; 