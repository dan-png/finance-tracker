import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAenBVTSBZY-rmGGu3AdroNkksXz0eU-fs",
  authDomain: "mycash-d1d3f.firebaseapp.com",
  projectId: "mycash-d1d3f",
  storageBucket: "mycash-d1d3f.appspot.com",
  messagingSenderId: "973350492464",
  appId: "1:973350492464:web:3003b8be02987ff23f90f5"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)