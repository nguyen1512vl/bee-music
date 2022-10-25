let playerReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SONGS_ARRAY':
            return {
                ...state,
                songsList: action.payload
            }
        case 'SET_CURRENT_SONG':
            return {
                ...state,
                currentSong: action.payload
            }
        case 'TOGGLE_PLAYING':
            return {
                ...state,
                playing: action.payload
            }
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.payload
            }
        case 'TOGGLE_DUMMY':
            return {
                ...state,
                dummy: action.payload
            }
        case 'TOGGLE_REPEAT':
            return {
                ...state,
                repeat: action.payload
            }
        case 'TOGGLE_RANDOM':
            return {
                ...state,
                random: action.payload
            }
        case 'TOGGLE_POPUP':
            return {
                ...state,
                popup: action.payload
            }
        case 'SET_SHOW_SEARCH_RESULT':
            return {
                ...state,
                showSearchResult: action.payload
            }
        case 'SET_WORD_ENTERED':
            return {
                ...state,
                wordEntered: action.payload
            }
        case 'SET_FILTERED_DATA':
            return {
                ...state,
                filteredData: action.payload
            }
        case 'SET_SHOW_MY_PLAYLIST':
            return {
                ...state,
                showMyPlaylist: action.payload
            }
        case 'SET_ONE_SONG_ARRAY':
            return {
                ...state,
                oneSongArray: action.payload
            }
        case 'SET_ALBUM_LIST':
            return {
                ...state,
                albumList: action.payload
            }
        case 'SET_SHOW_ARTIST':
            return {
                ...state,
                showArtist: action.payload
            }
        case 'SET_ARTIST_LIST':
            return {
                ...state,
                artistList: action.payload
            }
        default:
    }
}

export default playerReducer