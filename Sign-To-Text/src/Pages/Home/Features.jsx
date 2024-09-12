import React, { useEffect } from 'react'
import logo from '../../assets/react.svg'
import gsap from 'gsap'
import { FaStopwatch, FaEye} from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
function Features() {
 useEffect(
    () =>{
        gsap.to('#feature-card1',{x:0,duration:1.5,ease:'power2.inOut',delay:3})
        gsap.to('#feature-card2',{x:0,duration:1.5,ease:'power2.inOut',delay:2})
        gsap.to('#feature-card3',{x:0,duration:1.5,ease:'power2.inOut',delay:1})
    },[])
  return (
    <section className='flex w-full h-full pt-7 text-white'>
        <div className='flex flex-row flex-wrap w-full justify-evenly'>
            <div id = 'feature-card1' className='rounded-md shadow-md shadow-black'>
                <div className='flex flex-col items-center mt-10 gap-7'>
                    <div id='realTime'>
                        <FaStopwatch/>
                    </div>
                    <p className='font-bold'>
                        <span className='flex justify-center'>Instantly convert sign language into text and </span>
                        <span className='flex justify-center'>speech in real-time, ensuring seamless </span>
                        <span className='flex justify-center'>communication.</span>
                    </p>
                </div>
            </div>
            <div id = 'feature-card2' className='rounded-md shadow-md shadow-black'>
                <div className='flex flex-col items-center mt-10 gap-7'>
                    <div id='faEye'>
                        <FaEye/>
                    </div>
                    <p className='font-bold'>
                        <span className='flex justify-center'>User Friendly Design</span>
                        <span className='flex justify-center'>Very Simplistic web design to keep you away</span>
                        <span className='flex justify-center'> from complicated communications.</span>
                    </p>
                </div>
            </div>
            <div id = 'feature-card3' className='rounded-md shadow-md shadow-black'>
                <div className='flex flex-col items-center mt-10 gap-7'>
                    <div id='datasetImg'>
                        <FaDatabase/>
                    </div>
                    <p className='font-bold'>
                        <span className='flex justify-center'>Our own Datasets</span>
                        <span className='flex justify-center'>Based on the dataset we train our  </span>
                        <span className='flex justify-center'>model on we can even generate gesture</span>
                        <span className='flex justify-center'>translation in the future.</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features