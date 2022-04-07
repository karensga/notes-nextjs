import {useState} from 'react'
import Plus from '@icons/Plus'

const SideBar = ({onNewNote}) => {

    const [isOpen, setOpen] = useState(true)

    const colors = [
        { color: 'colorOne' },
        { color: 'colorTwo' },
        { color: 'colorThree'},
        { color: 'colorFour' },
        { color: 'colorFive' }
    ]

    return (
        <div className=" ease-in duration-200 w-2/12 sm:w-1/12 h-screen border-r border-primary fixed letf-0 top-0 flex flex-col items-center">
            
            <button className="bg-black rounded-full p-1 w-10 h-10 block mx-auto mt-10 mb-5 focus:outline-none sm:w-14 sm:h-14 " onClick={() => setOpen(!isOpen)} >
                <Plus className={`ease transition duration-200 fill-current text-white w-4 h-4 sm:w-6 sm:h-6 mx-auto transform origin-center ${isOpen&&'rotate-45'}`} />
            </button>
            <div className={`animation-colors flex flex-col ${isOpen ? 'block' : 'hidden'}`}>
            {
                colors.map(({ color }, index) =>
                <button  key={color} className={`color w-6 h-6 ease duration-200 rounded-full bg-${color} bg-opacity-80 mx-auto my-1 focus:outline-none hover:w-7 hover:h-7`} onClick={() => onNewNote(color)}></button>
                )
            }
            </div>
        </div>
    )
}

export default SideBar
