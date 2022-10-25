import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import songData from '../Data.json'
import playerContext from '../context/PlayerContext'
import Artist from '../components/Artist'

let artists = null
songData.forEach(song => {
    if (Array.isArray(artists)) {
      if (!artists.find(item => item === song.artist || song.artist.includes(item))) 
        artists.push(song.artist)
    }
    else artists = [song.artist]
})

artists = artists.map((artist, index) => {
  return {
    id: index,
    name: artist.split(', ')[0],
  }
})


const artistArray = artists.map(artist => songData.filter(song => song.artist.includes(artist.name)))

for(let i = 0; i < artistArray.length; i++) {
  for(let j = 0; j < artistArray.length; j++) {
      if(artistArray[i].length > artistArray[j].length) {
          let temp = artistArray[i]
          artistArray[i] = artistArray[j]
          artistArray[j] = temp      
      }
  }
}

artists = artistArray.map((arr, index) => {
  const artistImage = `/bee-music/assets/images/${arr[0].artist.split(', ')[0].replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}.jpg`
  
  return {
    id: index,
    name: arr[0].artist.split(', ')[0],
    artistImage
  }
})

export default function Artists() {
  const { setArtistList } = useContext(playerContext)
  let navigate = useNavigate()
  useEffect(() => {
    setArtistList(artistArray)
  }, [])

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <ul className='flex flex-wrap p-2 overflow-auto max-h-[524px] scrollbar-hide'>
              {artists.map(artist => (
                <li
                  key={artist.id}
                  className='flex flex-col items-center cursor-pointer w-1/3 mb-2'
                  onClick={() => navigate(`/artists/${artist.name.replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}`)}
                >
                  <div className='w-36 h-36 rounded-lg bg-cover' style = {{backgroundImage: `url(${artist.artistImage})`}}>
                  </div>
                  <div className='font-semibold text-sm mt-2 text-center'>{artist.name}</div>
                </li>
              ))}
            </ul>
          }
        />
        {
          artists.map(artist => (
            <Route key={artist.id} path={`/${artist.name.replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}`} element={<Artist id={artist.id} name={artist.name} image={artist.artistImage} />} />
          ))
        }
      </Routes>
    </div>
  )
}
