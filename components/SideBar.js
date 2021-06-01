import Plus from '@icons/Plus'

const SideBar = ({onNewNote}) => {

    const colors = [
        { color: 'colorOne' },
        { color: 'colorTwo' },
        { color: 'colorThree'},
        { color: 'colorFour' },
        { color: 'colorFive' }
    ]

    return (
        <div className="w-2/12 sm:w-1/12 h-screen border-r border-primary fixed letf-0 top-0 flex flex-col items-center">
            <button className="bg-black rounded-full p-1 w-10 h-10 block mx-auto my-10 focus:outline-none sm:w-14 sm:h-14" onClick={() => onNewNote()}>
                <Plus className="fill-current text-white w-4 h-4 sm:w-6 sm:h-6 mx-auto" />
            </button>

            {
                colors.map(({ color }) =>
                    <button key={color} className={`w-6 h-6 rounded-full bg-${color} bg-opacity-80 mx-auto my-1 focus:outline-none`} onClick={() => onNewNote(color)}></button>
                )
            }
        </div>
    )
}

export default SideBar
