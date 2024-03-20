import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGEgUICEd4cYKJuiwGuOLWmtkWtKYapzI",
  authDomain: "invoice-app-f5d6e.firebaseapp.com",
  projectId: "invoice-app-f5d6e",
  storageBucket: "invoice-app-f5d6e.appspot.com",
  messagingSenderId: "675444040194",
  appId: "1:675444040194:web:f7f28a6481d9d5594c3d1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
