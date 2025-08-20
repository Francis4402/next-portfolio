
"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Tilt from 'react-parallax-tilt';
import gsap from "gsap";
import { TBlog } from "@/app/types/Types";
import { useGSAP } from "@gsap/react";


const BlogCardSection = ({blog, index}: {blog: TBlog, index: number}) => {

    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const router = useRouter();

    const handleblogDetials = () => {
        router.push(`/blog/${blog.id}`);
    }

    useGSAP(() => {
      cardsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
              },
            }
          );
        }
      });
    }, []);

  return (
    <div ref={el => {cardsRef.current[index] = el}}>
      <Tilt className='bg-tertiary p-5 shadow-lg shadow-blue-950 rounded-2xl sm:w-[360px] w-full'>

        <div className='relative w-full h-[230px] cursor-pointer' onClick={handleblogDetials}>
          <Image
            width={500}
            height={500}
            src={blog.blogImages}
            alt='i'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div className='black-gradient w-10 h-10 rounded-full flex justify-center items-center'>
              <Image
                width={40}
                height={40}
                src={'/icons/web.png'}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{blog.title}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{blog.description}</p>
        </div>

        
      </Tilt>
    </div>
  )
}

export default BlogCardSection