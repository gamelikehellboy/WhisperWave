import React from 'react';
import NewNavbar from '../../Components/Navbar/NewNavbar';
import Features from './Features';
import Introduction from './Introduction';
import Workings from './Workings';
function NewHome() {
  return (
    <>
    <section className='flex flex-col bg-black gap-10'>
        <NewNavbar/>
        <Introduction/>
        <Features/>
        
    </section>
    <section className='flex flex-col'>
        <Workings/>
    </section>
    </>
  )
}

export default NewHome
