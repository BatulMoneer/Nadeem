import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDhvxEujAHa0ireSBUiiR0dTfJgIsEYzAs",
  authDomain: "nadeem-74eea.firebaseapp.com",
  projectId: "nadeem-74eea",
  storageBucket: "nadeem-74eea.appspot.com",
  messagingSenderId: "65821632594",
  appId: "1:65821632594:web:1954ce8f3047b8e795d78b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
