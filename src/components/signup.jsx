import {useContext, useEffect, useState} from "react"
import {GlobalData} from "../context/globalData";
import {Link, useNavigate} from "react-router-dom";
import {storeUser} from "../helper/storeUser";
import {getUser} from "../helper/getUser";


const Signup = () => {

    const {loggedIn, setUser, setLoggedIn} = useContext(GlobalData)
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [profileImageFile, setProfileImageFile] = useState(null)
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',
        profileImage: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        profileImage: ''
    });

    const handleProfileImage = (e) => {
        try {
            const file = e.target.files[0] || '';

            if(file) {
                setProfileImageFile(file)
                const reader = new FileReader;
                reader.onload = () => {
                    const url = reader.result;
                    setUserDetails(prev => ({
                        ...prev,
                        profileImage: url
                    }));
                }

                reader.readAsDataURL(file);
            }
        } catch(error) {
            console.log(error)

        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let isEmpty = false;
            for(let key in userDetails) {
                if(!userDetails[key]) {
                    isEmpty = true;
                    setErrors(prev => ({
                        ...prev,
                        [key]: key + ' is Required'
                    }));
                }
            }
            if(isEmpty) return;
            setLoading(true);
            setErrors({
                username: '',
                email: '',
                password: '',
                profileImage: ''
            })
            const isStored = await storeUser(userDetails, profileImageFile) === true;
            if(isStored) {
                // navigate('/login');
                const user = await getUser(userDetails.email, userDetails.password);
                if(user) {
                    setUser(user);
                    navigate('/')
                    setLoggedIn(true);
                    sessionStorage.setItem('logged', true);
                    sessionStorage.setItem('user', JSON.stringify(user))
                    alert('User Created Successfully');

                }
            }
            else alert('User not added. Please try later.')
            setLoading(false)
        } catch(error) {
            setLoading(false);
            alert(error);
            console.log(error)

        }
    }

    useEffect(() => {
        if(loggedIn) navigate('/')
    }, [loggedIn])
    return (
        <div className={`w-full h-screen flex justify-center py-5`}
        >
            <div className='w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%]  '>
                <form
                    onSubmit={handleSubmit}
                    className="w-full h- flex flex-col gap-7 px-5 py-2 border  rounded-2xl outfit-regular"
                >

                    <h1
                        className="text-2xl outfit-extrabold tracking-wide"

                    >Signup Form</h1>
                    {/** Profile Image */}
                    <div className="w-full flex justify-center items-center flex-col ">
                        <label htmlFor="picture"
                            className="w-30 h-30 rounded-full border  flex justify-center items-center overflow-hidden"

                        >
                            {
                                userDetails.profileImage
                                    ? <img src={userDetails.profileImage} alt="profile-image" className="w-full h-full object-cover" />
                                    : 'Profile Pic'
                            }
                        </label>
                        <input type="file" className="hidden"
                            id="picture"
                            onChange={handleProfileImage}
                            accept="image/*" />
                        {errors.profileImage && <span className="text-red-500 text-center my-1 w-full">{errors.profileImage}</span>}

                    </div>

                    <div className="flex flex-col  gap-2">
                        <label
                            className="w-full text-start outfit-bold text-lg"

                        >
                            Username
                        </label>
                        <input type="text"
                            placeholder="Enter your name"
                            className="px-5 py-3 rounded-2xl border"

                            onChange={(e) => {setUserDetails({...userDetails, username: e.target.value})}}
                        />
                        {errors.username && <span className="text-red-500 text-left w-full">{errors.username}</span>}

                    </div>

                    <div className="flex flex-col  gap-2">
                        <label
                            className="w-full text-start outfit-bold text-lg"

                        >
                            Email
                        </label>
                        <input type="email"
                            placeholder="john@gmail.com"
                            className="px-5 py-3 rounded-2xl border"

                            onChange={(e) => {setUserDetails({...userDetails, email: e.target.value})}} />
                        {errors.email && <span className="text-red-500 text-left w-full">{errors.email}</span>}

                    </div>
                    <div className="flex flex-col  gap-2 relative">
                        <label
                            className="w-full text-start outfit-bold text-lg"

                        >
                            Password
                        </label>
                        <input type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="px-5 py-3 rounded-2xl border"

                            onChange={(e) => {setUserDetails({...userDetails, password: e.target.value})}}
                        />
                        {errors.password && <span className="text-red-500 text-left w-full">{errors.password}</span>}
                    </div>
                    <div className={`w-full`}>
                        <button
                            className="w-full outfit-bold text-lg rounded-2xl py-3 cursor-pointer bg-green-400 text-white font-bold"
                            type="submit"
                            disabled={loading}

                        >
                            {
                                loading
                                    ? <div className="w-full h-full flex justify-center items-center gap-5">
                                        <span className="block w-5 h-5 border-t-2 rounded-full animate-spin"></span>
                                        <span className=" opacity-55">Creating...</span>
                                    </div>
                                    : "Create Account"
                            }
                        </button>
                    </div>
                    <span className="w-full "
                    >
                        Already have an account? Please <Link to='/login' className='text-blue-500 underline' >login</Link>.
                    </span>
                </form>
            </div>
        </div>

    )
}

export default Signup