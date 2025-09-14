import { getProjects } from "@/app/utls/actions/getData/getProjects";
import WorkSectionProjectCard from "./WorkSectionProjectCard";
import WorkSectionToptext from "./WorkSectionToptext";
import { TProject } from "@/app/types/Types";

const Works = async () => {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 md:px-6"> 
      <div className="flex justify-center items-center text-center">
        <WorkSectionToptext />
      </div>
    
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-8 md:mt-10 justify-items-center">
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
  );
};

export default Works;