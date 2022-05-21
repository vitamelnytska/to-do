// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDOTjWGd7k3CkuJg_Bn0H_5r2lS7Z2wfec',
  authDomain: 'to-do-6a01c.firebaseapp.com',
  projectId: 'to-do-6a01c',
  storageBucket: 'to-do-6a01c.appspot.com',
  messagingSenderId: '673079827779',
  appId: '1:673079827779:web:692a3243bacca712c623f6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
