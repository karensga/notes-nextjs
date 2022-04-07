import { initializeApp, getApp, getApps } from 'firebase/app'
import 'firebase/auth'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, query, doc } from 'firebase/firestore'

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREABSE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREABSE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREABSE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREABSE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREABSE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREABSE_APP_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREABSE_DATABASE_URL,
}

let firebaseApp
if (!getApps().length) {     
    firebaseApp = initializeApp(clientCredentials)
} else {     
    firebaseApp = getApp()
}

const db = getFirestore(firebaseApp)

export const getNotesFirebase = async () => {
    const notes = query(collection(db, 'notes'))
    const notesSnapshot = await getDocs(notes)
    const notesList = notesSnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    })
    return notesList
}

export const addNoteFirebase = async (note) => {
    const notes = collection(db, 'notes')
    const addNote = await addDoc(notes, note)
}

export const deleteNoteFirebase = async (id) => {
    const notes = doc(db, 'notes', id)
    const deleteNote = await deleteDoc(notes)
}

export const updateNoteFirebase = async (id, isImportant, description) => {
    const notes = doc(db, 'notes', id)
    if (description) {
        const deleteNote = await updateDoc(notes, { description })
    } else {
        const deleteNote = await updateDoc(notes, { isImportant })
    }
}


export default { getNotesFirebase }