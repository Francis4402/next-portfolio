"use client"

import { StaticImageData } from 'next/image';
import { styles } from '../styes/styles';
import { experiences } from '../constants';
import ExperienceCard from './ExperienceCard';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';



interface Experience {
    title: string;
    icon: StaticImageData;
    iconBg: string;
    points: string[];
}

const Experience = () => {

    useGSAP(() => {
        gsap.fromTo(
            ".experience-text",
            { opacity: 0, y: -50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                
            }
        );
    }, []);

  return (
    <>
        <div className='mt-36'>
            <p className={`${styles.sectionSubText} text-center experience-text`} >
                What I have done so far
            </p>
            <h2 className={`${styles.sectionHeadText} text-center experience-text`}>
                Work Experience.
            </h2>
        </div>

        <div className='mt-20 flex flex-col'>
            <VerticalTimeline>
                {experiences.map((experience, index) => (
                    <ExperienceCard key={`experience-${index}`}
                                    experience={experience}
                    />
                ))}
            </VerticalTimeline>
        </div>
    </>
  )
}

export default Experience