/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import gsap from "gsap"
import { useEffect } from "react"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../MouseEffect/Framer';
import Image from "next/image";
import { technologies } from "../constants";


const RoundImages = ({tec, index}: any) => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: `.round-image-${index}`,
                start: 'top 80%',
            },
        });

        tl.fromTo(
            `.round-image-${index}`,
            {
                opacity: 0,
                y: 100 ,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: index * 0.1,
            }
        );
    }, [index, tec]);

    return (
        <Magnetic>
            <div className={`bg-[#F0ECE5] p-4 rounded-full round-image-${index}`}>
                <Image src={tec.icon} alt="i" width={50} height={50} />
            </div>
        </Magnetic>
    )
}

const Tech = () => {
  return (
    <div className="justify-center flex my-20">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-10 my-20">
            {
              technologies.map((tec, index) =>
                <RoundImages key={tec.name} index={index} tec={tec} />
              )
            }
          </div>
        </div>
    </div>
  )
}

export default Tech