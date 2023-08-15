import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "REDUCTED", //
  authDomain: "REDUCTED",
  projectId: "REDUCTED",
  storageBucket: "REDUCTED",
  messagingSenderId: "REDUCTED",
  appId: "REDUCTED",
  measurementId: "REDUCTED",
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
