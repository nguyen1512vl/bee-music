import React, { useReducer, useMemo, useRef } from "react"
import playerReducer from "./playerReducer"
import PlayerContext from "./PlayerContext"

import myPlaylist from '../data/MyPlaylistData.js'

const PlayerState = ({ children }) => {
    const initialState = {
        currentSong: 0,
        songsList: myPlaylist,
        myPlaylist: myPlaylist,
        favoriteList: [],
        showMyPlaylist: false,
        repeat: 0,
        random: false,
        playing: false,
        dummy: false,
        popup: false,
        wordEntered: '',
        filteredData: [],
        oneSongArray: [],
        albumList: [],
        artistList: []
    }

    const [state, dispatch] = useReducer(playerReducer, initialState)

    const musicPlayer = useRef()

    const setSongsArray = (arr) => dispatch({ type: 'SET_SONGS_ARRAY', payload: arr })

    const setCurrentSong = (id) => dispatch({ type: 'SET_CURRENT_SONG', payload: id })

    const togglePlaying = () => dispatch({ type: 'TOGGLE_PLAYING', payload: state.playing ? false : true })

    const setPlaying = () => dispatch({ type: 'SET_PLAYING', payload: false})

    const toggleDummy = () => dispatch({ type: 'TOGGLE_DUMMY', payload: state.dummy ? false : true })

    const toggleRepeat = () => dispatch({ type: 'TOGGLE_REPEAT', payload: state.repeat >= 2 ? 0 : state.repeat + 1 })

    const toggleRandom = () => dispatch({ type: 'TOGGLE_RANDOM', payload: state.random ? false : true })

    const setReplay = () => {
        musicPlayer.current.setAttribute('src', musicPlayer.current.currentSrc)
        musicPlayer.current.play()
    }

    const togglePopup = () => dispatch({ type: 'TOGGLE_POPUP', payload: state.popup ? false : true })

    const nextSong = () => {
        if (state.currentSong === state.songsList.length - 1) setCurrentSong(0)
        else setCurrentSong(state.currentSong + 1)
    }

    const prevSong = () => {
        if (state.currentSong === 0) setCurrentSong(state.songsList.length - 1)
        else setCurrentSong(state.currentSong - 1)
    }

    const randomSongs = useMemo(() => {
        const result = []
        for (let i = 0; i < state.songsList.length; i++) result[i] = i    
        return result
    }, [state.random])

    const setRandomSong = () => {
        const oldSong = state.currentSong
        let randomSong
        let isMeet = false
        let index = randomSongs.indexOf(oldSong)
        if (index !== -1) randomSongs.splice(index, 1)
        if (randomSongs.length === 0) {
            for (let i = 0; i < state.songsList.length; i++) randomSongs[i] = i
            let index = randomSongs.indexOf(oldSong)
            if (index !== -1) randomSongs.splice(index, 1)
        }
        do {
            randomSong = Math.floor(Math.random() * state.songsList.length)
            for (let i = 0; i < randomSongs.length; i++) {
                isMeet = randomSong === randomSongs[i]
                if (isMeet) break
            }
        }
        while (!isMeet)

        setCurrentSong(randomSong)
    }

    const setWordEntered = (string) => dispatch({ type: 'SET_WORD_ENTERED', payload: string })

    const setFilteredData = (arr) => dispatch({ type: 'SET_FILTERED_DATA', payload: arr })

    const setShowMyPlaylist = (bool) => dispatch({ type: 'SET_SHOW_MY_PLAYLIST', payload: bool })

    const setOneSongArray = (arr) => dispatch({ type: 'SET_ONE_SONG_ARRAY', payload: arr })

    const setAlbumList = (arr) => dispatch({ type: 'SET_ALBUM_LIST', payload: arr })

    const setArtistList = (arr) => dispatch({ type: 'SET_ARTIST_LIST', payload: arr })

    return (
    <PlayerContext.Provider
        value={{
            musicPlayer: musicPlayer,
            currentSong: state.currentSong,
            songsList: state.songsList,
            repeat: state.repeat,
            random: state.random,
            playing: state.playing,
            dummy: state.dummy,
            popup: state.popup,
            wordEntered: state.wordEntered,
            filteredData: state.filteredData,
            myPlaylist: state.myPlaylist,
            favoriteList: state.favoriteList,
            showMyPlaylist: state.showMyPlaylist,
            oneSongArray: state.oneSongArray,
            albumList: state.albumList,
            artistList: state.artistList,
            setCurrentSong,
            setSongsArray,
            togglePlaying,
            setPlaying,
            setReplay,
            toggleDummy,
            nextSong,
            prevSong,
            toggleRepeat,
            toggleRandom,
            setRandomSong,
            togglePopup,
            setWordEntered,
            setFilteredData,
            setShowMyPlaylist,
            setOneSongArray,
            setAlbumList,
            setArtistList,
        }}
    >
        {children}
    </PlayerContext.Provider>
    )
}

export default PlayerState