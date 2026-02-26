import {useContext, useEffect, useState} from "react"
import {GlobalData} from "../context/globalData";
import {Eye, EyeOff} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {getUser} from "../helper/getUser";


const Login = () => {
    const {loggedIn, setLoggedIn, user, setUser} = useContext(GlobalData);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            let isEmpty = false;
            for(let key in loginDetails) {

                if(!loginDetails[key]) {

                    setErrors(prev => ({
                        ...prev,
                        [key]: key + ' is required'
                    }));
                    isEmpty = true;
                }
            }

            if(isEmpty) {
                setLoading(false);
                return;
            }
            else {
                const user = await getUser(loginDetails.email, loginDetails.password);
                if(user) {
                    setUser(user);
                    navigate('/')
                    setLoggedIn(true);
                    sessionStorage.setItem('logged', true);
                    sessionStorage.setItem('user', JSON.stringify(user))
                }
                setLoading(false);


            }
        } catch(error) {
            setLoading(false);
            console.log(error);
            alert(error)

        }
    }
    useEffect(() => {
        if(loggedIn) navigate('/')
    }, [loggedIn])


    return (
        <div className={`w-full h-screen flex justify-center items-center`}>
            <div className=' w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%]  '>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-10 p-5 border  rounded-2xl outfit-regular"
                >
                    <h1
                        className="text-2xl outfit-extrabold tracking-wide"

                    >Login Form</h1>

                    <div className="flex flex-col  gap-5">
                        <label
                            className="w-full text-start outfit-bold text-lg"

                        >
                            Email
                        </label>
                        <input type="email" placeholder="Enter your name"
                            className="px-5 py-3 rounded-2xl border"

                            onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value})}
                        />
                        {errors.email && <span className="text-red-400 w-full text-left capitalize">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col gap-5 relative">
                        <label
                            className="w-full text-start outfit-bold text-lg"

                        >
                            Password
                        </label>
                        <input type='password' placeholder="Enter your name"
                            className="px-5 py-3 rounded-2xl border"

                            onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})} />

                        {errors.password && <span className="text-red-400 text-left capitalize w-full">{errors.password}</span>}
                    </div>
                    <div className={`w-full`}>
                        <button
                            type="submit"
                            className="w-full outfit-bold text-lg rounded-2xl py-3 cursor-pointer bg-blue-400 text-white"

                        >
                            {
                                loading
                                    ? <div className="w-full h-full flex justify-center items-center gap-5">
                                        <span className="block w-5 h-5 border-t-2 rounded-full animate-spin"></span>
                                        <span className=" opacity-55">logging...</span>
                                    </div>
                                    : "Login"
                            }
                        </button>
                    </div>
                    <span className="w-full "
                    >
                        Don't have any account? Please <Link to='/signup' className="text-blue-500 underline">create account</Link> first.
                    </span>
                </form>
            </div>
        </div>

    )
}

export default Login