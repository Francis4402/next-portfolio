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

    const handleProjectDetails = () => {
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
      <div ref={el => {cardsRef.current[index] = el}} className="w-full">
        <Tilt className='bg-tertiary p-4 md:p-5 shadow-lg shadow-blue-950 rounded-2xl w-full max-w-[400px] mx-auto'>
          {/* Image Section */}
          <div className='relative w-full h-[180px] sm:h-[200px] md:h-[230px] cursor-pointer' onClick={handleProjectDetails}>
            <Image
              fill
              src={project.projectImages}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl'
            />
  
            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
              <div className='black-gradient w-8 h-8 md:w-10 md:h-10 rounded-full flex justify-center items-center'>
                <Image
                  width={20}
                  height={20}
                  src={'/icons/web.png'}
                  alt='source code'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          </div>
  
          {/* Content Section */}
          <div className='mt-4 md:mt-5'>
            <div className="flex justify-between items-center">
              <h3 className='text-white font-bold text-lg sm:text-xl md:text-[24px] line-clamp-1'>{project.title}</h3>
            </div>
            <p className='mt-2 text-secondary text-sm md:text-[14px] line-clamp-2'>{project.description}</p>
          </div>
  
          {/* Buttons Section */}
          <div className='mt-3 md:mt-4 flex flex-wrap gap-2 justify-between items-center'>
            {session?.user ? (
              <div className="flex gap-2">
                <Button 
                  variant={"secondary"} 
                  size={"sm"} 
                  className="text-xs md:text-sm"
                  onClick={() => window.open(project.livelink, "_blank")}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Live Demo
                </Button>
                <Button 
                  variant={"secondary"} 
                  size={"sm"}
                  className="text-xs md:text-sm"
                  onClick={() => window.open(project.githublink, "_blank")}
                >
                  <FaGithub className="mr-1" size={12}/>
                  Github
                </Button>
              </div>
            ) : null}
            
            {/* Tags Section */}
            <div className="flex flex-wrap gap-1 justify-end">
              {typeof project.tags === 'string' ? (
                project.tags.split(',').map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-md"
                  >
                    {tag.trim()}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">{project.tags}</span>
              )}
            </div>
          </div>
        </Tilt>
      </div>
    );
}

export default WorkSectionProjectCard;