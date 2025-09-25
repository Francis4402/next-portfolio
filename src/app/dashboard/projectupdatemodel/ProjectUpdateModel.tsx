/* eslint-disable @next/next/no-img-element */
"use client";


import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { projectSchemav, projectsSchema } from "../../Validation/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TProject } from "@/app/types/Types";
import updateProjects from "@/app/utls/actions/update/updateProjects";


const ProjectUpdateModel = ({project}: {project: TProject}) => {

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [open, isOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      category: project.category,
      livelink: project.livelink,
      githublink: project.githublink,
      tags: project.tags,
      projectImages: project.projectImages
    }
  });

  const {formState: {isSubmitting}} = form;


  const onSubmit: SubmitHandler<projectSchemav> = async (data) => {
    try {
      if (imageUrl) {
        data.projectImages = imageUrl;
      }

      const res = await updateProjects({
        id: project.id,
        ...data,
      });


      if (res) {
        toast.success("Project created successfully");
        form.reset();
        setImageUrl(null);
        isOpen(false);
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={isOpen}>
    <DialogTrigger asChild>
      <Button variant={"secondary"}>Update</Button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
      <DialogHeader className="px-6 pt-6 pb-4 border-b">
        <DialogTitle className="text-xl font-semibold">Update Project</DialogTitle>
      </DialogHeader>
      
      <div className="overflow-y-auto px-6 pb-6 flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 items-center justify-center p-4 bg-muted/30 rounded-lg">
              {imageUrl ? (
                <div className="relative w-32 h-32 overflow-hidden border-2 border-primary rounded-md">
                  <img
                    src={imageUrl}
                    alt="Project preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="relative w-32 h-32 bg-muted flex items-center justify-center rounded-md border">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}

              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    setImageUrl(res[0].url);
                    toast.success("Image uploaded");
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  button: "ut-ready:bg-blue-500 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md",
                }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ''} placeholder="Enter Project Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="fullstack">Full Stack</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="tags" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ''} placeholder="React, Next.js, Tailwind" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="livelink" render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Link</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ''} placeholder="https://example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="githublink" render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Link</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ''} placeholder="https://github.com/username/repo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      value={field.value || ''} 
                      placeholder="Enter Project Description" 
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => isOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "updating..." : "Update Project"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  </Dialog>
  );
};

export default ProjectUpdateModel;
