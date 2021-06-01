import { useState } from 'react'
import Edit from '@icons/Edit'
import Star from '@icons/Star' 
import Delete from '@icons/Delete'
import { useForm } from 'react-hook-form'

const Note = (props) => {
    const { id, date, color, description, isImportant, onAdd, onDelete, newNote = false, onUpdateIsImportant } = props
    const [edit, setEdit] = useState(newNote)

    const { register, handleSubmit } = useForm()

    const handleOnSubmit = (data) => {
        const { description } = data
        if (!description) {
            setEdit(!edit)
        }
        const noteData = {
            color,
            description,
            id
        }
        onAdd(noteData)
        setEdit(!edit)
    }

    const handleSetEdit = () => {
        setEdit(!edit)
    }

    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            document.getElementById("form").submit();
            e.preventDefault();
        }
    }


    return (
        <div className={`group w-full sm:max-w-n sm:max-h-n bg-${color} bg-opacity-70 h-52 relative rounded-3xl pt-8 px-6 pb-12 mt-auto mx-auto`}>

            {
                edit ? (
                    <form id="form" autoComplete="off" onSubmit={handleSubmit(handleOnSubmit)}>
                        <input type="text" autoFocus="autofocus" defaultValue={description} cols="18" rows="5" className={`bg-transparent focus:outline-none`} {...register("description", { required: false })} />
                    </form>
                ) : description
            }

            <p className="absolute bottom-5 left-6 text-xs">{date}</p>



            <button className={`duration-500 w-8 h-8 focus:outline-none bg-black rounded-full p-2 absolute top-4 right-4 ${isImportant ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} ${newNote && 'hidden'}`}
                onClick={() => onUpdateIsImportant(id, !isImportant)}>
                <Star className={`fill-current ${isImportant ? 'text-yellow-500' : 'text-white'} w-4 h-4`} />
            </button>


            <button className={`duration-500 opacity-0 group-hover:opacity-100 w-8 h-8 focus:outline-none bg-red-500 rounded-full p-2 absolute bottom-14 right-4 ${newNote && 'hidden'}`} onClick={() => onDelete(id)}>
                <Delete className="fill-current text-white w-4 h-4" />
            </button>
            <button className={`w-8 h-8 focus:outline-none bg-black rounded-full p-2 absolute bottom-4 right-4 ${newNote && 'hidden'}`}
                onClick={() => handleSetEdit()}
            >
                <Edit className="fill-current text-white w-4 h-4" />
            </button>
        </div>
    )
}

export default Note
