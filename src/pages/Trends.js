import React, { useContext } from 'react'
import songData from '../Data.json'
import playerContext from '../context/PlayerContext'
import { toast } from 'react-toastify'

const trendingSongs = []

songData.forEach(song => {
    if (song.monthlyListener) {
        trendingSongs.push({
            ...song,
            trendingImageLink: `/assets/images/${song.name.replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}-trending.jpg`
        })
    }
})

for (let i = 0; i < trendingSongs.length; i++) {
    for (let j = 0; j < trendingSongs.length; j++) {
        if (trendingSongs[i].monthlyListener > trendingSongs[j].monthlyListener) {
            let temp = trendingSongs[i]
            trendingSongs[i] = trendingSongs[j]
            trendingSongs[j] = temp     
        }
    }
}

export default function Trends() {

    const { 
        setOneSongArray, 
        setSongsArray, 
        setCurrentSong, 
        setPlaying, 
        toggleDummy, 
        setReplay,
        songsList,
        oneSongArray,
        musicPlayer,
        favoriteList
    } 
    = useContext(playerContext)
    const notify = (type, title) => {
        if (type === 'warn') {
          return toast.warn(title, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        }
        else if (type === 'success') {
          return toast.success(title, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        }
      }

    return (
        <div>
            <div className='text-2xl font-extrabold mb-2'>Trending</div>
            <ul className='w-full h-[485px] overflow-auto scrollbar-hide'>
                {trendingSongs.map((song) => (
                    <li 
                        key={song.id}
                        className='rounded-xl bg-cover bg-center relative h-40 mt-2'   
                        style={{backgroundImage: `linear-gradient(55deg, white 30%, transparent), url(${song.trendingImageLink})`}}
                    >
                        <div className='absolute top-7 left-6'>
                            <div className='mb-4'>
                                <div className='text-xs text-text-color mb-2'>Artist: {song.artist}</div>
                                <div className='text-2xl font-extrabold h-16'>{song.name}</div>
                            </div>
                            <div className='flex items-center absolute bottom-1 left-0'>
                                <button 
                                    id={song.id}
                                    className='rounded-full bg-primiry-color text-white text-xs px-5 py-1.5 mr-2'
                                    onClick={(e) => {
                                        if (songsList !== oneSongArray && e.currentTarget.id == musicPlayer.current.id) {
                                            setReplay()
                                        }
                                        const dummyArray = [song]
                                        setOneSongArray(dummyArray)
                                        setSongsArray(dummyArray)
                                        setCurrentSong(0)
                                        setPlaying()
                                        toggleDummy()
                                    }}
                                >
                                    PLAY
                                </button>
                                <button 
                                    className='cursor-pointer rounded-full text-primiry-color bg-white border-2 border-primiry-color text-xs px-5 py-1 mr-2'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        const existed = favoriteList.some(item => item.id === song.id)
                                        if (existed) {
                                            notify('warn', 'This song is already in your favorite list')
                                        } 
                                        else {
                                            notify('success', 'This song has been added to your favorite list')
                                            favoriteList.push(song)
                                        }
                                    }}
                                >
                                    FAVORITE
                                </button>
                            </div>
                        </div>
                        <div className='absolute bottom-7 right-6'>
                            <div className='text-xs font-medium text-gray-800 drop-shadow-xl'>Monthly Listeners</div>
                            <div className='text-sm font-bold text-gray-800 text-right drop-shadow-xl'>{song.monthlyListener}</div>
                        </div>
                    </li>
                ))}    
            </ul>        
        </div>
    )
}
