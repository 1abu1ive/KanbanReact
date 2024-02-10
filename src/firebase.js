// Firebase SDK'larını içeri aktar
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore'u içeri aktar

// Firebase projenizin konfigürasyon bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyDaGulR547B6vzERc3rJuR-cvlrGY3c4aU",
  authDomain: "kanban-83c48.firebaseapp.com",
  projectId: "kanban-83c48",
  storageBucket: "kanban-83c48.appspot.com",
  messagingSenderId: "130266781410",
  appId: "1:130266781410:web:9b9d4328246f0827acf0bb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
