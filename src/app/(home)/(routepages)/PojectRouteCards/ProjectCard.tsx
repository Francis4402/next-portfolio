"use client"

import { TProject } from "@/app/types/Types"
import Image from "next/image"
import { useRouter } from "next/navigation";


const ProjectCardhome = ({project}: {project: TProject}) => {
  
  const router = useRouter();

  const handleProjectDetials = () => {
    router.push(`/projects/${project.id}`);
  }
  

  return (
    <div className="bg-gray-900 shadow-md rounded-2xl overflow-hidden transition-all hover:shadow-lg">

      <div className="relative w-full aspect-[16/9] cursor-pointer" onClick={handleProjectDetials}>
        <Image
          width={500}
          height={300}
          src={project.projectImages}
          alt="Blog Cover"
          className="w-full h-full object-cover"
        />
      </div>


      <div className="p-5">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <button onClick={() => window.open(project.links, "_blank")} className="text-sm bg-blue-400 px-4 rounded-lg text-white hover: scale-105 hover:bg-blue-600 duration-150">Link</button>
        </div>
        <p className="mt-2 text-gray-400 text-sm">{project.description}</p>

        <p className="mt-2 text-gray-500 text-sm text-end">{project.tags}</p>
        
      </div>
    </div>
  )
}

export default ProjectCardhome