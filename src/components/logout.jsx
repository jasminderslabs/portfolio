import {signOut} from "firebase/auth";
import {auth} from "../firebaseconfig";
import {useContext, useState} from "react";
import {GlobalData} from "../context/globalData";

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const {setLoggedIn, user, setSelectedAssignment, setAllAssignments, isAdmin, setIsAdmin} = useContext(GlobalData);



    const handleLogout = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            sessionStorage.clear();
            setLoading(false);
            setLoggedIn(false)
            setAllAssignments([]);
            setSelectedAssignment({})
            setIsAdmin(false)


        } catch(error) {
            setLoading(false);
            console.log(error);

        }
    }
    return (
        <div className="flex gap-10 h-full justify-center items-center">
            {
                isAdmin && <span className={`inline-block border rounded-xl px-5 py-2  text-blue-400 text-xl`}>Admin</span>
            }
            <button className={`border text-lg px-5 py-2 rounded-2xl cursor-pointer bg-red-500 text-white`}

                onClick={handleLogout}
            >
                {
                    loading
                        ? <div className="w-full h-full flex justify-center items-center gap-5 ">
                            <span className="block w-5 h-5 border-t-2 rounded-full animate-spin"></span>
                            <span className=" opacity-55">loading...</span>
                        </div>
                        : "Logout"
                }
            </button>
        </div>
    )
}

export default Logout