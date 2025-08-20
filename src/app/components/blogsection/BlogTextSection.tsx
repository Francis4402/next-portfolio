"use client"

import { styles } from "@/app/styes/styles";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';



const BlogTextSection = () => {

  useGSAP(() => {
    gsap.fromTo(
        ".blog-text",
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            
        }
    );
}, []);

  return (
    <div>
        <div>
          <h2 className={`${styles.sectionHeadText} blog-text`}>Blogs</h2>
        </div>

        <div className='w-full flex'>
          <p
            className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] blog-text'
          >
            Explore my latest blog posts where I share insights, tutorials, and experiences on various topics.
            Each post reflects my journey and expertise in solving complex problems, working with cutting-edge technologies,
            and delivering impactful solutions.
          </p>
        </div>
    </div>
  )
}

export default BlogTextSection