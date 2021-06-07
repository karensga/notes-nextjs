
import firebase from 'firebase/app'
import moment from 'moment'
import 'firebase/firestore'

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
}

let firestore = null;

class Firebase {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.db = firebase.firestore();
        firestore = this.db;
    }

    addNote = async ({ description, color, id }) => {

        if (!description) return false

        const dbRef = this.db.collection('notes');

        if (id) {

            await dbRef.doc(id).update({
                description
            });

        } else {

           const response = await dbRef.add({
                description,
                color,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                isImportant: false
            });

            return response.id
        }


    }

    getAllNotes = async () => {

        const res = await this.db.collection("notes").orderBy('date', 'desc').get()
        const resJson = []
        res.forEach(doc => {
            const { description, color, date, isImportant } = doc.data()
            resJson.push({
                id: doc.id,
                description: description,
                color: color,
                isImportant: isImportant,
                date: moment.unix(date.seconds).format('MMM D, YYYY. hh:mm a')
            })
        });
        return resJson

    }

    deleteNote = async (id) => {
        if (!id) throw new Error('The id is undefined')
        await this.db.collection("notes").doc(id).delete()
    }

    updateNoteIsImportant = async (id, isImportant) => {
        if (isImportant === undefined || !id) throw new Error('The isImportant or id are undefined')
        await this.db.collection("notes").doc(id).update({ isImportant })
    }


}

export { Firebase, firestore }