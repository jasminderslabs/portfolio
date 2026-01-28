import {createContext, useEffect, useState} from "react";
import {getAssignments} from "../helper/getAssignments";
import {getAllUsers} from "../helper/getAllUsers";
export const GlobalData = createContext(null)



const ContextProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [AllAssignments, setAllAssignments] = useState(null);
    const [selectedAssignment, setSelectedAssignment] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        (async () => {
            const logged = sessionStorage.getItem('logged') || false;
            const getUser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
            if(logged && getUser) {

                setLoggedIn(true);
                setUser(getUser)
                const assignments = getUser.roles?.[1] === 'admin' ? await getAllUsers() : await getAssignments();
                if(assignments) {
                    if(getUser.roles?.[1] === 'admin') setIsAdmin(true)
                    setAllAssignments(assignments);
                }
            }


        })()

    }, []);
    useEffect(() => {
        (async () => {
            if(user.roles?.[1] === "admin") {
                setAllAssignments(await getAllUsers());
                setIsAdmin(true);
            } else {
                setAllAssignments(await getAssignments());
            }
        })();
    }, [user]);
    return (
        <GlobalData.Provider
            value={{

                loggedIn, setLoggedIn,
                user, setUser,
                AllAssignments, setAllAssignments,
                selectedAssignment, setSelectedAssignment,
                isAdmin, setIsAdmin
            }}

        >
            {children}
        </GlobalData.Provider>
    )
}

export default ContextProvider;