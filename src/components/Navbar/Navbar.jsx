import { FaSpotify } from 'react-icons/fa';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import './Navbar.css'

function Navbar({ onToggleSidebar, isSidebarOpen }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Hamburger / toggle button */}
        <button
          className="navbar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className={`hamburger ${isSidebarOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Spotify Logo */}
        <div className="navbar-logo">
          <FaSpotify size={28} color="#1db954" />
          <span className="navbar-brand">Spotify</span>
        </div>
      </div>

      <div className="navbar-center">
        {/* Search Bar */}
        <div className="navbar-search">
          <FiSearch className="search-icon" size={16} />
          <input type="text" placeholder="What do you want to play?" className="search-input" />
        </div>
      </div>

      <div className="navbar-right">
        <button className="navbar-user-btn">
          <div className="avatar">U</div>
          <span>User</span>
          <FiChevronDown size={14} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
