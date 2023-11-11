import React from 'react'
import {BiUserCircle} from 'react-icons/bi'
import {IoIosNotificationsOutline} from 'react-icons/io'

export default function Navbar() {
  const isAuth = false;
  return (
    <div className=" px-4 flex items-center mb-6 border-b-2 pb-2 ">
      <div className='flex'>
        <h4 className='text-2xl mr-3'>Interview for MERN</h4>
        <h2 className='mt-1 font-bold'>|</h2>
        <p className='ms-2 text-lg'>Interviewer Name</p>
      </div>
        <IoIosNotificationsOutline className='ms-auto text-3xl mr-3'/>
{      <span className=' flex border border-solid border-customColor px-3 py-1 rounded-3xl mt-1 '>
        <p className='text-2xl mx-3'>Ankit</p>
          <BiUserCircle className=' text-4xl'/>
      </span>}
   
    </div>
  )
}
