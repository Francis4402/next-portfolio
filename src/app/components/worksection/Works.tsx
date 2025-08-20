
import { getProjects } from "@/app/utls/actions/getData/getProjects";
import WorkSectionProjectCard from "./WorkSectionProjectCard";
import WorkSectionToptext from "./WorkSectionToptext";
import { TProject } from "@/app/types/Types";


const Works = async () => {

  const projects = await getProjects();


  return (
    <div className="justify-center flex mb-20">
      <div className="container">
        <WorkSectionToptext />

        <div className="mt-20 flex flex-wrap gap-7 lg:justify-start justify-center cursor-default">
          {
            projects.length > 0 ? projects.map((project: TProject, index: number) => (
              <WorkSectionProjectCard key={project.id} index={index} project={project} />
            )) : <div className='mt-20 text-center'>No Projects Found</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Works;
