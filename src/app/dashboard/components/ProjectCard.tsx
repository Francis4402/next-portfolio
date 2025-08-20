"use client"

import { TProject } from "@/app/types/Types"
import deleteProject from "@/app/utls/actions/delete/deleteProjects";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


const ProjectCard = ({project}: {project: TProject}) => {
  

  const {formState: {isSubmitting}} = useForm();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await deleteProject(project.id!);

      if (res?.success) {
        toast.success("Project Deleted Successfully");
        router.push("/dashboard/projects");
      } else {
        toast.error(res?.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateId = () => {
    router.push(`/dashboard/project-updates/${project.id}`);
  }

  const handleProjectDetials = () => {
    router.push(`/projects/${project.id}`);
  }
  

  return (
    <div className="bg-gray-900 shadow-md rounded-2xl overflow-hidden transition-all hover:shadow-lg flex flex-col">
      <div className="relative w-full aspect-[16/9] cursor-pointer" onClick={handleProjectDetials}>
        <Image
          width={500}
          height={300}
          src={project.projectImages}
          alt="Project Cover"
          className="w-full h-52 object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-200">{project.title}</h3>
          <Button
            onClick={() => window.open(project.links, "_blank")}
            variant={"outline"} size={"sm"}
          >
            Link
          </Button>
        </div>
        <p className="mt-2 text-gray-300 text-sm">{project.description}</p>
        <p className="mt-2 text-gray-400 text-sm text-end">{project.tags}</p>

        {/* Keep buttons at the bottom */}
        <div className="flex justify-between items-center mt-auto pt-4">
          <button
            onClick={handleUpdateId}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update
          </button>

            <Dialog>
              <DialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Delete Post</DialogTitle>
                      <DialogDescription>
                          Are you sure you want to delete this post?
                      </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                      <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button 
                          variant="destructive" 
                          onClick={handleDelete}
                          disabled={isSubmitting}
                      >
                          {isSubmitting ? "Deleting..." : "Delete"}
                      </Button>
                  </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard