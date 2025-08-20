

import { getBlog } from '@/app/utls/actions/getData/getBlogs';
import Image from 'next/image';


export async function generateMetadata({ params } : { params: Promise<{id: string}>}) {

    const {id} = await params;
    
    const blog = await getBlog(id);

    const blogData = blog.data[0];

    return {
      title: blogData.title,
      description: blogData.description,
    }
}

const BlogDetails = async ({params} : {params: Promise<{id: string}>})=> {

  const {id} = await params;
    

  const blog = await getBlog(id);


  const blogData = blog.data[0];

  return (
    <div>

        <div className="lg:h-[400px] md:h-[300px] h-[200px] w-full bg-[url('/bgimages.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="text-white lg:h-[400px] md:h-[300px] h-[200px] bg-black/40 flex flex-col gap-5 justify-center items-center">
                <h1 className="md:text-4xl text-2xl font-serif">Blogs Details</h1>
            </div>
        </div>


        <div className="container mx-auto justify-center items-center md:px-0 px-5 my-28">
            <div className="flex lg:flex-row flex-col gap-20 items-center">

                <Image
                    src={blogData.blogImages}
                    alt="Book Cover"
                    width={500}
                    height={500}
                />


                <div className="flex flex-col gap-5 w-full">
                    <h1 className="text-4xl font-serif">{blogData?.title}</h1>
                    <p className="text-lg">description: {blogData?.description}</p>                                        
                </div>
            </div> 

        </div>
    </div>
  )
}

export default BlogDetails