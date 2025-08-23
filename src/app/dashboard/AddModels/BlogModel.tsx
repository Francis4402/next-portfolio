/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchemaV, blogsSchema } from "@/app/Validation/Validations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
        <Button><FaPlus className="mr-2" />Add Blog</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Add Blog Post</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto px-6 pb-6 flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 items-center justify-center p-4 bg-muted/30 rounded-lg">
                {imageUrl ? (
                  <div className="relative w-40 h-40 overflow-hidden border-2 border-primary rounded-md">
                    <img
                      src={imageUrl}
                      alt="Blog preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="relative w-40 h-40 bg-muted flex items-center justify-center rounded-md border">
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
              
              <FormField 
                control={form.control} 
                name="title" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        {...field} 
                        value={field.value || ''} 
                        placeholder="Enter Blog Title" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />

              <FormField 
                control={form.control} 
                name="description" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        value={field.value || ''} 
                        placeholder="Write your blog content here..." 
                        className="min-h-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />

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
                  {isSubmitting ? "Publishing..." : "Publish Blog"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModel;
