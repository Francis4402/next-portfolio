/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerticalTimelineElement } from "react-vertical-timeline-component"


const EducationCard = ({ education }: any) => {
  return (
    <VerticalTimelineElement contentStyle={{
        background: "#1d1836",
        color: "#fff",
    }} 
    date={education.date}
    iconStyle={{ background: education.iconBg }}
    icon = {
        <div className='flex justify-center items-center w-full h-full'>
            <div className="w-[60%] h-[60%] object-contain">
                {education.icon}
            </div>
        </div>
    }>
        <div>
            <h3 className='text-white text-[24px] font-bold'>{education.title}</h3>
            <p className=' text-secondary text-[16px] font-semibold' style={{ margin: 0 }}></p>
        </div>
        <ul className='mt-5 list-disc ml-5 space-y-2'>

            {education.points.map((point: any, index: any) => (
                <li key={`experience-point-${index}`} className=' text-white text-[14px] pl-1 tracking-wider'>
                    {point}
                </li>
            ))}

        </ul>
    </VerticalTimelineElement>
  )
}

export default EducationCard