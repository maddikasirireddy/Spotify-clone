import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import PlayerBar from './components/PlayerBar/PlayerBar'
import Home from './components/Home/Home'
import SongDetail from './components/SongDetail/SongDetail'
import './App.css'

function App() {
  // Sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Which song is selected (determines which page renders)
  const [selectedSong, setSelectedSong] = useState(null)

  // Currently playing song (shown in PlayerBar)
  const [currentSong, setCurrentSong] = useState(null)

  // Toggle sidebar
  function handleToggleSidebar() {
    setIsSidebarOpen(prev => !prev)
  }

  // Called when a SongCard is clicked
  function handleSelectSong(song) {
    setSelectedSong(song)
    setCurrentSong(song)
  }

  // Go back to home view
  function handleGoHome() {
    setSelectedSong(null)
  }

  return (
    <div className="app-root">
      <Navbar onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="app-body">
        <Sidebar isOpen={isSidebarOpen} onGoHome={handleGoHome} />

        <main className={`app-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          {selectedSong === null ? (
            <Home onSelectSong={handleSelectSong} currentSong={currentSong} />
          ) : (
            <SongDetail
              selectedSong={selectedSong}
              onGoBack={handleGoHome}
              onSelectSong={handleSelectSong}
            />
          )}
        </main>
      </div>

      <PlayerBar currentSong={currentSong} />
    </div>
  )
}

export default App
