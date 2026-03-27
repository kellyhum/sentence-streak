import admin from "firebase-admin";

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(
                JSON.parse(process.env.FIREBASE_CRED as string),
            ),
        });
        console.log("Firebase Admin Initialized");
    } catch (error) {
        console.error("Firebase admin initialization error", error);
    }
}

export const db = admin.firestore();
