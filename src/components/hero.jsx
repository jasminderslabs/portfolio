import {motion} from 'motion/react'

const animate = {

    y: [0, -15],
    x: [0, 20]
}
const transition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: 2,
    ease: "easeInOut"
}
const Hero = () => {
    const name = 'Jasminder Singh';

    return (
        <div className=' relative w-full min-h-[50vh] border bg-linear-to-br from-blue-600 to-purple-500 flex justify-center items-center '>
            {/* <motion.img
                src='/html.png'
                alt='html-logo'
                height={40}
                width={40}
                className='absolute rotate-12 left-[30%] top-[20%] shadow-sm '
                animate={animate}
                transition={transition}
            />
            <motion.img
                src='/css.png'
                alt='css-logo'
                height={40}
                width={40}
                className='absolute  right-[40%] top-[20%] rotate-12 shadow-sm '
                animate={animate}
                transition={transition}
            />
            <motion.img
                src='/js.png'
                alt='js-logo'
                height={40}
                width={40}
                className='absolute  right-[35%] top-[50%] -rotate-12  opacity-80 shadow-sm '
                animate={animate}
                transition={transition}
            />
            <motion.img
                src='/react.png'
                alt='react-logo'
                height={40}
                width={40}
                className='absolute  left-[25%] top-[55%] -rotate-12 opacity-80  shadow-sm '
                animate={animate}
                transition={transition}
            /> */}

            <div className='w-full md:w-[50%] z-2'>
                <motion.span className='text-xl md:text-2xl text-white text-center w-full inline-block mb-10 font-bold'
                    initial={{
                        y: -100,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.2,
                        type: 'spring',
                        stiffness: 50
                    }}
                >
                    Welcome to my portfolio
                </motion.span>
                <motion.h1
                    className=' break-all text-white font-extrabold overflow-hidden text-center p-1 shrink-0'
                >
                    I'm {" "}
                    {
                        name.split('').map((char, index) => {
                            return <motion.span key={index}
                                initial={{
                                    y: 100,
                                    opacity: 0

                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1
                                }}
                                whileHover={{
                                    scale: 1.5
                                }}
                                transition={{
                                    duration: 0.2,
                                    delay: .1 * index,
                                    type: 'spring'
                                }}
                                className='inline-block'
                            >{char === " " ? "\u00A0" : char}</motion.span>
                        })
                    }

                </motion.h1>
            </div>




        </div>


    )
}

export default Hero