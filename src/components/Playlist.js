import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { RiVolumeUpLine } from 'react-icons/ri'

import playerContext from '../context/PlayerContext'

function Playlist() {
    const { 
            musicPlayer,
            songsList,
            setSongsArray, 
            currentSong, 
            myPlaylist, 
            setCurrentSong, 
            setPlaying,
            setReplay, 
            toggleDummy, 
            setShowMyPlaylist 
        } 
        = useContext(playerContext)
   
    return (
        <div>
            <div className='flex items-baseline justify-between'>
                <div className='text-2xl font-extrabold'>My Playlist</div>
                <Link 
                    to='/playlists' 
                    className='text-text-color text-xs pb-0.5'
                    onClick={() => setShowMyPlaylist(true)}
                >Show All</Link> 
            </div>
            <div className='flex items-center text-subtext-color text-xs py-2'>
                <div className='w-10 uppercase pr-2'>#</div>
                <div className='w-52 uppercase pr-2 pl-10'>title</div>
                <div className='w-40 uppercase pr-2'>artist</div>
                <div className='flex-1 uppercase'>album</div>
            </div>
            <ul className='h-48 overflow-auto scrollbar-hide -mx-3.5'>
                {myPlaylist.map((song, index) => (
                    <li 
                        key={song.id}
                        id={song.id} 
                        className={`flex items-center text-xs px-3.5 rounded-md cursor-pointer ${songsList === myPlaylist && currentSong === index ? 'bg-white py-3.5 font-bold drop-shadow-lg text-primiry-color' : 'py-2.5 text-text-color hover:bg-slate-200'}`}
                        onClick={(e) => {
                            if (songsList !== myPlaylist && e.currentTarget.id == musicPlayer.current.id) {
                                setReplay()
                            }  
                            setSongsArray(myPlaylist)
                            setCurrentSong(index)
                            setPlaying()
                            toggleDummy()
                        }}
                    >
                        <div className='w-10 pr-2'>{songsList === myPlaylist && currentSong === index ? <RiVolumeUpLine className='text-lg'/> : (index + 1 < 10 ? `0${index + 1}` : index + 1)}</div>
                        <div className='w-8 h-8 rounded-lg bg-cover' style = {{backgroundImage: `url(${song.imageLink})`}}></div>
                        <div className='w-44 truncate ... pr-2 pl-2'>{song.name}</div>
                        <div className='w-40 truncate ... pr-2'>{song.artist}</div>
                        <div className='flex-1 truncate ...'>{song.album}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Playlist