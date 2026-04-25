import { FiMusic } from 'react-icons/fi';
import './Playlist.css'

// Format seconds to mm:ss
function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function Playlist({ songs, onSelectSong, currentSong }) {
  return (
    <div className="playlist">
      <div className="playlist-header">
        <h3 className="playlist-title">Your Playlist</h3>
        <span className="playlist-count">{songs.length} songs</span>
      </div>

      {songs.length === 0 ? (
        <div className="playlist-empty">
          <FiMusic size={40} style={{ opacity: 0.3 }} />
          <p>No songs yet. Add some!</p>
        </div>
      ) : (
        <ul className="playlist-list">
          {songs.map((song, index) => (
            <li key={`${song.id}-${index}`}>
              <button
                className={`playlist-item ${currentSong?.id === song.id ? 'active' : ''}`}
                onClick={() => onSelectSong(song)}
                aria-label={`Play ${song.title}`}
              >
                {/* Index / playing indicator */}
                <span className="playlist-index">
                  {currentSong?.id === song.id ? (
                    <span className="mini-eq">
                      <span></span><span></span><span></span>
                    </span>
                  ) : (
                    index + 1
                  )}
                </span>

                {/* Cover */}
                <img
                  src={song.coverImage}
                  alt={song.album}
                  className="playlist-item-cover"
                />

                {/* Info */}
                <div className="playlist-item-info">
                  <span className={`playlist-item-title ${currentSong?.id === song.id ? 'green' : ''}`}>
                    {song.title}
                  </span>
                  <span className="playlist-item-artist">{song.artist}</span>
                </div>

                {/* Duration */}
                <span className="playlist-item-duration">
                  {formatDuration(song.duration)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Playlist
