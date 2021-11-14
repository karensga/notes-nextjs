import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREABSE_API_KEY,
    authDomain:process.env.NEXT_PUBLIC_FIREABSE_AUTH_DOMAIN,
    projectId:process.env.NEXT_PUBLIC_FIREABSE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREABSE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREABSE_MESSAGING_SENDER_ID,  
    appId: process.env.NEXT_PUBLIC_FIREABSE_APP_ID
}

if(!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
}

export default firebase