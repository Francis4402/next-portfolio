import { getProject } from '@/app/utls/actions/getData/getProjects';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  const projectData = project.data[0];

  return {
    title: projectData.title,
    description: projectData.description,
  }
}

const ProjectDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const project = await getProject(id);
  const projectData = project.data[0];

  const tags = typeof projectData.tags === 'string' 
    ? projectData.tags.split(',').map((tag: string) => tag.trim()) 
    : projectData.tags || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/bgimages.jpg')] bg-cover bg-center"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <Button asChild variant="ghost" className="mb-6 -ml-3">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          
          <div className="w-full text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {projectData?.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent>
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={projectData.projectImages || ""}
                    alt={projectData.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{projectData?.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {projectData?.description}
                    </p>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                  <p className="text-muted-foreground mb-6">
                    {projectData?.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Timeline</span>
                      <span className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        Jan 2023 - Mar 2023
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <span>
                        {projectData.category === "web" && "Web Application"} 
                        {projectData.category === "mobile" && "Mobile Application"} 
                        {projectData.category === "design" && "Design"} 
                        {projectData.category === "fullstack" && "Full Stack"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Project Links</h3>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href={projectData.livelink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={projectData.githublink} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="mr-2 h-4 w-4" />
                      View Code
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm text-muted-foreground">Client</dt>
                    <dd>Acme Corporation</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Status</dt>
                    <dd>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Role</dt>
                    <dd>Full Stack Developer</dd>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails;