/* eslint-disable @next/next/no-img-element */
"use client";


import { FaPlus } from "react-icons/fa";
import { createProjects } from "@/app/utls/actions/create/createProjects";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { projectSchemav, projectsSchema } from "../../Validation/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { Textarea } from "@/components/ui/textarea";


const ProjectModel = () => {

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [open, isOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      title: "",
      description: "",
      links: "",
      tags: "",
      projectImages: ""
    }
  });

  const {formState: {isSubmitting}} = form;


  const onSubmit: SubmitHandler<projectSchemav> = async (data) => {
    try {
      if (imageUrl) {
        data.projectImages = imageUrl;
      }

      const res = await createProjects(data);

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
        <Button><FaPlus />Add Project</Button>
      </DialogTrigger>
      <DialogContent>
            <DialogTitle>
              Add Project
            </DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4 items-center justify-center">
                    {imageUrl ? (
                      <div className="relative w-32 h-32 overflow-hidden border-2 border-primary">
                        <img
                          src={imageUrl}
                          alt="Project preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="relative w-32 h-32 bg-muted flex items-center justify-center">
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
                        button:
                          "ut-ready:bg-primary ut-uploading:cursor-not-allowed bg-primary/90 text-white",
                        allowedContent: "hidden",
                      }}
                    />
                  </div>
                
                <FormField control={form.control} name="title" render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" {...field} value={field.value || ''} placeholder="Enter Project Title" />
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="links" render={({field}) => (
                  <FormItem>
                    <FormLabel>Project Link</FormLabel>
                    <Input type="text" {...field} value={field.value || ''} placeholder="Project Link" />
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="tags" render={({field}) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <Input type="text" {...field} value={field.value || ''} placeholder="Enter Tags" />
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Textarea {...field} value={field.value || ''} placeholder="Enter Project Description" />
                    <FormMessage />
                  </FormItem>
                )} />

                
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
};

export default ProjectModel;
