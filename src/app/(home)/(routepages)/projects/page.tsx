
import type { Metadata } from 'next'
import { getProjects } from "@/app/utls/actions/getData/getProjects";
import { ProjectsClient } from "./ProjectClientProps";

export const metadata: Metadata = {
  title: 'Projects',
  description: 'My Projects'
}

const Projects = async () => {


  const projects = await getProjects();


  return (
    <ProjectsClient initialProjects={projects || []} />
  )
}

export default Projects;