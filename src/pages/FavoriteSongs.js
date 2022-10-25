import React from 'react'
import Songlist from '../components/SongList.js'

export default function FavoriteSongs() {

  return (
    <div>
      <Songlist title='Favorite Songs' type='favorite' />        
    </div>
  )
}
