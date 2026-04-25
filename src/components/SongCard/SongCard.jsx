import { FiPlay } from 'react-icons/fi';
import './SongCard.css'

// Format seconds to mm:ss
function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function SongCard({ song, onSelectSong, isPlaying }) {
  function handleClick() {
    // Pass song up to App via props chain
    onSelectSong(song)
  }

  return (
    <div
      className={`song-card ${isPlaying ? 'playing' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      aria-label={`Play ${song.title} by ${song.artist}`}
    >
      {/* Album Cover */}
      <div className="song-card-cover-wrapper">
        <img
          src={song.coverImage}
          alt={song.album}
          className="song-card-cover"
        />
        {/* Play button overlay */}
        <div className="song-card-overlay">
          {isPlaying ? (
            <div className="playing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <button className="song-card-play-btn" aria-label="Play">
              <FiPlay size={22} />
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="song-card-info">
        <span className={`song-card-title ${isPlaying ? 'green' : ''}`}>
          {song.title}
        </span>
        <span className="song-card-artist">{song.artist}</span>
        <span className="song-card-duration">{formatDuration(song.duration)}</span>
      </div>
    </div>
  )
}

export default SongCard
