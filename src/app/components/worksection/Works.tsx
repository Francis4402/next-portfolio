import { getProjects } from "@/app/utls/actions/getData/getProjects";
import WorkSectionProjectCard from "./WorkSectionProjectCard";
import WorkSectionToptext from "./WorkSectionToptext";
import { TProject } from "@/app/types/Types";

const Works = async () => {
  const projects = await getProjects();

  return (
    <div className="justify-center flex py-10 md:py-16 lg:mb-20 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl">
        <WorkSectionToptext />
        
        {projects.length > 0 ? (
          <div className="mt-10 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-7 cursor-default">
            {projects.map((project: TProject, index: number) => (
              <WorkSectionProjectCard 
                key={project.id} 
                index={index} 
                project={project} 
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 md:mt-16 lg:mt-20 text-center text-lg md:text-xl">
            No Projects Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Works;