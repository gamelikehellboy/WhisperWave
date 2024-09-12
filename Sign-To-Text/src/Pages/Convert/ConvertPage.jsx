import React from 'react'
import Convert from './Convert'
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

function ConvertPage() {
  return (
    <>
      <section className='flex flex-col w-full h-full'>
        <div className='flex flex-row justify-start w-full h-full bg-black items-center gap-80'>
          <div className='flex flex-row text-white pl-8 items-center justify-center gap-2'>
            <FaArrowLeft />
            <NavLink to='/'>Back</NavLink>
          </div>
          <h1 className='flex flex-col text-white font-extrabold justify-center items-center text-2xl pt-10 pb-10'>Convert your signs to text using the Communicate button</h1>
          
        </div>
        <div className='flex flex-col justify-center items-center h-full w-full'>
          <Convert/>
        </div>
        
      </section>
    
    </>
    
  )
}

export default ConvertPage
