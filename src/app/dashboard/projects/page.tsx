
import { TProject } from "@/app/types/Types";
import ProjectCard from "../components/ProjectCard";
import type { Metadata } from 'next'
import { getProjects } from "@/app/utls/actions/getData/getProjects";
import ProjectModel from "../AddModels/ProjectModel";



export const metadata: Metadata = {
    title: 'Dashboard-Projects',
    description: 'All Projects'
}


const Projects = async () => {


  const projects = await getProjects();


  return (
    <div className="container mx-auto flex flex-col gap-10 p-6 md:p-12">

        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold text-white">All Projects</h1>
          <ProjectModel />
        </div>


        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
            {
              projects?.length > 0 ? projects?.map((project: TProject) => (
                <ProjectCard key={project.id} project={project} />
              )) : <p>No Projects Added Yet</p>
            }
        </div>
      </div>
  )
}

export default Projects