import {useContext, useEffect, useState} from 'react';
import {GlobalData} from '../context/globalData';
import {organizeCourses} from '../helper/organizeCourses';
import {deleteAssignment} from '../helper/deleteAssignment';

const AllAssignments = () => {

    const [currentCourseSelected, setCurrentCourseSelected] = useState('');
    const {AllAssignments, isAdmin, user, setAllAssignments} = useContext(GlobalData);
    const [courseNames, setCourseNames] = useState([]);
    const [currentAssignments, setCurrentAssignments] = useState({}); // when user clicks specific courses button then corresponding all assignments will be render.
    const [currentCourseName, setCurrentCourseName] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(-1);

    const handleDeleteAssignment = async (uid, courseName, assignmentName, index) => {
        try {
            setDeleting(true);
            setCurrentSelected(index);
            await deleteAssignment(uid, courseName, assignmentName);
            setAllAssignments(AllAssignments.filter((assignment) => assignment.assignmentName !== assignmentName))
            setDeleting(false)
        } catch(error) {
            setDeleting(false)
            console.log(error)

        }
    }
    useEffect(() => {
        if(user && AllAssignments) {
            const courseNameSet = new Set();
            AllAssignments.forEach((assignment) => {
                if(assignment.courseName) {
                    courseNameSet.add(assignment.courseName?.toLowerCase())
                }
            });

            setCourseNames(Array.from(courseNameSet));
            setCurrentAssignments(organizeCourses(AllAssignments));
        }
    }, [AllAssignments]);

    return (
        <>
            <Buttons
                names={courseNames}
                value={currentCourseSelected}
                setValue={setCurrentCourseSelected}
                setCurrentCourseName={setCurrentCourseName} />
            <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5 p-5'>
                {
                    currentCourseName === '' ?
                        AllAssignments?.map(({
                            assignmentCoverImage, assignmentLink, assignmentName, courseName, uid
                        }, index) => {
                            return <div key={index} className={`border place-content-center relative ${ courseName ? "block" : 'hidden' } `}>
                                <span className='flex  gap-2 justify-end items-center p-5 absolute top-0 w-full  bg-linear-to-b from-white/10 to-transparent'>
                                    <span className='text-white font-bold bg-black w-fit cursor-pointer p-2 block'
                                        onClick={() => handleDeleteAssignment(uid, courseName, assignmentName, index)}>
                                        {
                                            deleting && currentSelected === index
                                                ? <span >Deleting...</span>
                                                : "Delete"
                                        }
                                    </span>
                                </span>
                                <img src={assignmentCoverImage || null} className='object-fill w-full h-full' />
                                <span
                                    className={`flex flex-col justify-center p-10 w-full h-[30%]  bg-linear-to-b from-transparent to-white/40 absolute bottom-0`}
                                >
                                    <span className='text-white text-xl font-extrabold bg-black w-fit opacity-50 p-2 block'>{courseName}</span>
                                    <span className='text-white font-bold bg-black w-fit opacity-50 p-2 block'>
                                        <a href={assignmentLink} target='_blank'>{assignmentName}</a>
                                    </span>

                                </span>
                            </div>
                        })
                        : currentAssignments[currentCourseName]?.map(({
                            assignmentCoverImage, assignmentLink, assignmentName, courseName, uid
                        }, index) => {
                            return <div key={index} className={`border place-content-center relative`}>
                                <span className='flex  gap-2 justify-end items-center p-5 absolute top-0 w-full  bg-linear-to-b from-white/10 to-transparent'>
                                    <span className='text-white font-bold bg-black w-fit cursor-pointer p-2 block'
                                        onClick={() => handleDeleteAssignment(uid, courseName, assignmentName)}>Delete</span>
                                </span>
                                <img src={assignmentCoverImage || null} className='object-fill w-full h-full' />
                                <span
                                    className={`flex flex-col justify-center p-10 w-full h-[30%]  bg-linear-to-b from-transparent to-white/40 absolute bottom-0`}
                                >
                                    <span className='text-white text-xl font-extrabold bg-black w-fit opacity-50 p-2 block'>{courseName}</span>
                                    <span className='text-white font-bold bg-black w-fit opacity-50 p-2 block'>{assignmentName}</span>

                                </span>
                            </div>
                        })

                }
            </div>
            {courseNames.length == 0 && <span className='w-full text-center text-2xl font-bold text-black block'>Don't have any assignment</span>}
        </>
    )
}
const Buttons = ({names, value, setValue, setCurrentCourseName}) => {
    return (
        <div className='w-full mt-10 flex justify-center items-center sticky top-0 backdrop-blur-sm bg-transparent overflow-auto'>
            {/* Buttons for specific courses */}
            <div className={`gap-10 flex items-center p-2 overflow-auto`}>
                <button
                    onClick={() => {
                        setValue(-1);
                        setCurrentCourseName('');
                    }}
                    className={`${ value === -1 ? 'bg-purple-400 text-white' : 'bg-white text-purple-500' } px-5 py-2 text-center font-bold border border-purple-500 outline-0 cursor-pointer shrink-0 capitalize`}>
                    Show All
                </button>
                {
                    names?.map((courseName, index) => {
                        return <button key={index}
                            onClick={() => {
                                setValue(index == 0 ? '' : index);
                                setCurrentCourseName(courseName.toLowerCase());
                            }}
                            className={`${ value === index || index === 0 && value === '' ? 'bg-purple-400 text-white' : 'bg-white text-purple-500' } px-5 py-2 text-center font-bold border border-purple-500 outline-0 cursor-pointer shrink-0 capitalize`}

                        >
                            {courseName}
                        </button>
                    })
                }
            </div>
        </div>
    )
}
export default AllAssignments