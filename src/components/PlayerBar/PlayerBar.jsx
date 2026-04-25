import { useState } from 'react'
import { FiHeart, FiShuffle, FiSkipBack, FiPause, FiPlay, FiSkipForward, FiRepeat, FiList, FiVolume2 } from 'react-icons/fi';
import './PlayerBar.css'

function PlayerBar({ currentSong }) {
  // Play/pause toggle state
  const [isPlaying, setIsPlaying] = useState(false)

  // Shuffle and repeat states
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)

  // Volume state (0–100)
  const [volume, setVolume] = useState(70)

  // Fake progress (0–100)
  const [progress, setProgress] = useState(0)

  function handlePlayPause() {
    setIsPlaying(prev => !prev)
  }

  function handleVolumeChange(e) {
    setVolume(Number(e.target.value))
  }

  function handleProgressChange(e) {
    setProgress(Number(e.target.value))
  }

  // Format seconds to mm:ss
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const duration = currentSong ? currentSong.duration : 0
  const currentTime = Math.floor((progress / 100) * duration)

  return (
    <footer className="player-bar">
      {/* Left: Song Info */}
      <div className="player-left">
        {currentSong ? (
          <>
            <div className="player-cover">
              <img src={currentSong.coverImage} alt={currentSong.title} />
            </div>
            <div className="player-song-info">
              <span className="player-song-title">{currentSong.title}</span>
              <span className="player-song-artist">{currentSong.artist}</span>
            </div>
            <button className="player-like-btn" aria-label="Like song">
              <FiHeart size={16} />
            </button>
          </>
        ) : (
          <div className="player-empty">No song playing</div>
        )}
      </div>

      {/* Center: Controls */}
      <div className="player-center">
        <div className="player-controls">
          <button
            className={`ctrl-btn ${isShuffle ? 'active' : ''}`}
            onClick={() => setIsShuffle(p => !p)}
            aria-label="Shuffle"
          >
            <FiShuffle size={16} />
          </button>

          <button className="ctrl-btn" aria-label="Previous">
            <FiSkipBack size={18} />
          </button>

          <button
            className="play-pause-btn"
            onClick={handlePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <FiPause size={20} />
            ) : (
              <FiPlay size={20} />
            )}
          </button>

          <button className="ctrl-btn" aria-label="Next">
            <FiSkipForward size={18} />
          </button>

          <button
            className={`ctrl-btn ${isRepeat ? 'active' : ''}`}
            onClick={() => setIsRepeat(p => !p)}
            aria-label="Repeat"
          >
            <FiRepeat size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="player-progress">
          <span className="progress-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="progress-slider"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
          />
          <span className="progress-time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="player-right">
        <button className="ctrl-btn" aria-label="Queue">
          <FiList size={16} />
        </button>
        <button className="ctrl-btn" aria-label="Volume">
          <FiVolume2 size={16} />
        </button>
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </footer>
  )
}

export default PlayerBar
