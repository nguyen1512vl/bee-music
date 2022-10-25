import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import songData from '../Data.json'
import playerContext from '../context/PlayerContext'

let albums = null
songData.forEach(song => {
  if (song.album) {
    if (Array.isArray(albums)) {
      if (!albums.find(item => item === song.album)) 
        albums.push(song.album)
    }
    else albums = [song.album]
  }
})

albums = albums.map((album, index) => {
  return {
    id: index,
    name: album,
    albumImage: `/assets/images/${album.replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}.jpg`
  }
})

const albumArray = albums.map(album => songData.filter(song => song.album === album.name))

const susggestAlbum = [albums[2]]

function SuggestAlbum() {
    const { setAlbumList } = useContext(playerContext)
    useEffect(() => {
      setAlbumList(albumArray)
    }, [])

    return (
        <div className='w-56 h-56 mt-8 mx-auto'>
            {susggestAlbum.map(album => (
              <Link
                to='/albums/top-songs-of-tobu'
                key={album.id}
                className='flex flex-col items-center cursor-pointer p-3 bg-white rounded-2xl'
              >
                <img className='rounded-xl' src={album.albumImage} />
                <div className='font-semibold text-sm mt-2 text-center'>{album.name}</div>
              </Link>
            ))}
        </div>
    )
}

export default SuggestAlbum