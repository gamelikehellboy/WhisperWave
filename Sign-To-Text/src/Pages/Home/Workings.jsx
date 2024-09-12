import React from 'react'

function Workings() {
  return (
    <section className='w-full h-full pt-10'>
      <div className='w-full flex flex-col text-white gap-10'>
            <div className='w-full h-full flex flex-row pl-32 gap-40'>
                <h1 className='flex justify-center text-3xl text-white font-bold'>How It Works</h1>
            </div>
            <div className='w-full flex flex-wrap justify-evenly gap-20'>
               <div className='w-80 h-40 bg-gray-600 rounded-lg flex flex-col justify-center items-center font-bold'>
                    <p>Go to the convert tab.</p>
               </div>
               <div className='w-80 h-40 bg-gray-600 rounded-lg flex flex-col justify-center items-center font-bold'>
                    <p>Click the communicate button</p>
               </div>
               <div className='w-80 h-40 bg-gray-600 rounded-lg flex flex-col justify-center items-center font-bold'>
                    <p>Allow camrea access and make signs</p>
                    <p>and watch it get converted to text.</p>
               </div>
            </div>
      </div>
      
    </section>
  )
}

export default Workings
