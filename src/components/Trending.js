import React from 'react'
import { Link } from 'react-router-dom'
import { FcPositiveDynamic } from 'react-icons/fc'
import { MdNavigateNext } from 'react-icons/md'

import Slider from './Slider'

function Trending() {
  return (
    <div className='mb-3'>
        <div className='flex items-center'>
            <div className='text-text-color text-xs mr-1'>What's hot</div>
            <FcPositiveDynamic className='text-sm'/>
        </div>
        <div className='flex items-baseline justify-between'>
            <div className='text-2xl font-extrabold'>Trending</div>
            <Link to='/trends' className='flex items-center'>
               <div className='text-text-color text-xs pb-0.5'>More</div> 
                <MdNavigateNext className='text-text-color text-xl'/>
            </Link>
        </div>
        <Slider />
    </div>
  )
}

export default Trending