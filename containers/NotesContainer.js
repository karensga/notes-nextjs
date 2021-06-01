import { useState, useEffect } from 'react'
import SideBar from '@components/SideBar'
import Note from '@components/Note'
import moment from 'moment'
import { Firebase } from '@lib/firebase'

const NotesContainer = () => {

    const db = new Firebase();

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(false)
    const [colorNewNote, setColor] = useState('colorOne')

    const handleNewNote = (color) => {
        if (color === colorNewNote || !newNote) setNewNote(!newNote)
        setColor(color)
    }

    const handleAddNote = async ({ description, color, id = '' }) => {
        await db.addNote({
            description: description,
            color: color,
            id
        })

    }

    const handleDeleteNote = async (id) => {
        await db.deleteNote(id)
        const deleteNote = notes.filter(note => note.id !== id)
        setNotes(deleteNote)
    }

    const handleUpdateIsImportant = async (id, isImportant) => {
        await db.updateNoteIsImportant(id, isImportant)

    }

    useEffect(async () => {
        const res = await db.getAllNotes()
        console.log(res)
    }, [handleDeleteNote, handleUpdateIsImportant, handleAddNote])


    return (
        <>
            <SideBar onNewNote={handleNewNote} />
            <div className="ml-2/12 sm:ml-1/12 sm:w-11/12 w-10/12">

                <h1 className="p-4 text-bold text-2xl mt-4 sm:text-4xl">Notes</h1>
                <div className="p-4 w-full h-auto space-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                    {
                        newNote &&
                        <Note
                            id={''}
                            date={moment().format('MMM D, YYYY. hh:mm a')}
                            description={''}
                            isImportant={false}
                            color={colorNewNote}
                            onAdd={handleAddNote}
                            onDelete={handleDeleteNote}
                            onUpdateIsImportant={handleUpdateIsImportant}
                            newNote={true}
                        />
                    }                
                    {
                        notes?.map(({ description, date, isImportant, color, id }) => (
                            <Note
                                key={id}
                                id={id}
                                date={date ? date : ""}
                                description={description}
                                isImportant={isImportant}
                                color={color}
                                onAdd={handleAddNote}
                                onDelete={handleDeleteNote}
                                onUpdateIsImportant={handleUpdateIsImportant}
                            />
                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default NotesContainer
