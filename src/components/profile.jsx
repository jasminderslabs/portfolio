import {useContext} from "react"
import {GlobalData} from '../context/globalData'

const Profile = () => {
    const {user} = useContext(GlobalData);
    return (
        <div className='flex  justify-center p-10 w-full'>
            <div className='lg:w-100 border border-2xl flex flex-col justify-between items-center p-5 rounded-2xl '>
                <div className="w-40 h-40 rounded-full flex justify-center items-center">
                    <img
                        src={user?.profileImage || ''}
                        alt="profileImage"
                        className="w-full h-full object-contain rounded-full"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full justify-center mt-2">
                    <span className="text-xl text-center capitalize font-bold">{user?.username}</span>
                    <span className="text-xl text-center bg-zinc-100 w-full p-2 rounded-xl">{user?.email}</span>
                </div>
            </div>
        </div>
    )
}

export default Profile