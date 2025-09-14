import { getProjects } from "@/app/utls/actions/getData/getProjects";
import WorkSectionProjectCard from "./WorkSectionProjectCard";
import WorkSectionToptext from "./WorkSectionToptext";
import { TProject } from "@/app/types/Types";

const Works = async () => {
  const projects = await getProjects();

  return (
      <div className="container mx-auto md:px-0 px-5"> 
          <div className="flex justify-center items-center text-center">
          <WorkSectionToptext />
          </div>
        
          {projects.length > 0 ? (
            <div className=" grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-10 items-center justify-center">
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