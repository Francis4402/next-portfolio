

import Image from 'next/image'


const cards = [
    {
      icon: "/icons/web.png",
      title: "Full Stack Web Development",
    },
    {
      icon: "/icons/creator.png",
      title: "UI/UX Design",
    },
    {
      icon: "/icons/mobile.png",
      title: "SEO Optimization",
    },
    {
      icon: "/icons/backend.png",
      title: "Project Management",
    }
];

const ServicesCard = () => {
  return (
    <div>
        {cards.map((card, index) => (
          <div key={index} className='xs:w-[250px] w-full'>
            <div className={`w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card service-card-${index}`}>
                <div className=' bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
                    <Image src={card.icon} alt="i" width={50} height={50} />
                    <h3 className='text-white text-[20px] font-bold text-center'>{card.title}</h3>
                </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ServicesCard