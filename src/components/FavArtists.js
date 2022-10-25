import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import songData from '../Data.json'
import playerContext from '../context/PlayerContext'
import { BsThreeDots } from 'react-icons/bs'

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
  const artistImage = `/assets/images/${arr[0].artist.split(', ')[0].replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}.jpg`
  
  return {
    id: index,
    name: arr[0].artist.split(', ')[0],
    artistImage
  }
})

let favArtists = []
for (let i = 0; i < 3; i++) {
    favArtists[i] = artists[i]
}

function FavArtists() {
    const { setArtistList } = useContext(playerContext)
    let navigate = useNavigate()
    useEffect(() => {
        setArtistList(artistArray)
      }, [])

    return (
        <div>
            <div className='text-lg font-extrabold mt-2 mb-2'>Fav Artists</div>
            <ul className='flex flex-col'>
                {favArtists.map((artist, index) => (
                    <li
                        key={artist.id}
                        className='flex items-center cursor-pointer rounded-lg py-2 px-1.5 mr-2 hover:bg-slate-200'
                        onClick={() => navigate(`artists/${artist.name.replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}`)}
                    >
                        <div className='w-10 h-10 rounded-full bg-cover mr-3' style = {{backgroundImage: `url(${artist.artistImage})`}}>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <div className='font-semibold text-sm'>{artist.name}</div>
                            <div className='text-subtext-color text-xs font-medium'>{`${artistArray[index].length} songs in library`}</div>
                        </div>
                        <div className='p-2 text-sm hover:bg-slate-400 rounded-md'>
                            <BsThreeDots />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FavArtists