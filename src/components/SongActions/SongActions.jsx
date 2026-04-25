import { useState } from 'react'
import { FiHeart, FiPlus, FiShare2, FiMoreHorizontal } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import './SongActions.css'

function SongActions({ song, onAddToPlaylist }) {
  // Track liked state
  const [isLiked, setIsLiked] = useState(false)

  // Track if we just added (for brief visual feedback)
  const [justAdded, setJustAdded] = useState(false)

  function handleLike() {
    setIsLiked(prev => !prev)
  }

  function handleAddToPlaylist() {
    // Pass song up to parent to add to playlist
    onAddToPlaylist(song)

    // Show feedback for 1.5 seconds
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="song-actions">
      {/* Like button */}
      <button
        className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
        onClick={handleLike}
        aria-label={isLiked ? 'Unlike song' : 'Like song'}
      >
        {isLiked ? <FaHeart size={24} color="#1db954" /> : <FiHeart size={24} />}
        <span>{isLiked ? 'Liked' : 'Like'}</span>
      </button>

      {/* Add to playlist button */}
      <button
        className={`action-btn add-btn ${justAdded ? 'added' : ''}`}
        onClick={handleAddToPlaylist}
        aria-label="Add to playlist"
      >
        <FiPlus size={22} />
        <span>{justAdded ? '✓ Added!' : 'Add to Playlist'}</span>
      </button>

      {/* Share button (visual only) */}
      <button className="action-btn share-btn" aria-label="Share">
        <FiShare2 size={22} />
        <span>Share</span>
      </button>

      {/* More options button */}
      <button className="action-btn more-btn" aria-label="More options">
        <FiMoreHorizontal size={22} />
        <span>More</span>
      </button>
    </div>
  )
}

export default SongActions
