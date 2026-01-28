import {useContext, useState} from "react"
import {GlobalData} from "../context/globalData"
import {storeAssignment} from "../helper/storeAssignment";
import {useNavigate} from "react-router-dom";

const CreateAssignment = () => {
    const {setAllAssignments, user} = useContext(GlobalData);
    const [coverImage, setCoverImage] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        courseName: '',
        assignmentName: '',
        assignmentLink: '',
        assignmentCoverImage: '',
    });
    const [errors, setErrors] = useState({
        courseName: '',
        assignmentName: '',
        assignmentLink: '',
        assignmentCoverImage: '',
    });
    const handleCoverImage = (e) => {
        const file = e.target.files[0] || "";
        if(file) {
            setCoverImage(file)
            const reader = new FileReader;
            reader.onload = () => {
                const url = reader.result;
                setFormData(prev => ({
                    ...prev,
                    assignmentCoverImage: url
                }));
            }
            reader.readAsDataURL(file);
        }
    }
    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            e.preventDefault();
            let isEmpty = false;
            for(let key in formData) {
                if(!formData[key]) {
                    isEmpty = true;
                    setErrors(prev => ({
                        ...prev,
                        [key]: key + ' is required'
                    }))
                }
            }

            if(isEmpty) {
                setLoading(false)
                return;
            }
            else {
                await storeAssignment(formData, coverImage);
                setAllAssignments(prev => ([
                    ...prev,
                    {
                        ...formData,
                        ...user,
                        id: prev.length + 1
                    }
                ]))
                setErrors({
                    courseName: '',
                    assignmentName: '',
                    assignmentLink: '',
                    assignmentCoverImage: '',
                })
                navigate('/')
            }
            setLoading(false)

        } catch(error) {
            setLoading(false)
            console.log(error)

        }
    }

    return (
        <div className="w-full flex justify-center items-center p-5">
            <div className=" w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] border rounded-2xl min-h-190 "
            >
                <form
                    onSubmit={handleSubmit}
                    className="w-full h-full min-h-190 flex flex-col justify-between gap-7 p-5 ">
                    <label htmlFor="cover" className=" cursor-pointer w-full flex justify-center items-center text-xl min-h-60 bg-slate-100 rounded-2xl">
                        {
                            formData.assignmentCoverImage
                                ? <img src={formData.assignmentCoverImage} alt="cover-image"
                                    className="w-full h-full object-contain aspect-video rounded-2xl" />
                                : "Add cover image"
                        }
                    </label>
                    {errors.assignmentCoverImage
                        &&
                        <span className="text-red-500 capitalize w-full text-left">{errors.assignmentCoverImage}</span>}

                    <input type="file" className="hidden" id="cover"
                        onChange={handleCoverImage}
                        accept="image/*" />

                    <div className="w-full flex flex-col gap-2 ">
                        <label
                            className="text-black outfit-bold w-full text-left text-lg"
                        >
                            Course Name</label>
                        <input type="text"
                            placeholder="Example : Firebase"
                            className="border rounded-lg py-2 px-3 text-black "

                            onChange={(e) => setFormData({...formData, courseName: e.target.value})} />
                        {errors.courseName
                            &&
                            <span className="text-red-500 capitalize w-full text-left">{errors.courseName}</span>}

                    </div>
                    <div className="w-full flex flex-col gap-2  ">
                        <label
                            className="text-black outfit-bold w-full text-left text-lg"
                        >
                            Assignment Name</label>
                        <input type="text"
                            placeholder="Example : Health, Landing page"
                            className="border rounded-lg py-2 px-3 text-black "

                            onChange={(e) => setFormData({...formData, assignmentName: e.target.value})} />
                        {errors.assignmentName
                            &&
                            <span className="text-red-500 capitalize w-full text-left">{errors.assignmentName}</span>}

                    </div>
                    <div className="w-full flex flex-col gap-2  ">
                        <label
                            className="text-black outfit-bold w-full text-left text-lg"
                        >
                            Assignment Link</label>
                        <input type="text"
                            placeholder="Paste the Link here."
                            className="border rounded-lg py-2 px-3 text-black"

                            onChange={(e) => setFormData({...formData, assignmentLink: e.target.value})} />
                        {errors.assignmentLink
                            &&
                            <span className="text-red-500 capitalize w-full text-left">{errors.assignmentLink}</span>}

                    </div>
                    <div className="w-full">
                        <button
                            className="py-3 rounded-2xl w-full cursor-pointer shimmer text-xl tracking-wider bg-blue-400 text-white"
                            type="submit"
                        >
                            {
                                loading
                                    ? <div className="w-full h-full flex justify-center items-center gap-5">
                                        <span className="block w-5 h-5 border-t-2 rounded-full animate-spin"></span>
                                        <span className=" opacity-55">Uploading...</span>
                                    </div>
                                    : "Upload"
                            }
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateAssignment