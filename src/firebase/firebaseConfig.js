import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX7lkIZ4hmbjlFojogUZDbhbCk7gINMBQ",
  authDomain: "todo-list-60e26.firebaseapp.com",
  projectId: "todo-list-60e26",
  storageBucket: "todo-list-60e26.appspot.com",
  messagingSenderId: "847275455176",
  appId: "1:847275455176:web:5559968a377dcd6fceebfd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
