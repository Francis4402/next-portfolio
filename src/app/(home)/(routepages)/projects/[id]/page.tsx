

import { getProject } from '@/app/utls/actions/getData/getProjects';
import Image from 'next/image';

export async function generateMetadata({ params } : { params: Promise<{id: string}>}) {

    const {id} = await params;
    

    const project = await getProject(id);


    const projectData = project.data[0];

    return {
      title: projectData.title,
      description: projectData.description,
    }
}

const ProjectDetails = async ({params}: {params: Promise<{id: string}>}) => {

    const {id} = await params;

  const project = await getProject(id);


  const projectData = project.data[0];

  return (
    <div>

        <div className="lg:h-[400px] md:h-[300px] h-[200px] w-full bg-[url('/bgimages.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="text-white lg:h-[400px] md:h-[300px] h-[200px] bg-black/40 flex flex-col gap-5 justify-center items-center">
                <h1 className="md:text-4xl text-2xl font-serif">Project Details</h1>
            </div>
        </div>


        <div className="container mx-auto justify-center items-center md:px-0 px-5 my-28">
            <div className="flex lg:flex-row flex-col gap-20 items-center">

                <Image
                    src={projectData.projectImages}
                    alt="Book Cover"
                    width={500}
                    height={500}
                />


                <div className="flex flex-col gap-5 w-full">
                    <h1 className="text-4xl font-serif">{projectData?.title}</h1>
                    <p className="text-lg">Price: {projectData?.description} tk</p>
                    <p className="text-gray-500">Tags: {projectData?.tags}</p>
                                        
                </div>
            </div> 

        </div>
    </div>
  )
}

export default ProjectDetails