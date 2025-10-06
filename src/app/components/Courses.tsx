import React from 'react'
import { styles } from '../styes/styles'
import Image from 'next/image'

const Courses = () => {
  return (
    <div className='mt-36'>
        <p className={`${styles.sectionSubText} text-center experience-text`} >
            Courses Achievements
        </p>
        <h2 className={`${styles.sectionHeadText} text-center experience-text`}>
            Courses
        </h2>

        <div className='grid grid-cols-2 gap-5 mt-10'>
            <Image src={"/cirtificates/ostadcirtificate.png"} alt='i' width={1024} height={1024} />
            <Image src={"/cirtificates/programmingherocirtificate.png"} alt='i' width={1024} height={1024} />
        </div>
    </div>
  )
}

export default Courses