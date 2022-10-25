import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdReturnLeft } from 'react-icons/io'
import { RiVolumeUpLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { TbHeartPlus } from 'react-icons/tb'
import { RiFolderMusicLine } from 'react-icons/ri'
import playerContext from '../context/PlayerContext'
import { Navigate } from 'react-router-dom'

function Artist({ id, name, image }) {
    const { 
            musicPlayer,
            artistList, 
            currentSong,
            songsList,
            setSongsArray,
            setCurrentSong,
            setPlaying,
            toggleDummy,
            setReplay,
            favoriteList,
            myPlaylist
        } 
        = useContext(playerContext)

    let navigate = useNavigate()

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
            <div className='flex items-center justify-end'>
                <button 
                    className='p-3 text-lg'
                    onClick={() => navigate('/artists')}
                >
                    <IoMdReturnLeft />
                </button>
            </div>
            <div className='mb-3 flex flex-col items-center justify-center'>
                <div className='w-52 h-52 rounded-lg bg-cover' style = {{backgroundImage: `url(${image})`}}></div>
                <div className='font-semibold text-lg mt-2 text-center'>{name}</div>
            </div>
            <div className='flex items-center text-subtext-color text-xs py-2 mb-2'>
                <div className='w-10 uppercase pr-2 ml-1.5'>#</div>
                <div className='w-52 uppercase pr-2 pl-10'>title</div>
                <div className='w-40 uppercase pr-2'>album</div>
            </div>
            <ul className='h-[185px] overflow-auto scrollbar-hide -mx-3.5'>
                {artistList[id].map((song, index) => (
                    <li 
                        key={song.id} 
                        id={song.id}
                        className={`
                            mx-3 px-2 py-3 text-xs flex items-center rounded-r-lg rounded-l-lg
                            border-b-2 border-solid border-slate-200 relative
                            hover:bg-neutral-800 hover:text-white cursor-pointer 
                            ${songsList === artistList[id] && currentSong === index ? 'bg-neutral-800 text-white' : ''}
                        `}
                        onClick={(e) => {
                            if (songsList !== artistList[id] && e.currentTarget.id == musicPlayer.current.id) {
                                setReplay()
                            }
                            setSongsArray(artistList[id])
                            setCurrentSong(index)
                            setPlaying()
                            toggleDummy()
                        }}
                    >
                        <div className='w-10 pr-2'>{songsList === artistList[id] && currentSong === index ? <RiVolumeUpLine className='text-lg'/> : (index + 1 < 10 ? `0${index + 1}` : index + 1)}</div>
                        <div className='w-8 h-8 rounded-lg bg-cover' style = {{backgroundImage: `url(${song.imageLink})`}}></div>
                        <div className='w-44 truncate ... pr-2 pl-2'>{song.name}</div>
                        <div className='w-40 truncate ... pr-2'>{song.album}</div>
                        <div className='flex text-lg flex-1 justify-end'>
                            <button 
                            className='p-2 hover:bg-slate-100 hover:text-primiry-color rounded-lg mr-2'
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
                                <TbHeartPlus />
                            </button>
                            <button 
                            className='p-2 hover:bg-slate-100 hover:text-primiry-color rounded-lg'
                            onClick={(e) => {
                                e.stopPropagation()
                                const existed = myPlaylist.some(item => item.id === song.id)
                                if (existed) {
                                    notify('warn', 'This song is already in the playlist')
                                } 
                                else {
                                    notify('success', 'This song has been added to playlist')
                                    myPlaylist.push(song)
                                }
                            }}
                            >
                                <RiFolderMusicLine />
                            </button>
                        </div> 
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Artist