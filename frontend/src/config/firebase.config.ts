// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaoTIrg0hwP-8CJC5PgvitN4WGegcT3I0",
    authDomain: "trustcare-64b9f.firebaseapp.com",
    projectId: "trustcare-64b9f",
    storageBucket: "trustcare-64b9f.firebasestorage.app",
    messagingSenderId: "472390639798",
    appId: "1:472390639798:web:042c6f9ce9ed9632248617",
    measurementId: "G-W1EN3NZJV6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);