"use client"

import { TProject } from "@/app/types/Types"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from "react-icons/fa";

const ProjectCardhome = ({project}: {project: TProject}) => {
  
  const router = useRouter();

  const handleProjectDetails = () => {
    router.push(`/projects/${project.id}`);
  }

  // Parse tags if they're stored as a string
  const tags = typeof project.tags === 'string' 
    ? project.tags.split(',').map(tag => tag.trim()) 
    : project.tags || [];

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      <div className="overflow-hidden">
        <Image
          width={500}
          height={300}
          src={project.projectImages}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <CardHeader>
        <CardTitle className="text-4xl">{project.title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground truncate text-sm line-clamp-3 mb-4">
          {project.description}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(project.livelink, "_blank")}
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            Live
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(project.githublink, "_blank")}
            className="flex items-center gap-1"
          >
            <FaGithub className="h-3 w-3" />
            Github
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleProjectDetails}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          Details
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProjectCardhome