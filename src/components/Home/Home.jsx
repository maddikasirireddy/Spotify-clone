import { useState, useEffect } from 'react'
import { FiSearch, FiX } from 'react-icons/fi';
import SongCard from '../SongCard/SongCard'
import CategoryTabs from '../CategoryTabs/CategoryTabs'
import './Home.css'

function Home({ onSelectSong, currentSong }) {
  // All fetched songs
  const [songs, setSongs] = useState([])

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Active category tab
  const [activeTab, setActiveTab] = useState('All')

  // Search query state
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch songs from local JSON file when component mounts
  useEffect(() => {
    async function fetchSongs() {
      try {
        setIsLoading(true)
        const response = await fetch('/songs.json')

        if (!response.ok) {
          throw new Error('Failed to load songs')
        }

        const data = await response.json()
        setSongs(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSongs()
  }, []) // empty array = runs once on mount

  // Filter songs based on active tab AND search query
  const filteredSongs = songs.filter(song => {
    const matchesTab = activeTab === 'All' || song.genre === activeTab
    const query = searchQuery.toLowerCase()
    const matchesSearch = query === ''
      || song.title.toLowerCase().includes(query)
      || song.artist.toLowerCase().includes(query)
      || song.album.toLowerCase().includes(query)
    return matchesTab && matchesSearch
  })

  // Featured songs (first 3)
  const featuredSongs = songs.slice(0, 3)

  if (isLoading) {
    return (
      <div className="home-loading">
        <div className="spinner"></div>
        <p>Loading songs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="home-error">
        <p>⚠️ {error}</p>
        <p>Make sure songs.json is in the public folder.</p>
      </div>
    )
  }

  return (
    <div className="home">
      {/* Hero / Featured Section */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-content">
          <h1 className="home-greeting">Good evening 👋</h1>
          <p className="home-subtitle">Here's what's trending today</p>
        </div>

        {/* Quick pick cards (horizontal row of top 3) */}
        <div className="home-quick-picks">
          {featuredSongs.map(song => (
            <button
              key={song.id}
              className={`quick-pick ${currentSong?.id === song.id ? 'playing' : ''}`}
              onClick={() => onSelectSong(song)}
            >
              <img src={song.coverImage} alt={song.title} />
              <span>{song.title}</span>
              {currentSong?.id === song.id && (
                <span className="quick-pick-playing">▶</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <div className="home-search-wrapper">
        <div className="home-search-bar">
          <FiSearch className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search songs, artists, albums..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search songs"
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="home-content">
        <div className="home-section-header">
          <h2 className="home-section-title">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Songs'}
          </h2>
          <span className="home-song-count">{filteredSongs.length} songs</span>
        </div>

        {/* Category Tabs */}
        <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Songs Grid */}
        {filteredSongs.length === 0 ? (
          <div className="home-empty">
            {searchQuery
              ? <p>No songs found for "<strong>{searchQuery}</strong>"</p>
              : <p>No songs found in "{activeTab}" category.</p>
            }
          </div>
        ) : (
          <div className="songs-grid">
            {filteredSongs.map(song => (
              <SongCard
                key={song.id}
                song={song}
                onSelectSong={onSelectSong}
                isPlaying={currentSong?.id === song.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
