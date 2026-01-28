import {ChevronLeft, ChevronRight, Search} from "lucide-react";


export const Pagination = ({
    inputBorder,
    perPage,
    setPerPage,
    totalPages,
    setPrevPointer,
    setCurrentPointer,
    prevPointer,
    currentPointer}) => {
    const pages = [
        15, 20, 25, 30, 35, 40
    ];


    const handlePerPageOptions = (e) => {
        const value = e.target.value;
        setPerPage(value);
        setCurrentPointer(1);
        setPrevPointer(0);

    }
    return (
        <div className='sticky top-0 w-full border-t border-x flex justify-between items-center px-5 z-2'
            style={{
                borderColor: inputBorder,
                backgroundColor: "#121212"
            }}>
            <div className="gap-5 flex justify-center items-center shrink-0 border px-2 rounded-full overflow-hidden"
                style={{
                    borderColor: inputBorder
                }}>
                <span>Per page</span>
                <select className="bg-black p-2 border-0 outline-0"
                    onChange={handlePerPageOptions}>
                    <option value={10}>10</option>
                    {
                        pages.map((value, index) => {
                            return <option key={index} value={value}>{value}</option>
                        })
                    }

                </select>
            </div>
            <div className="w-full flex justify-center items-center gap-2">
                <Search color={inputBorder} />
                <input type="search"
                    className="px-5 py-2 border rounded-2xl min-w-[60%] text-white my-2"
                    placeholder="Search by name, email, course name, assignment name"
                    style={{
                        borderColor: inputBorder
                    }} />
            </div>

            <div className="gap-5 h-full flex justify-center items-center shrink-0 px-2 rounded-full overflow-hidden"
            >

                <span className="h-full flex justify-center items-center gap-2">
                    <ChevronLeft size={30}
                        className={`border cursor-pointer ${ !prevPointer ? 'pointer-events-none' : 'pointer-events-auto' }`}
                        style={{borderColor: inputBorder}}
                        onClick={() => {
                            setPrevPointer(prev => prev - 1)
                            setCurrentPointer(prev => prev - 1)
                        }}
                    />
                    <span>
                        {
                            currentPointer
                        }
                    </span>
                    <ChevronRight size={30}
                        className={`border cursor-pointer
                        ${ currentPointer === totalPages ? 'pointer-events-none' : 'pointer-events-auto' }`}
                        style={{borderColor: inputBorder}}
                        onClick={() => {
                            setPrevPointer(prev => prev + 1)
                            setCurrentPointer(prev => prev + 1)
                        }} />

                </span>
            </div>
        </div>
    )
}
