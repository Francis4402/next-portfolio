
"use client"


import Image from "next/image";
import Tilt from 'react-parallax-tilt';
import { useRouter } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { TProject } from "@/app/types/Types";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";



const WorkSectionProjectCard = ({project, index}: {project: TProject, index: number}) => {

    const {data: session} = useSession();

    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const router = useRouter();

    const handleProjectDetials = () => {
        router.push(`/projects/${project.id}`);
    }

    useGSAP(() => {
      cardsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
              },
            }
          );
        }
      });
    }, []);
    
  return (
    <div ref={el => {cardsRef.current[index] = el}}>
      <Tilt className='bg-tertiary p-5 shadow-lg shadow-blue-950 rounded-2xl sm:w-[360px] w-full'>

        <div className='relative w-full h-[230px] cursor-pointer' onClick={handleProjectDetials}>
          <Image
            width={500}
            height={500}
            src={project.projectImages}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div className='black-gradient w-10 h-10 rounded-full flex justify-center items-center'>
              <Image
                width={40}
                height={40}
                src={'/icons/web.png'}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <div className="flex justify-between items-center">
            <h3 className='text-white font-bold text-[24px]'>{project.title}</h3>
          </div>
          <p className='mt-2 text-secondary truncate text-[14px]'>{project.description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2 text-gray-400 justify-start'>
          {
              session?.user ? (
                <div className="flex gap-2">
                  <Button variant={"secondary"} size={"sm"} onClick={() => window.open(project.livelink, "_blank")}><ExternalLink className="h-3 w-3" />Link</Button>
                  <Button variant={"secondary"} size={"sm"} onClick={() => window.open(project.githublink, "_blank")}><FaGithub/>Github</Button>
                </div>
              ) : ""
            }
          
        </div>

        <div className='mt-4 flex flex-wrap gap-2 text-gray-400 justify-end'>
          {project.tags}
        </div>
        
      </Tilt>
    </div>
  )
}

export default WorkSectionProjectCard