import React, { useContext } from 'react'
import { useState } from 'react'
import { BsFillSkipBackwardFill, BsFillSkipForwardFill} from 'react-icons/bs'
import { FaPlay, FaPause } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { RiExternalLinkLine } from 'react-icons/ri'

import playerContext from '../context/PlayerContext'

function PopupWindow() {
  const [openOverlay, setOpenOverlay] = useState(false)

  const { 
          currentSong, 
          songsList, 
          playing, 
          setPlaying, 
          toggleDummy, 
          nextSong, 
          prevSong, 
          popup, 
          togglePopup 
        } 
        = useContext(playerContext)
  return (
    <div className='absolute bottom-10 right-48 z-50'>
        <div 
          className={`w-64 h-64 bg-cover rounded-lg relative overflow-hidden ${popup ? 'block' : 'hidden'}`} 
          style={{backgroundImage: `url(${songsList[currentSong].imageLink})`}}
          onMouseOver={() => setOpenOverlay(true)}
          onMouseOut={() => setOpenOverlay(false)}
        >
          <div className={`absolute top-0 left-0 right-0 bottom-0 bg-overlay-color ${openOverlay ? 'block' : 'hidden'}`}>
            <button 
              className='p-2 text-white absolute top-1 right-1 text-lg rounded-full hover:bg-overlay-hover-color'
              onClick={() => togglePopup()}
            >
              <IoClose />
            </button>
            <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white py-1 px-2 rounded-full text-xs bg-overlay-black-color'>
                  Back to tab
                  <RiExternalLinkLine className='ml-2 text-sm'/>
            </button>
            <div className='flex items-center justify-center absolute bottom-1 w-full text-2xl'>
              <button 
                className='p-2 box-content text-white mr-3 rounded-full hover:bg-overlay-hover-color'
                onClick={() => {
                  prevSong()
                  setPlaying()
                  toggleDummy()
                }}
              >
                  <BsFillSkipBackwardFill />
              </button>
              <button
                  className='p-3 box-content w-9 h-9 rounded-full flex items-center text-white justify-center hover:bg-overlay-hover-color'
                  onClick={() => {
                    toggleDummy()
                  }}
              >
                  {playing ?  <FaPause /> : <FaPlay />}
              </button> 
              <button 
                className='p-2 box-content text-white ml-3 rounded-full hover:bg-overlay-hover-color'
                onClick={() => {
                  nextSong()
                  setPlaying()
                  toggleDummy()
                }}
              >
                  <BsFillSkipForwardFill />
              </button>
          </div>
          </div>
        </div>
    </div>
  )
}

export default PopupWindow