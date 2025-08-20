"use client"

import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styes/styles";
import Image from "next/image";
import Tilt from 'react-parallax-tilt';
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: "/icons/web.png",
    title: "Full Stack Web Development",
  },
  {
    icon: "/icons/creator.png",
    title: "UI/UX Design",
  },
  {
    icon: "/icons/mobile.png",
    title: "SEO Optimization",
  },
  {
    icon: "/icons/backend.png",
    title: "Project Management",
  }
];

const About = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      ".texts",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".texts",
          start: "top 80%",
        },
      }
    );

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
    <div className="md:mt-96 mt-32">
      <div className="texts">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </div>

      <p className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] texts'>
        I&#39;m a skilled Full Stack Web Developer and expertise in frameworks like Laravel, MySql, React, Node.js, Express, Next.js and MongoDB. I&#39;m a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let&#39;s work together to bring your ideas to life!
      </p>

      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {cards.map((card, index) => (
          <Tilt key={index}>
            <div ref={el => { cardsRef.current[index] = el; }} className='w-[250px] sm:w-[280px] md:w-[300px] lg:w-[350px] max-w-[350px]'>
                <div className={`w-full bg-gradient-to-r from-emerald-400 to-cyan-400 p-[1px] rounded-[20px] shadow-card`}>
                <div className='bg-gray-900 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
                    <Image src={card.icon} alt="i" width={50} height={50} />
                    <h3 className='text-white text-[20px] font-bold text-center cursor-default'>{card.title}</h3>
                </div>
                </div>
            </div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default About;
