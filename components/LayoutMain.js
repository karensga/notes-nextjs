const LayoutMain = ({ children }) => {
    return (
        <div className="ml-2/12 sm:ml-1/12 sm:w-11/12 w-10/12">
            <h1 className="p-4 text-bold text-2xl mt-4 sm:text-4xl">Notes</h1>
            <div className="p-4 w-full h-auto space-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {children}
            </div>
        </div>
    )
}

export default LayoutMain
