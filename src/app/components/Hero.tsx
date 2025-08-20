"use client"

import gsap from 'gsap';
import Image from 'next/image';
import { styles } from '../styes/styles';
import { useGSAP } from '@gsap/react';

const Hero = () => {

    useGSAP(() => {
        gsap.fromTo(
            ".hero-text",
            { opacity: 0, y: -50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                
            }
        );

        gsap.fromTo(
            ".img",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
            }
        );
    }, []);

  return (
    <section className="relative w-full">
        <div className={`relative inset-0 sm:top-[120px] top-10 mx-auto ${styles.paddingX} lg:flex flex-row grid items-start gap-5`}>
            <div className="flex gap-8">
                <div className='flex flex-col justify-center items-center mt-5'>
                    <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
                    <div className='w-1 lg:h-80 h-52 violet-gradient' />
                </div>
                <div className={"hero-text"}>
                    <h1 className={`${styles.heroHeadText} text-white`}>Hi, I am <span className='text-[#915EFF]'>Francis</span></h1>
                    <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                        I am a Web Developer
                    </p>
                    <p>From Chittagong, Bangladesh</p>
                </div>
            </div>
            <div className="md:w-96 md:h-96 w-full mx-auto img">
                <Image className="rounded-xl" src={'/editedphoto.png'} width={'400'} height={'400'} alt={"i"}  />
            </div>
        </div>
    </section>
  )
}

export default Hero