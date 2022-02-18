import firebase from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCBUdGeugcvcyYQuTuXOxUCUZs8SdaYuNo',
  authDomain: 'movie-night-f79ea.firebaseapp.com',
  projectId: 'movie-night-f79ea',
  storageBucket: 'movie-night-f79ea.appspot.com',
  messagingSenderId: '1005554447371',
  appId: '1:1005554447371:web:f9cf54562958db5a5d030e',
  measurementId: 'G-X7V8D0W35L',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firebaseApp = firebase.getApp();

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);