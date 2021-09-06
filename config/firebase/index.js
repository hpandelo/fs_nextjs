import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, browserLocalPersistence } from "firebase/auth"

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_APP_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MENSUREMENT_ID,
}

console.log(config)

const isInitialized = !!getApps().length
const app = isInitialized ? getApp() : initializeApp(config)

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const auth = getAuth(app)
auth.useDeviceLanguage()

export const PERSISTENCE_MODE = browserLocalPersistence;

export const firebase = {
  app,
  auth
}
