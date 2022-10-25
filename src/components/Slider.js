import React, { useState, useEffect, useContext } from 'react'
import { BiLeftArrowCircle, BiRightArrowCircle } from 'react-icons/bi'
import { toast } from 'react-toastify'
import songData from '../Data.json'

import playerContext from '../context/PlayerContext'

const trendingSongs = []

songData.forEach(song => {
    if (song.monthlyListener) {
        trendingSongs.push({
            ...song,
            trendingImageLink: `/bee-music/assets/images/${song.name.replace('(','').replace(')','').replace(/\s+/g, '-').toLowerCase()}-trending.jpg`
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

function Slider() {
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

  const [activeSlide, setActiveSlide] = useState(0)
  const [showButton, setShowButton] = useState(false)

  const handlePrevSlide = () => {
    if (activeSlide > 0) {
        setActiveSlide(activeSlide - 1)
    }
    else setActiveSlide(trendingSongs.length - 1)
  }

  const handleNextSlide = () => {
    if (activeSlide < trendingSongs.length - 1) {
        setActiveSlide(activeSlide + 1)
    }
    else setActiveSlide(0)
  }

  useEffect(() => {
    const myTimeout = setTimeout(() => {
        handleNextSlide()
    }, 5000)
    return () => clearTimeout(myTimeout)
  }, [activeSlide])

  return (
    <div 
        className='w-full h-48 mt-3 relative overflow-hidden'
        onMouseOver={() => setShowButton(true)}
        onMouseOut={() => setShowButton(false)}
    >
        <button 
            className={`
                        ${showButton ? '' : 'hidden'} absolute z-20 text-2xl text-neutral-700 py-2 px-3 top-1/2 -translate-y-1/2 -left-3 hover:text-neutral-500`}
            onClick={handlePrevSlide}
        >
            <BiLeftArrowCircle />
        </button>
        <button 
            className={`${showButton ? '' : 'hidden'} absolute z-20 text-2xl text-neutral-700 py-2 px-3 top-1/2 -translate-y-1/2 -right-3 hover:text-neutral-500`}
            onClick={handleNextSlide}
        >
            <BiRightArrowCircle />
        </button>
        <ul>
            {trendingSongs.map((song, index) => (
                <li 
                    key={song.id}
                    className={`
                                w-full h-full rounded-xl bg-cover bg-center absolute inset-0 z-10
                                ${activeSlide === index ? '' : 'hidden'}
                                transition-opacity duration-200 ease-in-out
                            `} 
                    style={{backgroundImage: `linear-gradient(55deg, white 30%, transparent), url("${song.trendingImageLink}")`}}
                >
                    <div className='absolute top-7 left-6'>
                        <div className='mb-4'>
                            <div className='text-xs text-text-color mb-2'>Artist: {song.artist}</div>
                            <div className='text-2xl font-extrabold h-16'>{song.name}</div>
                        </div>
                        <div className='flex items-center'>
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
                                className='rounded-full text-primiry-color bg-white border-2 border-primiry-color text-xs px-5 py-1 mr-2'
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

export default Slider