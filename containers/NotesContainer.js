import { useState, useEffect } from 'react'
import { getNotesFirebase, addNoteFirebase, deleteNoteFirebase, updateNoteFirebase } from '../firebase/client'
import SideBar from '@components/SideBar'
import Note from '@components/Note'
import LayoutMain from '@components/LayoutMain'
import moment from 'moment'

const NotesContainer = () => {

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(false)
    const [colorNewNote, setColor] = useState('colorOne')

    const handleNewNote = (color) => {
        if (color === colorNewNote || !newNote) setNewNote(!newNote)
        setColor(color)
    }

    useEffect(async () => {
        const res = await getNotesFirebase()
        setNotes(res)
    }, [])

    const handleAddNote = async ({ description, color, id = '' }) => {

        if (id) {
            updateNoteFirebase(id, null, description)
            const arrayWithNoteDescriptionUpdated = notes.map(note => note.id === id ? { ...note, description } : note)
            setNotes(arrayWithNoteDescriptionUpdated)
            return false
        } else {
            const newNote = {
                description,
                color,
                date: moment().format('MMM D, YYYY. hh:mm a'),
                isImportant: false,
            }
            addNoteFirebase(newNote)
            setNotes([newNote, ...notes])
        }

        handleNewNote(color)
    }

    const handleDeleteNote = (id) => {
        deleteNoteFirebase(id)
        const arrayWithNoteDeleted = notes.filter(note => note.id !== id)
        setNotes(arrayWithNoteDeleted)
    }

    const handleUpdateIsImportant = (id, isImportant) => {
        updateNoteFirebase(id, isImportant, null)
        const arrayWithNoteUpdated = notes.map(note => note.id === id ? { ...note, isImportant } : note)
        setNotes(arrayWithNoteUpdated)

    }

    return (
        <>
            <SideBar onNewNote={handleNewNote} />
            <LayoutMain>
                <>
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
                                date={moment(date.nanoseconds).format('MMM D, YYYY. hh:mm a')}
                                description={description}
                                isImportant={isImportant}
                                color={color}
                                onAdd={handleAddNote}
                                onDelete={handleDeleteNote}
                                onUpdateIsImportant={handleUpdateIsImportant}
                            />
                        ))
                    }
                </>
                </LayoutMain>
        </>
    )
}

export default NotesContainer
