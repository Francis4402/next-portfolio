
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaArrowLeft, FaHome } from 'react-icons/fa'


export default function NotFound() {

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <div className={'max-w-md w-full text-center transition-all duration-700 opacity-100 translate-y-0'}>
        
        {/* Animated Floating Graphic */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold dark:text-gray-100 text-gray-800 opacity-10 animate-pulse">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <svg 
                className="w-16 h-16 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content with staggered animation */}
        <div className='transition-all duration-700 delay-300 opacity-100 translate-y-0'>
          <h1 className="text-4xl font-bold dark:text-gray-200 text-gray-800 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
            Oops! The page you&apos;re looking for seems to have wandered off.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Don&apos;t worry, even the best explorers get lost sometimes.
          </p>
        </div>

        {/* Buttons with hover effects */}
        <div className={'flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 opacity-100 translate-y-0'}>
          <Button variant={"default"} size={"lg"}>
            <Link href="/" className='flex items-center gap-2'>
              <FaHome />
              Return Home
            </Link>
          </Button>
          
          <Button variant={"outline"} size={"lg"}>
            <Link href={"/"} className='flex items-center gap-2'>
              <FaArrowLeft />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}