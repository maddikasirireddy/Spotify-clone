import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import PlayerBar from './components/PlayerBar/PlayerBar'
import Home from './components/Home/Home'
import SongDetail from './components/SongDetail/SongDetail'
import './App.css'

function App() {
  // State for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Tracks the currently selected song for the detail view
  const [selectedSong, setSelectedSong] = useState(null)

  // Tracks the currently playing song for the PlayerBar
  const [currentSong, setCurrentSong] = useState(null)

  // Toggles the sidebar open/closed state
  function handleToggleSidebar() {
    setIsSidebarOpen(prev => !prev)
  }

  // Updates both selected and currently playing song when a card is clicked
  function handleSelectSong(song) {
    setSelectedSong(song)
    setCurrentSong(song)
  }

  // Resets the view to Home by clearing the selected song
  function handleGoHome() {
    setSelectedSong(null)
  }

  return (
    <div className="app-root">
      <Navbar onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="app-body">
        <Sidebar isOpen={isSidebarOpen} onGoHome={handleGoHome} />

        <main className={`app-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          {/* Conditional rendering based on whether a song is selected */}
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
```
