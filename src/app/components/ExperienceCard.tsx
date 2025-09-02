/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import { VerticalTimelineElement } from "react-vertical-timeline-component"


const ExperienceCard = ({ experience}: any) => {
  return (
    <VerticalTimelineElement contentStyle={{
        background: "#1d1836",
        color: "#fff",
    }} 
    date={experience.date}
    iconStyle={{ background: experience.iconBg }}
    icon = {
        <div className='flex justify-center items-center w-full h-full'>
            <Image src = {experience.icon} alt={"i"}
                   className='w-[60%] h-[60%] object-contain' />
        </div>
    }>
        <div>
            <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
            <p className=' text-secondary text-[16px] font-semibold' style={{ margin: 0 }}></p>
        </div>
        <ul className='mt-5 list-disc ml-5 space-y-2'>

            {experience.points.map((point: any, index: any) => (
                <li key={`experience-point-${index}`} className=' text-white text-[14px] pl-1 tracking-wider'>
                    {point}
                </li>
            ))}

        </ul>
    </VerticalTimelineElement>
  )
}

export default ExperienceCard