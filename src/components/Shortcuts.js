import React, { useContext } from 'react'
import { FcMindMap, FcFilm, FcSelfServiceKiosk, FcFlashOn, FcMusic } from 'react-icons/fc'
import playerContext from '../context/PlayerContext'


function Shortcuts({ data }) {
    const shortcuts = [
        {
            icon: FcMindMap ,
            name: 'Chill Hits'
        },
        {
            icon: FcFilm,
            name: 'Anime Songs'
        },
        {
            icon: FcSelfServiceKiosk,
            name: 'Game Songs'
        },
        {
            icon: FcFlashOn,
            name: 'EDM'
        },
        {
            icon: FcMusic,
            name: 'Tiktok Songs'
        }
    ]

    const { 
            setWordEntered,
            setFilteredData  
        } 
        = useContext(playerContext)

    const handleFilter = (name) => {
        const searchWord = name
        setWordEntered(searchWord)
    
        const dataFilter = data.filter((song) => {
          const tag = song.tag.toLowerCase()
        
          return tag.includes(searchWord.toLowerCase()) 
                
        })
        setFilteredData(dataFilter)
      }

    return (
    <div>
        <div className='text-lg font-extrabold mt-6 mb-2'>Shortcuts</div>
        <ul className='flex flex-wrap'>
            {shortcuts.map((shortcut, index) => {
                const Icon = shortcut.icon
                return (
                    <li
                    key={index}
                    className='py-2.5 px-4 bg-white flex my-1.5 mr-3 rounded-full cursor-pointer'
                    onClick={() => handleFilter(shortcut.name)}
                >
                    <Icon className='text-base mr-1' />
                    <div className='text-xs font-bold'>{shortcut.name}</div>
                </li>
                )})}
        </ul>
    </div>
    )
}

export default Shortcuts