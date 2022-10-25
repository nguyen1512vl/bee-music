import React from 'react'
import { Link } from 'react-router-dom'
import { MdHomeFilled } from 'react-icons/md'
import { CgBee } from 'react-icons/cg'
import { FiTrendingUp } from 'react-icons/fi'
import { RiFolderMusicLine } from 'react-icons/ri'
import { BsGrid } from 'react-icons/bs'
import { IoCalendarOutline } from 'react-icons/io5'
import { HiOutlineTicket } from 'react-icons/hi'
import { TbHeartPlus } from 'react-icons/tb'
import { IoIosPeople } from 'react-icons/io'
import { FaRegStar } from 'react-icons/fa'
import { GrNext } from 'react-icons/gr'

import CustomLink from './CustomLink'

const mainItems = [
  {
    id: 1,
    icon: MdHomeFilled,
    name: 'Home',
    link: '/'
  },
  {
    id: 2,
    icon: FiTrendingUp,
    name: 'Trends',
    link: '/trends'
  },
  {
    id: 3,
    icon: RiFolderMusicLine,
    name: 'Playlists',
    link: '/playlists'
  }
]

const discoverItems = [
  {
    id: 4,
    icon: BsGrid,
    name: 'New and Notable',
    link: '/new-and-notable'
  },
  {
    id: 5,
    icon: IoCalendarOutline,
    name: 'Release Calendar',
    link: '/release-calendar'
  },
  {
    id: 6,
    icon: HiOutlineTicket,
    name: 'Event',
    link: '/event'
  }
]

const yourCollectionItems = [
  {
    id: 7,
    icon: TbHeartPlus,
    name: 'Favorite Songs',
    link: '/favorite-songs'
  },
  {
    id: 8,
    icon: IoIosPeople,
    name: 'Artists',
    link: '/artists'
  },
  {
    id: 9,
    icon: FaRegStar,
    name: 'Albums',
    link: '/albums'
  }
]

const user = {
  avatar: '/assets/images/img1.jpg',
  name: 'Nguyen Nguyen'
}

const Navbar = () => {
  return (
    <div className='bg-white col-span-1 flex flex-col'>
      <div className='border-b-2 pb-5 pt-20'>
        <div className='ml-7 mr-5 mb-8'>
          <Link to='/' className='flex items-center mb-8'>
            <CgBee className='text-xl mr-2 text-yellow-400' />
            <span className='text-lg text-yellow-400 font-bold'>Bee</span>
            <span className='text-lg font-bold'>Music</span>
          </Link>
          <ul className='my-3'>
              {mainItems.map(item => {
                const Icon = item.icon
                return (
                  <CustomLink 
                    key={item.id} 
                    to={item.link} 
                    className=
                      'p-3 flex justify-left items-center rounded-lg'
                  >
                    <Icon className='text-lg mr-2' />
                    <div className='text-xs font-bold'>{item.name}</div>
                  </CustomLink>
                )})}
          </ul>
          <div className='-mb-2.5 px-3 text-subtext-color text-xs font-medium'>
            Discover
          </div>
          <ul className='my-3'>
              {discoverItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <CustomLink 
                    key={item.id} 
                    to={item.link} 
                    className=
                      'p-3 flex justify-left items-center rounded-lg'
                  >
                    <Icon className='text-lg mr-2' />
                    <div className='text-xs font-bold'>{item.name}</div>
                  </CustomLink>
                )})}
          </ul>
          <div className='-mb-2.5 px-3 text-subtext-color text-xs font-medium'>
            Your Collection
          </div>
          <ul className='my-3'>
              {yourCollectionItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <CustomLink 
                    key={item.id} 
                    to={item.link} 
                    className=
                      'p-3 flex justify-left items-center rounded-lg'
                  >
                    <Icon className='text-lg mr-2' />
                    <div className='text-xs font-bold'>{item.name}</div>
                  </CustomLink>
                )})}
          </ul>
        </div>
      </div>
        <div className='grow flex justify-between items-center'>
          <div className='flex items-center px-3'>
            <div className='w-8 h-8 rounded-full bg-cover ml-7 mr-2' style = {{backgroundImage: `url(${user.avatar})`}}>
            </div>
            <div className='text-xs font-semibold text-primiry-color'>{user.name}
            </div>
          </div>
          <GrNext className='text-xs mr-5'/>
        </div>
    </div>
  )
}

export default Navbar
