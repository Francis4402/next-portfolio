/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchemaV, blogsSchema } from "@/app/Validation/Validations";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBlogs } from "@/app/utls/actions/create/createBlogs";

const BlogModel = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [open, isOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(blogsSchema),
    defaultValues: {
      title: "",
      description: "",
      blogImages: ""
    }
  });

  const {formState: {isSubmitting}} = form;


  const onSubmit: SubmitHandler<blogSchemaV> = async (data) => {
    try {
      if (imageUrl) {
        data.blogImages = imageUrl;
      }
      const res = await createBlogs(data);
      if (res) {
        toast.success("Blog created successfully");
        form.reset();
        setImageUrl(null);
        isOpen(false);
      } else {
        toast.error("Failed to create blog");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger asChild>
        <Button><FaPlus />Add Blogs</Button>
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
                          alt="Blog preview"
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

export default BlogModel;
