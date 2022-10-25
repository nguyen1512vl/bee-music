import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './App.css';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import SearchBar from './components/SearchBar';
import Home from './pages/Home.js'
import Trends from './pages/Trends.js';
import Playlists from './pages/Playlists.js';
import NewAndNotable from './pages/NewAndNotable.js'
import ReleaseCalendar from './pages/ReleaseCalendar.js'
import Event from './pages/Event.js'
import FavoriteSongs from './pages/FavoriteSongs.js'
import Artists from './pages/Artists.js'
import Albums from './pages/Albums.js'
import PlayerState from './context/PlayerState.js'
import Shortcuts from './components/Shortcuts';
import FavArtists from './components/FavArtists';
import SuggestAlbum from './components/SuggestAlbum';
import SearchResult from './components/SearchResult';
import songData from './Data.json'

function App() {
  return (
    <PlayerState>
      <div className='wrapper'>
        <div className='app-container rounded-xl grid grid-cols-4 gap-x-6 overflow-hidden'>
          <Navbar />
          <div className='col-span-2 flex flex-col'>
            <SearchBar data={songData} />
            <div className='flex-1'>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/trends" element={<Trends />} />
                  <Route path="/playlists/*" element={<Playlists />} />
                  <Route path="/new-and-notable" element={<NewAndNotable/>} />
                  <Route path="/release-calendar" element={<ReleaseCalendar />} />
                  <Route path="/event" element={<Event />} />
                  <Route path="/favorite-songs" element={<FavoriteSongs />} />
                  <Route path="/artists/*" element={<Artists />} />
                  <Route path="/albums/*" element={<Albums />} />
                  <Route path="/search/*" element={<SearchResult />} />
              </Routes>
            </div>
            <MusicPlayer />
          </div>
          <div>
            <Shortcuts data={songData} />
            <FavArtists /> 
            <SuggestAlbum />
          </div>   
        </div>
        <ToastContainer transition={Flip} />
      </div>
    </PlayerState>
  );
}

export default App;
