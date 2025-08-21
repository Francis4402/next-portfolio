"use client"

import LottiePi from './LottiePi'
import MessageForm from '../(home)/utils/messageForm'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!contactRef.current) return
    
    gsap.to(contactRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        
      }
    })
  })

  return (
    <div ref={contactRef} className="opacity-0 translate-y-10">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have a question or want to work together? I&apos;d love to hear from you. 
            Send me a message and I&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">
          {/* Lottie Animation */}
          <div className="hidden md:block">
            <LottiePi />
          </div>
          
          {/* Contact Form */}
          <div className="w-full lg:max-w-2xl">
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact