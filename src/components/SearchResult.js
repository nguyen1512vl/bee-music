import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { TbHeartPlus } from 'react-icons/tb'
import { RiFolderMusicLine } from 'react-icons/ri'

import playerContext from '../context/PlayerContext'

function SearchResult() {

    const {  
            musicPlayer,
            myPlaylist,
            favoriteList,
            filteredData, 
            songsList,
            setSongsArray,
            setCurrentSong, 
            setPlaying, 
            setReplay,
            toggleDummy,
            oneSongArray,
            setOneSongArray
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
        <div className='px-4 py-2 text-xs text-subtext-color'>Suggested results</div>
        <ul className='text-black w-full overflow-auto scrollbar-hide h-full max-h-[500px]'>
              
                {filteredData.map(song => (
                    <li 
                      key={song.id} 
                      id={song.id}
                      className={`
                                  mx-3 px-2 py-3 text-xs flex items-center rounded-r-lg rounded-l-lg
                                  border-b-2 border-solid border-slate-200
                                  hover:bg-neutral-800 hover:text-white cursor-pointer 
                                  ${songsList === oneSongArray && song.id === songsList[0].id ? 'bg-neutral-800 text-white': ''}
                                `}
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
                      <div className='w-10 h-10 rounded-lg bg-cover mr-5' style = {{backgroundImage: `url(${song.imageLink})`}}>
                      </div>
                      <div className='flex-1'>
                        <div>{song.name}</div>
                        <div className='text-subtext-color'>{song.artist}</div>
                      </div>
                      <div className='flex text-lg'>
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

export default SearchResult