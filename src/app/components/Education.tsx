"use client"


import { styles } from '../styes/styles'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import EducationCard from './EducationCard'
import { MdOutlineCastForEducation } from "react-icons/md";

const educations = [
    {
      title: "Bachelor of Science in Computer Science",
      date: "2023",
      icon: <MdOutlineCastForEducation />,
      iconBg: "#383E56",
      points: [
        "Bachelor of Science in Computer Science",
        "Major: Computer Science",
        "GPA: 3.40",
      ]
    },
    {
      title: "Deploma in Computer Science",
      date: "2019",
      icon: <MdOutlineCastForEducation />,
      iconBg: "#383E56",
      points: [
        "Deploma in Computer Science",
        "Major: Computer Science",
        "GPA: 3.20",
      ]
    },
    {
      title: "Secondary School",
      date: "2013",
      icon: <MdOutlineCastForEducation />,
      iconBg: "#383E56",
      points: [
        "Secondary School",
        "Major: Science",
        "GPA: 3.29",
      ]
    }
  ]

const Education = () => {
  return (
    <div className='mt-36'>
        <h2 className={`${styles.sectionHeadText} text-center experience-text`}>
            Education
        </h2>

        <div className='mt-20 flex flex-col'>
            <VerticalTimeline>
                {
                    educations.map((education, index) => (
                        <EducationCard key={`education-${index}`} education={education} />
                    ))
                }
            </VerticalTimeline>
        </div>
    </div>
  )
}

export default Education