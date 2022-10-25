import React from 'react'
import { useState, useRef, useContext } from 'react'
import { TbHeartPlus } from 'react-icons/tb'
import { RiFolderMusicLine } from 'react-icons/ri'
import { CgMiniPlayer } from 'react-icons/cg'
import { MdOutlineRepeatOne, MdOutlineRepeat } from 'react-icons/md'
import { BsFillSkipBackwardFill, BsFillSkipForwardFill} from 'react-icons/bs'
import { FaPlay, FaPause } from 'react-icons/fa'
import { BsShuffle } from 'react-icons/bs'
import { RiVolumeDownLine, RiVolumeUpLine, RiVolumeMuteLine } from 'react-icons/ri'
import { toast } from 'react-toastify'

import PopupWindow from './PopupWindow.js'
import styles from '../styles/MusicPlayer.module.css'
import PlayerContext from '../context/PlayerContext.js'
import useDidMountEffect from '../hooks/useDidMountEffect.js'

let isSkipping = false

function MusicPlayer() {
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(1)

    const rangeSliderMusic = useRef()
    const rangeSliderVolume = useRef()

    const { 
            musicPlayer,
            currentSong, 
            songsList, 
            playing, 
            togglePlaying, 
            setPlaying,
            dummy,
            toggleDummy,
            nextSong,
            prevSong ,
            repeat,
            toggleRepeat,
            random,
            toggleRandom,
            setRandomSong,
            popup,
            togglePopup,
            myPlaylist,
            favoriteList,
        } 
        = useContext(PlayerContext)

    const onLoadedMetadata = () => {
        const seconds = Math.floor(musicPlayer.current.duration)
        setDuration(seconds)
        rangeSliderMusic.current.max = seconds
    }

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60)
        const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = secs % 60 
        const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnMinutes}:${returnSeconds}`
    }

    const handlePlayPause = () => {
        const prevValue = playing
        togglePlaying()
        if (!prevValue) musicPlayer.current.play()
        else musicPlayer.current.pause()
    }

    const handleEnded = () => {
        if (repeat === 0 && !random) {
            if (currentSong === songsList.length - 1) {
                handlePlayPause()
            } else {
                nextSong()
                setPlaying()
                toggleDummy()
            }
        } 
        else if (repeat === 1) {
            nextSong()
            setPlaying()
            toggleDummy() 
        } 
        else if (repeat === 2) {
            setPlaying()
            toggleDummy()
        }
        else if (random) {
            setRandomSong()
            setPlaying()
            toggleDummy()
        }

    }

    const changeRange = () => {
        if (isSkipping) {
            rangeSliderMusic.current.style.setProperty('--seek-before-width', `${rangeSliderMusic.current.value / duration * 100}%`)
            setCurrentTime(rangeSliderMusic.current.value)
        }
    }

    const whilePlaying = () => {
        if (!isSkipping) {
            rangeSliderMusic.current.value = musicPlayer.current.currentTime
            rangeSliderMusic.current.style.setProperty('--seek-before-width', `${rangeSliderMusic.current.value / duration * 100}%`)
            setCurrentTime(rangeSliderMusic.current.value)
        }
    }

    const changeVolume = () => {
        musicPlayer.current.volume = rangeSliderVolume.current.value / 100
        rangeSliderVolume.current.style.setProperty('--seek-before-width', `${rangeSliderVolume.current.value}%`) 
        setVolume(rangeSliderVolume.current.value)
    }

    useDidMountEffect(() => {
        handlePlayPause()
    }, [dummy])

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
        <div className='bg-white rounded-xl my-3'>
            <div className='py-4 px-6'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex text-lg text-text-color w-32 justify-start'>
                        <button 
                            className='p-2 hover:bg-slate-100 rounded-lg mr-2'
                            onClick={(e) => {
                                e.stopPropagation()
                                const existed = favoriteList.some(item => item.id === songsList[currentSong].id)
                                if (existed) {
                                    notify('warn', 'This song is already in your favorite list')
                                } 
                                else {
                                    notify('success', 'This song has been added to your favorite list')
                                    favoriteList.push(songsList[currentSong])
                                }
                            }}
                        >
                            <TbHeartPlus />
                        </button>
                        <button 
                            className='p-2 hover:bg-slate-100 rounded-lg mr-2'
                            onClick={(e) => {
                                e.stopPropagation()
                                const existed = myPlaylist.some(item => item.id === songsList[currentSong].id)
                                if (existed) {
                                    notify('warn', 'This song is already in the playlist')
                                } 
                                else {
                                    notify('success', 'This song has been added to playlist')
                                    myPlaylist.push(songsList[currentSong])
                                }
                            }}
                        >
                            <RiFolderMusicLine />
                        </button>
                        <button 
                            className={`p-2 hover:bg-slate-100 rounded-lg ${popup ? 'text-primiry-color' : 'text-text-color'}`}
                            onClick={() => {
                                togglePopup()
                            }}
                        >
                            <CgMiniPlayer />
                        </button> 
                    </div>
                    <div className='flex text-lg text-text-color'>
                        <button
                            className={`p-2 ${repeat > 0 ? 'text-primiry-color' : 'text-text-color'}`}
                            onClick={() => toggleRepeat()}
                        >
                            {repeat === 2 ? <MdOutlineRepeatOne /> : <MdOutlineRepeat />}
                        </button>
                        <button
                            className='p-2 text-primiry-color mr-3'
                            onClick={() => {
                                prevSong()
                                setPlaying()
                                toggleDummy()
                            }}
                        >
                            <BsFillSkipBackwardFill />
                        </button>
                        <button
                            className='w-9 h-9 rounded-full flex items-center text-white justify-center bg-primiry-color'
                            onClick={handlePlayPause}
                        >
                            {playing ?  <FaPause /> : <FaPlay />}
                        </button> 
                        <button 
                            className='p-2 text-primiry-color ml-3'
                            onClick={() => {
                                nextSong()
                                setPlaying()
                                toggleDummy()
                            }}
                        >
                            <BsFillSkipForwardFill />
                        </button>
                        <button
                            className={`p-2 ${random ? 'text-primiry-color' : 'text-text-color'}`}
                            onClick={() => toggleRandom()}
                        >
                            <BsShuffle />
                        </button>
                    </div>
                    <div className='flex items-center w-32 justify-end'>
                        <div className='p-2 text-text-color text-lg'>
                            {volume === '0' ? <RiVolumeMuteLine /> : <RiVolumeDownLine />}
                        </div>         
                        <input 
                            type='range' 
                            className={styles.slider} 
                            style={{'--seek-before-width': '100%'}}
                            min='0' 
                            max='100'
                            defaultValue='100'
                            ref={rangeSliderVolume}
                            onChange={changeVolume}
                        />
                        <div className='p-2 text-text-color text-lg'>
                            <RiVolumeUpLine />
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='mr-3.5 text-xs font-medium text-primiry-color'>
                        {calculateTime(currentTime)}
                    </div>
                    <div className='flex-1 flex items-center'>
                        <input 
                            type='range' 
                            className={styles.slider} 
                            min='0' 
                            defaultValue='0' 
                            ref={rangeSliderMusic} 
                            onMouseDown={() => {
                                isSkipping = true
                            }}
                            onChange={changeRange}
                            onMouseUp={() => {
                                musicPlayer.current.currentTime = rangeSliderMusic.current.value
                                isSkipping = false
                            }}
                        />
                    </div>
                    <div className='ml-3.5 text-xs font-medium text-primiry-color'>
                        {!isNaN(duration) && calculateTime(duration)}
                    </div>
                </div>
            </div>
            <audio 
                ref={musicPlayer} 
                id={songsList[currentSong].id}
                src={songsList[currentSong].songLink} 
                onEnded={handleEnded} 
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={whilePlaying}
            >
            </audio>
            <PopupWindow />
        </div>
    )
}

export default MusicPlayer