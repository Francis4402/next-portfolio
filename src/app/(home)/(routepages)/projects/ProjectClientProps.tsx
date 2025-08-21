'use client';

import { TProject } from "@/app/types/Types";

import ProjectCardhome from "../PojectRouteCards/ProjectCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";



export const ProjectsClient = ({ initialProjects }: { initialProjects: TProject[] }) => {
  const [projects,] = useState<TProject[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');

  
  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) return projects;
    
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  // Filter projects by category and search term
  const getFilteredProjectsByCategory = (category: string) => {
    const categoryFiltered = category === 'all' 
      ? filteredProjects 
      : filteredProjects.filter(p => p.category === category);
    
    return categoryFiltered;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const renderProjectGrid = (categoryProjects: TProject[], category: string) => {
    if (categoryProjects.length > 0) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProjects.map((project: TProject) => (
            <ProjectCardhome key={project.id} project={project} />
          ))}
        </div>
      );
    }

    // Show different messages based on whether we're searching or not
    const noResultsMessage = searchTerm.trim() 
      ? `No ${category === 'all' ? '' : category + ' '}projects found matching "${searchTerm}"`
      : `No ${category === 'all' ? '' : category + ' '}projects to display`;

    return (
      <Card className="p-12 text-center">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <div className="text-2xl font-semibold text-muted-foreground">
            {noResultsMessage}
          </div>
          <p className="text-muted-foreground max-w-md">
            {searchTerm.trim() 
              ? "Try adjusting your search terms or browse all projects."
              : "Check back later to see my latest work and projects."
            }
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/bgimages.jpg')] bg-cover bg-center"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0))"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">My Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A collection of my work and creative endeavors
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header with stats and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Project Portfolio</h2>
            <p className="text-muted-foreground mt-2">
              Total Projects: <span className="font-semibold text-primary">{projects?.length}</span>
              {searchTerm && (
                <span className="ml-2">
                  | Found: <span className="font-semibold text-primary">{filteredProjects.length}</span>
                </span>
              )}
            </p>
          </div>
          
            <div className="w-full md:w-auto">
                <div className="relative w-full md:w-[300px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                        placeholder="Search projects by title..."
                        className="pl-10 w-full"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
        </div>

        {/* Projects Grid */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {renderProjectGrid(getFilteredProjectsByCategory('all'), 'all')}
          </TabsContent>
          
          <TabsContent value="web" className="mt-0">
            {renderProjectGrid(getFilteredProjectsByCategory('web'), 'web')}
          </TabsContent>

          <TabsContent value="mobile" className="mt-0">
            {renderProjectGrid(getFilteredProjectsByCategory('mobile'), 'mobile')}
          </TabsContent>

          <TabsContent value="design" className="mt-0">
            {renderProjectGrid(getFilteredProjectsByCategory('design'), 'design')}
          </TabsContent>

          <TabsContent value="fullstack" className="mt-0">
            {renderProjectGrid(getFilteredProjectsByCategory('fullstack'), 'fullstack')}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};