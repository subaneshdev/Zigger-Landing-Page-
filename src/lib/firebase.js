import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAIcHHq0p3WFejAS4husyqiY9hNAL1CyCI",
  authDomain: "ziggers-770ba.firebaseapp.com",
  projectId: "ziggers-770ba",
  storageBucket: "ziggers-770ba.firebasestorage.app",
  messagingSenderId: "724275799955",
  appId: "1:724275799955:web:f9c00709ac7b0d5a3aea66",
  measurementId: "G-LN70Y9K4XP"
};

// Initialize Firebase (safely checks if it's already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let analytics;
// Analytics only runs in the client browser
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
