"use client"

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Framer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    
  }, { scope: containerRef })

  const handleMouse = (e: React.MouseEvent) => {
    if (!containerRef.current || !boxRef.current) return

    const { clientX, clientY } = e
    const { height, width, left, top } = containerRef.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)

    gsap.to(boxRef.current, {
      x: middleX,
      y: middleY,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
      overwrite: true
    })
  }

  const reset = () => {
    if (!boxRef.current) return
    
    gsap.to(boxRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <div ref={boxRef} className="relative">
        {children}
      </div>
    </div>
  )
}