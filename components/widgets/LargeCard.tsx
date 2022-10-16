import React from 'react'
import Image from "next/image"

type Props = {}

function LargeCard({img, title, description, buttonText}: Props) {
  return (
    <section className='relative py-16 cursor-pointer'>
       <div className='relative h-96 min-w-[300px]'>
        <Image 
        src={img} 
        layout='fill' 
        objectFit='cover'
        className='rounded-2xl'
        />
       </div>

       <div>
        <h3>{title}</h3>
        <p>{description}</p>

        <button>{buttonText}</button>
       </div>
    </section>
    
  )
}

export default LargeCard