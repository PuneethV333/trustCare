import admin from "firebase-admin"
import { config } from "./data.config"


if (!admin.app.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: config.firebaseProjectId,
            clientEmail: config.firebaseClientEmail,
            privateKey: config.firebasePrivateKey.replace(/\\n/g, "\n")
        })
    })
    console.log("Firebase admin initialized successfully")
}

export default admin