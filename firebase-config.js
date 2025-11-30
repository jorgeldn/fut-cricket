// firebase-config.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";

// Este objeto contém a configuração exclusiva do seu projeto Firebase.
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

// Inicializa o Firebase com a sua configuração.
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Inicializa o Realtime Database e obtém uma referência para o serviço.
export const database = getDatabase(app);

// Opcionalmente, você pode exportar a instância 'app' se precisar dela em outros lugares.
export { app };