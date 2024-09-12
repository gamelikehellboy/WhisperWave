import React from 'react'
import logo from '../../assets/logo.png';
function Introduction() {
  return (
    <section className='flex flex-col text-white w-full h-full'>
      <div className='w-full flex flex-row justify-evenly pl-32 gap-40'>
            <img src = {logo} alt='heroImg' className='flex w-80 rounded-full' id='heroImg'/>
            <div className='flex flex-col w-full items-start gap-5 justify-center'>
                <div className='w-full flex justify-start' id='heroHeading'>
                    <h1 className='flex text-4xl font-extrabold' id='heroHeadText'>WhisperWave</h1>
                    
                </div>
                <div className='flex flex-row overflow-hidden items-start' id='heroDesc'>
                    <p className='overflw-hidden flex flex-col'>
                      You Sign we connect.
                      <span>Our website allows you to convert your signs to text and speech </span>
                      <span>which allows you to </span>
                      <span className='text-2xl font-extrabold text-blue-7001' id='expressText'>"EXPRESS CLEARLY"</span>
                    </p>
                </div>
                
                
            </div>
            
      </div>
    </section>
  )
}

export default Introduction;
