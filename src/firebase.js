import { initializeApp } from "firebase/app"; // Import function to initialize Firebase app
import { getFirestore } from "firebase/firestore"; // Import function to access Firestore
import { getAuth } from 'firebase/auth'; // Import function to access Firebase Authentication

// Firebase configuration object containing keys and identifiers
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // API key for Firebase
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // Auth domain for Firebase
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // Project ID for Firestore
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // Storage bucket for Firebase
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // Messaging sender ID for Firebase Cloud Messaging
    appId: process.env.REACT_APP_FIREBASE_APP_ID, // App ID for Firebase
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID // Measurement ID for Firebase Analytics
};

// Initialize Firebase with the configuration object
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication services
const db = getFirestore(app); // Get Firestore instance
const auth = getAuth(app); // Get Auth instance

// Export Firestore and Auth instances for use in other parts of the application
export { db, auth };
