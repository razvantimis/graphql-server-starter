import * as admin from "firebase-admin";
import { getServerConfig } from "@config";

let firebaseApp: admin.app.App | null = null;
let firestore: FirebaseFirestore.Firestore | null = null;
export function getFirebaseApp() {
  if (!firebaseApp) {
    const serviceAccount = getServerConfig().firebase.serviceAccount;
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    firestore = admin.firestore();
    firestore.settings({ timestampsInSnapshots: true });
  }
  return firebaseApp;
}

export function getFireStore() {
  return firestore;
}
