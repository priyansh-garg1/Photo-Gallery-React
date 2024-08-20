import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBljP-sUZlwDR5RbG7HxAu760nCQLf6kD8",
  authDomain: "test-db-3a7d1.firebaseapp.com",
  projectId: "test-db-3a7d1",
  storageBucket: "test-db-3a7d1.appspot.com",
  messagingSenderId: "146631152603",
  appId: "1:146631152603:web:44d55a76235bff0c488dfe",
  measurementId: "G-9M3EWM2QBT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
export { db };
