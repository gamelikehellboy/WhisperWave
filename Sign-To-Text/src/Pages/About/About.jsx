import React from 'react'

function About() {
  return (
    <>
      <section className='w-full h-96 border-2 border-solid border-black bg-black'>
          <div className='flex flex-col items-center text-white gap-14'>
            <h1 className='text-3xl font-extrabold'>About</h1>
            <p className='font-bold'>Sign2Speech is a revolutionary service that converts real-time sign language from your camera and converts it to text for easier understanding.</p>
          </div>    
      </section>
    </>
  )
}

export default About