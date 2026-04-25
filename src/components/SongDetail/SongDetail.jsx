import { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi';
import SongActions from '../SongActions/SongActions'
import Playlist from '../Playlist/Playlist'
import './SongDetail.css'

// Dummy initial playlist songs
const INITIAL_PLAYLIST = [
  {
    id: 101,
    title: 'Shivers',
    artist: 'Ed Sheeran',
    album: '=',
    coverImage: 'https://picsum.photos/seed/shivers/300/300',
    duration: 207,
  },
  {
    id: 102,
    title: 'Bad Habits',
    artist: 'Ed Sheeran',
    album: '=',
    coverImage: 'https://picsum.photos/seed/badhabits/300/300',
    duration: 231,
  },
]

// Format seconds to mm:ss
function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function SongDetail({ selectedSong, onGoBack, onSelectSong }) {
  // Playlist state initialized with 2 dummy songs
  const [playlist, setPlaylist] = useState(INITIAL_PLAYLIST)

  // Track which song is playing in the playlist
  const [currentInPlaylist, setCurrentInPlaylist] = useState(selectedSong)

  // Add selectedSong to playlist (prevent exact duplicates)
  function handleAddToPlaylist(song) {
    const alreadyAdded = playlist.some(s => s.id === song.id)
    if (!alreadyAdded) {
      setPlaylist(prev => [...prev, song])
    }
  }

  // Play a song from the playlist
  function handlePlayFromPlaylist(song) {
    setCurrentInPlaylist(song)
    onSelectSong(song)
  }

  return (
    <div className="song-detail">
      {/* Back button */}
      <button className="detail-back-btn" onClick={onGoBack} aria-label="Go back to home">
        <FiArrowLeft size={20} />
        Back
      </button>

      {/* Hero section */}
      <div className="detail-hero">
        {/* Blurred background from album cover */}
        <div
          className="detail-hero-bg"
          style={{ backgroundImage: `url(${selectedSong.coverImage})` }}
        />
        <div className="detail-hero-overlay" />

        <div className="detail-hero-content">
          {/* Large album cover */}
          <div className="detail-cover-wrapper">
            <img
              src={selectedSong.coverImage}
              alt={selectedSong.album}
              className="detail-cover"
            />
          </div>

          {/* Song info */}
          <div className="detail-info">
            <p className="detail-type">SONG</p>
            <h1 className="detail-title">{selectedSong.title}</h1>
            <div className="detail-meta">
              <img
                src={selectedSong.coverImage}
                alt={selectedSong.artist}
                className="detail-artist-avatar"
              />
              <span className="detail-artist">{selectedSong.artist}</span>
              <span className="detail-dot">•</span>
              <span className="detail-album">{selectedSong.album}</span>
              <span className="detail-dot">•</span>
              <span className="detail-duration">{formatDuration(selectedSong.duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="detail-actions-wrapper">
        <SongActions song={selectedSong} onAddToPlaylist={handleAddToPlaylist} />
      </div>

      {/* Playlist section */}
      <div className="detail-playlist-wrapper">
        <Playlist
          songs={playlist}
          onSelectSong={handlePlayFromPlaylist}
          currentSong={currentInPlaylist}
        />
      </div>
    </div>
  )
}

export default SongDetail
