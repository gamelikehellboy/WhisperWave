import React from 'react'
import logo from '../../assets/logo.png'
import nameImg from '../../assets/logoName.png'
import { NavLink } from 'react-router-dom'

function NewNavbar() {
  return (
    <header className='w-full border-b-gray-900 border-b-solid border-b-2 items-center' id='navbar'>
        <div className='w-full flex flex-row justify-center gap-10 items-center text-white pt-7 pb-7'>
            <NavLink to='/'>
                <button className='flex hover:text-gray-700'>
                    Home
                </button>
            </NavLink>
            
            <NavLink to='/convert'>
                <button className='flex hover:text-gray-700'>
                    Convert
                </button>
            </NavLink>
        </div>
    </header>
  )
}

export default NewNavbar