"use client"

import { styles } from "@/app/styes/styles";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';


const WorkSectionToptext = () => {

  useGSAP(() => {
    gsap.fromTo(
        ".work-text",
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
    <div>
        <div className="work-text">
          <p className={`${styles.sectionSubText}`}>My work</p>
          <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
        </div>

        <div className='w-full flex'>
          <p
            className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] work-text'
          >
            Following projects showcase my skills and experience through real-world examples of my work.
            Each project is briefly described with links to code repositories and live demos. 
            It reflects my ability to solve complex problems, work with different technologies,
            and manage projects effectively.
          </p>
        </div>
    </div>
  )
}

export default WorkSectionToptext