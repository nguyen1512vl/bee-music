import React, { useContext } from 'react'
import useDidMountEffect from '../hooks/useDidMountEffect'
import { useLocation, useNavigate } from 'react-router-dom'
import { TbArrowLeft, TbArrowRight } from 'react-icons/tb'
import { FiSearch } from 'react-icons/fi'

import playerContext from '../context/PlayerContext'

function SearchBar({ data }) {

  const { 
            wordEntered, 
            setWordEntered,
            setFilteredData 
        } 
        = useContext(playerContext)

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)

    const dataFilter = data.filter((song) => {
      const name = song.name.toLowerCase()
      const artist = song.artist.toLowerCase()
      let album
      if (song.album) 
        album = song.album.toLowerCase()
      else 
        album = ''
      const tag = song.tag.toLowerCase()
      return name.includes(searchWord.toLowerCase()) 
            || artist.includes(searchWord.toLowerCase())
            || album.includes(searchWord.toLowerCase())
            || tag.includes(searchWord.toLowerCase())
    })
    setFilteredData(dataFilter)
  }

  let navigate = useNavigate()

  const location = useLocation()

  useDidMountEffect(() => {
    const isSearch = location.pathname.includes('/search/')
    if (isSearch)
      navigate(`search/${wordEntered}`, { replace: true })
    else 
      navigate(`search/${wordEntered}`)
  }, [wordEntered])

  return (
      <div className='flex items-center justify-between my-3'>
          <div className='flex'>
            <button
              className={`p-2 mr-3 ${window.history.state.idx === 0 ? 'text-subtext-color' : ''}`}
              onClick={() => navigate(-1)}
            >
              <TbArrowLeft className='text-md'/>
            </button>
            <button
              className={`p-2 ${window.history.state.idx === window.history.length - 1 ? 'text-subtext-color' : ''}`}
              onClick={() => navigate(1)}
            >
              <TbArrowRight className='text-md'/>
            </button>
          </div>
          <div className='relative w-10/12'>
            <div className='bg-white rounded-r-full rounded-l-full flex items-center overflow-hidden'>
                <div className='p-3 ml-2'>
                  <FiSearch className='text-lg'/>
                </div>
                <input 
                  type='text' 
                  placeholder='Search for artists, songs and ...' 
                  className='text-xs py-2 flex-1 focus:outline-none font-medium placeholder:text-subtext-color' 
                  onBlur={(e) => {
                    if (e.target.value === '')
                      navigate(-1)
                  }}
                  onChange={handleFilter}
                  value={wordEntered}
                />
            </div>
          </div>
      </div>
  )
}

export default SearchBar
