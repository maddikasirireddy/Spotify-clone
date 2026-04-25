import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
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

  const navigate = useNavigate()

  // Toggles the sidebar open/closed state
  function handleToggleSidebar() {
    setIsSidebarOpen(prev => !prev)
  }

  // Updates both selected and currently playing song when a card is clicked
  function handleSelectSong(song) {
    setSelectedSong(song)
    setCurrentSong(song)
    navigate(`/song/${song.id}`)
  }

  // Resets the view to Home by clearing the selected song
  function handleGoHome() {
    setSelectedSong(null)
    navigate('/')
  }

  return (
    <div className="app-root">
      <Navbar onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="app-body">
        <Sidebar isOpen={isSidebarOpen} onGoHome={handleGoHome} />

        <main className={`app-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route 
              path="/" 
              element={<Home onSelectSong={handleSelectSong} currentSong={currentSong} />} 
            />
            <Route 
              path="/song/:id" 
              element={
                selectedSong ? (
                  <SongDetail
                    selectedSong={selectedSong}
                    onGoBack={handleGoHome}
                    onSelectSong={handleSelectSong}
                  />
                ) : (
                  <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
                    <h2>Song not found</h2>
                    <button 
                      onClick={handleGoHome}
                      style={{ 
                        marginTop: '1rem', 
                        padding: '0.5rem 1rem', 
                        background: 'var(--green)', 
                        color: 'black', 
                        borderRadius: '20px',
                        fontWeight: 'bold'
                      }}
                    >
                      Go Home
                    </button>
                  </div>
                )
              } 
            />
          </Routes>
        </main>
      </div>

      <PlayerBar currentSong={currentSong} />
    </div>
  )
}

export default App
```
