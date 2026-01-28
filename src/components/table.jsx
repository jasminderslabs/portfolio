import React, {useContext, useEffect, useState} from 'react'
import Hero from './hero'
import {GlobalData} from '../context/globalData'
import {Ellipsis} from 'lucide-react'

const Table = () => {
    const {AllAssignments} = useContext(GlobalData);
    const [users, setUsers] = useState(new Map());
    useEffect(() => {
        if(AllAssignments) {
            const tempMap = new Map();
            AllAssignments.forEach(assignment => {
                tempMap.set(assignment.uid, assignment)
            });

            setUsers(tempMap)
        }
    }, [AllAssignments]);


    return (
        <div className='h-full w-full'>
            <Hero />
            <div className='relative w-full flex justify-center p-10'>
                <table className='w-[70%] h-fit  border-x p-2 absolute -top-20 bg-white '>
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
                            users?.values()?.map(({username, email, createdAt, roles, url, uid}) => {
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
            </div>
        </div>
    )
}

export default Table