import { TProject } from "@/app/types/Types";
import type { Metadata } from 'next'
import ProjectCardhome from "../PojectRouteCards/ProjectCard";
import { getProjects } from "@/app/utls/actions/getData/getProjects";

export const metadata: Metadata = {
  title: 'Projects',
  description: 'My Projects'
}

const Projects = async () => {
  const projects = await getProjects();


  return (
      <div className="bg-gray-950 text-gray-200 min-h-screen">
        <div className="lg:h-[400px] md:h-[200px] w-full bg-[url('/bgimages.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="text-white lg:h-[400px] h-[200px] bg-black/50 flex flex-col gap-5 justify-center items-center">
              <h1 className="md:text-4xl text-2xl font-serif">My Projects</h1>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto justify-center items-center lg:px-0 px-5">
            <div className="my-20">
              <p className="font-serif text-gray-400">Total Projects: {projects?.length}</p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10 pb-20">
                {
                  projects?.length > 0 ? (
                    projects?.map((project: TProject) => (
                      <ProjectCardhome key={project.id} project={project} />
                    ))
                  ) : <div className="text-gray-400">No Projects Added Yet</div>
                }
            </div>
        </div>
    </div>
  )
}

export default Projects;
