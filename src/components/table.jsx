import React, {useContext, useEffect, useState} from 'react'
import Hero from './hero'
import {GlobalData} from '../context/globalData'
import {ChevronLeft, ChevronRight, Ellipsis} from 'lucide-react'

const Table = () => {
    const {AllAssignments} = useContext(GlobalData);
    const [users, setUsers] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const totalPages = Math.ceil(users?.length / perPage);
    const [prevPointer, setPrevPointer] = useState(0);
    const [nextPointer, setNextPointer] = useState(1)
    useEffect(() => {
        if(AllAssignments) {

            const uniqueUsers = {};
            AllAssignments.forEach(assignment => {
                uniqueUsers[assignment.uid] = assignment

            });

            setUsers(Object.values(uniqueUsers))
        }
    }, [AllAssignments]);


    return (
        <div className='h-full w-full'>
            <Hero />
            <div className='relative w-full h-full p-10 flex flex-col'>
                <div className='w-[70%] h-fit p-2 absolute -top-20 left-0 right-0 bg-white mx-auto '>
                    <table className='w-full h-full border-x '>
                        <thead className='w-full px-2 '>
                            <tr className='text-left border-y'>
                                <th className='p-2 border-e'>
                                    <input type='checkbox' className='w-5 h-5' />
                                </th>
                                <th className='p-2 border-e'>Name</th>
                                <th className='p-2 border-e'>Email</th>
                                <th className='p-2 border-e'>Role</th>
                                <th className='p-2 border-e'>Status</th>
                                <th className='p-2 border-e'>Created At</th>

                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {
                                users?.slice(prevPointer * perPage, perPage * nextPointer)?.map(({username, email, createdAt, roles, url, uid}) => {
                                    return <tr key={uid} className='w-full text-left border-b '>
                                        <td className='p-2 border-e flex  gap-5 items-center w-fit'>
                                            <input type='checkbox' className='w-5 h-5' />
                                            <img src={url || null} alt='profile' width={30} height={30} className=' aspect-square rounded-full' />
                                        </td>
                                        <td className='p-2 border-e capitalize'>{username}</td>
                                        <td className='p-2 border-e'>{email}</td>
                                        <td className='p-2 border-e capitalize'>{
                                            roles.includes('admin') ? 'admin' : 'user'
                                        }</td>
                                        <td className='p-2 border-e capitalize'>Active</td>
                                        <td className='p-2 border-e capitalize'>
                                            {createdAt ? new Date(createdAt).toDateString() : new Date().toDateString()}
                                        </td>
                                        <td className='flex items-center justify-center py-2'>
                                            <span className='block w-12 h-12 rounded-xl bg-slate-100 flex justify-center items-center'>
                                                <Ellipsis />
                                            </span>
                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                    <div className='w-full border-x border-b p-2 flex justify-between items-center'>
                        <span>
                            per page <select>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                                <option value={30}>30</option>
                                <option value={35}>35</option>

                            </select>
                        </span>

                        <div className='flex justify-center items-center gap-5'>
                            <div className='flex gap-2 items-center'>
                                <span>1</span>
                                <span>to</span>
                                <span>{totalPages}</span>
                            </div>
                            <span className='flex gap-3'>
                                <ChevronLeft className='border cursor-pointer'
                                    onClick={() => {

                                        setPrevPointer(prev => prev === 0 ? 0 : prev - 1);
                                        setNextPointer(prev => prev === 1 ? 1 : prev - 1)
                                    }} />
                                <ChevronRight className='border cursor-pointer'
                                    onClick={() => {
                                        if(nextPointer !== totalPages) {

                                            setNextPointer(prev => prev === totalPages ? prev : prev + 1);
                                            setPrevPointer(nextPointer)
                                        }

                                    }} />
                            </span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Table