import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import songData from '../Data.json'
import playerContext from '../context/PlayerContext'
import Album from '../components/Album'

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
    albumImage: `/bee-music/assets/images/${album.replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}.jpg`
  }
})

const albumArray = albums.map(album => songData.filter(song => song.album === album.name))

console.log(process.env.PUBLIC_URL)
export default function Albums() {
  const { setAlbumList } = useContext(playerContext)
  let navigate = useNavigate()
  useEffect(() => {
    setAlbumList(albumArray)
  }, [])
  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
              <ul className='flex flex-wrap p-2 overflow-auto max-h-[524px] scrollbar-hide'>
                {albums.map(album => (
                  <li
                    key={album.id}
                    className='flex flex-col items-center cursor-pointer w-1/3 mb-2'
                    onClick={() => navigate(`/albums/${album.name.replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}`)}
                  >
                    <div className='w-36 h-36 rounded-lg bg-cover' style = {{backgroundImage: `url(${album.albumImage})`}}>
                    </div>
                    <div className='font-semibold text-sm mt-2 text-center'>{album.name}</div>
                  </li>
                ))}
              </ul>
          }
        />
        {
          albums.map(album => (
            <Route key={album.id} path={`/${album.name.replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}`} element={<Album id={album.id} name={album.name} image={album.albumImage} />} />
          ))
        }
      </Routes>
    </div>
  )
}
