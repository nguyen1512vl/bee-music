import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Songlist from '../components/SongList.js'

export default function Playlists() {

  let navigate = useNavigate()

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <div className='flex flex-wrap p-2'>
              <div 
                className='flex flex-col justify-between items-center mr-5 cursor-pointer'
                onClick={() => navigate(`/playlists/my-playlist`)}
              >
                <div className='w-36 h-36 rounded-lg bg-cover' style = {{backgroundImage: `url(/bee-music/assets/images/my-playlist.png)`}}>
                </div>
                <div className='font-semibold text-sm mt-2'>My Playlist</div>
              </div>
              <div className='flex flex-col justify-center items-center cursor-pointer'>
                <div className='w-36 h-36 rounded-lg bg-cover' style = {{backgroundImage: `url(/bee-music/assets/images/new-playlist.jpg)`}}>
                </div>
                <div className='font-semibold text-sm mt-2'>New Playlist</div>
              </div>
            </div>
          }
        />
        <Route path='/my-playlist' element={<Songlist title='My Playlist' type='playlist' />} />
      </Routes>
    </div>
  )
}
