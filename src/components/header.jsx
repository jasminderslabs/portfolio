import {useContext} from "react"
import {GlobalData} from "../context/globalData"


import {Link} from "react-router-dom";
import Logout from "./logout";

const Header = () => {
    const {loggedIn, isAdmin} = useContext(GlobalData);



    return (
        <header className={` h-20 z-5 relative flex justify-between items-center px-5 border-b `}>
            {
                loggedIn &&
                <div className="h-full w-fit flex gap-5 ">
                    <Link to={'/'} >
                        <span className="w-full h-full font-bold flex justify-center items-center capitalize">
                            Assignments
                        </span></Link>
                    <Link to={'/upload-assignment'} >
                        <span className="w-full h-full font-bold flex justify-center items-center capitalize">
                            upload Assignment
                        </span></Link>
                    <Link to={'/profile'} >
                        <span className="w-full h-full font-bold flex justify-center items-center capitalize">
                            Profile
                        </span></Link>
                    {
                        isAdmin && <>
                            <Link to={'/all-users'} >
                                <span className="w-full h-full font-bold flex justify-center items-center capitalize">
                                    all users
                                </span></Link>
                            <Link to={'/all-assignments'} >
                                <span className="w-full h-full font-bold flex justify-center items-center capitalize">
                                    All Assignments
                                </span></Link>
                        </>
                    }

                </div>
            }
            <div className="h-full flex items-center gap-10 ">

                <nav className={`w-full h-full`}>
                    {
                        !loggedIn
                            ? <ul className={`h-full text-lg flex justify-between items-center gap-16 outfit-bold`}>
                                <li className="flex cursor-pointer justify-center items-center tracking-wider border px-5 py-2 rounded-2xl">
                                    <Link to='/login'>Login</Link>
                                    <span>

                                    </span>
                                </li>
                                <li
                                    className="flex justify-center items-center tracking-wider  cursor-pointer px-5 py-2 rounded-2xl">
                                    <Link to='/signup'>Signup</Link>
                                </li>
                            </ul>
                            : <Logout />
                    }


                </nav>
            </div>

        </header>
    )
}

export default Header