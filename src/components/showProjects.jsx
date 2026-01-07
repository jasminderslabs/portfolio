import { motion } from 'motion/react'
import { useEffect, useState } from 'react';
import { portfolioImages } from '../portfolioImages'

const Projects = () => {
    const courseNames = [
        'Show All',
        'Responsive web design',
        'Form Validation',
        'Calculator App',
        'Grocery List App',
        'Quote Generator',
        'Course 6',
        'Course 7'
    ];
    const [currentCourseSelected, setCurrentCourseSelected] = useState('');
    const [showOverlay, setOverlay] = useState(null)


    return (
        <>
            <Buttons
                names={courseNames}
                value={currentCourseSelected}
                setValue={setCurrentCourseSelected} />
            <div className={`${currentCourseSelected === '' ? 'grid grid-cols-1 lg:grid-cols-2 gap-10' : null}  py-10 mx-10`}>

                {
                    portfolioImages.map(({ src, alt, link }, index) => {
                        return <div key={index}
                            className={`relative cursor-pointer overflow-hidden shadow-md ${currentCourseSelected - 1 === index ? 'block' : currentCourseSelected === '' ? 'block' : 'hidden'}`}
                            onMouseEnter={() => setOverlay(index)}
                            onMouseLeave={() => setOverlay(null)}
                        >


                            <img
                                src={src}
                                alt={alt}
                                className='w-full h-full object-contain'
                            />
                            <span
                                className={` backdrop-blur-[3px] bg-transparent w-full h-full absolute left-0 right-0 top-0 bottom-0 m-auto flex justify-center items-center
                                ${showOverlay === index ? 'translate-y-0 ' : '-translate-y-full -translate-x-full'} transition-all duration-500`}>
                                <a href={link} target='_blank'
                                    className='relative px-5 py-3 text-white bg-linear-to-br from-blue-400 to-purple-400 rounded-md'>See Project</a>
                            </span>
                        </div>
                    })
                }



            </div>

        </>
    )
}
const Buttons = ({ names, value, setValue }) => {
    return (
        <div className='w-full mt-10 flex justify-center items-center sticky top-0 backdrop-blur-sm bg-transparent'>
            {/* Buttons for specific courses */}
            <div className={`gap-10 flex items-center p-2 overflow-auto`}>
                {
                    names.map((name, index) => {
                        return <motion.button key={index}
                            onClick={() => setValue(index == 0 ? '' : index)}
                            className={`${value === index || index === 0 && value === '' ? 'bg-purple-400 text-white' : 'bg-white text-purple-500'} px-5 py-2 text-center font-bold border border-purple-500 outline-0 cursor-pointer shrink-0`}
                            initial={{
                                scale: 1
                            }}
                            whileHover={{
                                scale: 1.1
                            }}
                            transition={{
                                duration: 0.3,
                                stiffness: 600,
                                type: 'spring'
                            }}
                        >
                            {name}
                        </motion.button>
                    })
                }
            </div>
        </div>
    )
}
export default Projects