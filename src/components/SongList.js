import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdReturnLeft } from 'react-icons/io'
import { useContext } from 'react'
import { RiVolumeUpLine } from 'react-icons/ri'
import { BsThreeDots } from 'react-icons/bs'
import { MdMusicOff } from 'react-icons/md'

import playerContext from '../context/PlayerContext'
import songData from '../Data.json'

function Songlist({ title, type }) {

    const { 
            musicPlayer,
            songsList,
            setSongsArray, 
            currentSong, 
            myPlaylist,
            favoriteList, 
            setCurrentSong, 
            setPlaying, 
            setReplay,
            toggleDummy, 
            setShowMyPlaylist,
            setOneSongArray
        } 
        = useContext(playerContext)

    let navigate = useNavigate()

    const [songId, setSongId] = useState(-1)
    const [showDropdown, setShowDropdown] = useState(-1)

    const dropdownRef = useRef()

    useEffect(() => {
        const closeDropdown = (e) => {
            if (e.path[0] !== dropdownRef.current) {
                setShowDropdown(-1)
            }
        }

        document.body.addEventListener('click', closeDropdown)

        return () => document.body.removeEventListener('click', closeDropdown)
    }, [])

    const listArray = useMemo(() => {
        let result = []

        switch (type) {
            case 'playlist':
                result = myPlaylist
                break
            case 'favorite':
                result = favoriteList
                break
        }
        return result
    }, [myPlaylist, favoriteList])

    const ReturnButton = () => {
        switch (type) {
            case 'playlist':
                return (
                    <button 
                        className='p-3 text-lg'
                        onClick={() => navigate('/playlists')}
                    >
                        <IoMdReturnLeft />
                    </button>
                )
            case 'favorite':
                return null
        }
    }

    const toggleDropdown = (index) => {
        if (showDropdown === -1) setShowDropdown(index)
        else setShowDropdown(-1)
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                    <div className='text-2xl font-extrabold p-1.5'>{title}</div>
                    <ReturnButton />
                </div>
                <div className='flex items-center text-subtext-color text-xs py-2 mb-2'>
                    <div className='w-10 uppercase pr-2 ml-1.5'>#</div>
                    <div className='w-52 uppercase pr-2 pl-10'>title</div>
                    <div className='w-40 uppercase pr-2'>artist</div>
                    <div className='flex-1 uppercase'>album</div>
                </div>
                <ul className='h-[445px] overflow-auto scrollbar-hide -mx-3.5'>
                    {listArray.map((song, index) => (
                        <li 
                            key={song.id} 
                            id={song.id}
                            className={`
                                mx-3 px-2 py-3 text-xs flex items-center rounded-r-lg rounded-l-lg
                                border-b-2 border-solid border-slate-200 relative
                                hover:bg-neutral-800 hover:text-white cursor-pointer 
                                ${songsList === listArray && currentSong === index ? 'bg-neutral-800 text-white' : ''}
                            `}
                            onClick={(e) => {
                                if (songsList !== listArray && e.currentTarget.id == musicPlayer.current.id) {
                                    setReplay()
                                }
                                setSongsArray(listArray)
                                setCurrentSong(index)
                                setPlaying()
                                toggleDummy()
                            }}
                            onMouseOver={() => {setSongId(index)}}
                            onMouseOut={() => {setSongId(-1)}}
                        >
                            <div className='w-10 pr-2'>{songsList === listArray && currentSong === index ? <RiVolumeUpLine className='text-lg'/> : (index + 1 < 10 ? `0${index + 1}` : index + 1)}</div>
                            <div className='w-8 h-8 rounded-lg bg-cover' style = {{backgroundImage: `url(${song.imageLink})`}}></div>
                            <div className='w-44 truncate ... pr-2 pl-2'>{song.name}</div>
                            <div className='w-40 truncate ... pr-2'>{song.artist}</div>
                            {
                               songId === index
                               ? 
                               <div className='flex-1 flex justify-end'>
                                   <div 
                                        className='p-1.5 hover:bg-slate-100 hover:text-primiry-color rounded-lg text-lg'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleDropdown(index)
                                        }}
                                   >
                                       <BsThreeDots />
                                   </div>
                               </div>
                               : <div className='flex-1 truncate ...'>{song.album}</div> 
                            }
                            {
                                showDropdown === index
                                ?   <div 
                                        ref={dropdownRef}
                                        className='absolute p-2 top-3 right-10 flex bg-white text-primiry-color z-10 rounded-lg drop-shadow-lg'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            listArray.splice(index, 1)
                                            if (listArray.length > 0) {
                                                if (index < currentSong) setCurrentSong(currentSong - 1)
                                                else if (index === currentSong) setCurrentSong(0)
                                                setPlaying()
                                            }
                                            else {
                                                const dummyArray = [songData[0]]
                                                setOneSongArray(dummyArray)
                                                setSongsArray(dummyArray)
                                                setCurrentSong(0)
                                                setPlaying()
                                            }
                                            setShowDropdown(-1)
                                        }}
                                    >
                                        <MdMusicOff className='text-base mr-1'/>
                                        <div className='text-xs'>Remove</div>
                                    </div>
                                : ''
                            }
                        </li>
                    ))}
                </ul>
        </div>
    )
}

export default Songlist