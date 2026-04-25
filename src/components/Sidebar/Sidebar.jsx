import { FiHome, FiSearch, FiBook, FiPlus, FiMusic } from 'react-icons/fi';
import './Sidebar.css'

function Sidebar({ isOpen, onGoHome }) {
  const navItems = [
    {
      label: 'Home',
      icon: (
        <FiHome size={20} />
      ),
      action: onGoHome,
    },
    {
      label: 'Search',
      icon: (
        <FiSearch size={20} />
      ),
      action: null,
    },
  ]

  const libraryItems = [
    { label: 'Liked Songs', count: '124 songs', color: '#4b1f9e' },
    { label: 'My Playlist #1', count: '8 songs', color: '#1a6b3c' },
    { label: 'Chill Vibes', count: '15 songs', color: '#8b1a1a' },
    { label: 'Top Hits 2024', count: '20 songs', color: '#1a3d8b' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-inner">
        {/* Main nav */}
        <div className="sidebar-section">
          <ul className="sidebar-nav">
            {navItems.map(item => (
              <li key={item.label}>
                <button
                  className="sidebar-nav-item"
                  onClick={item.action || undefined}
                >
                  <span className="sidebar-nav-icon">{item.icon}</span>
                  <span className="sidebar-nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Library */}
        <div className="sidebar-section sidebar-library">
          <div className="sidebar-library-header">
            <button className="sidebar-library-title">
              <FiBook size={20} />
              <span>Your Library</span>
            </button>
            <button className="sidebar-add-btn" aria-label="Add playlist">
              <FiPlus size={16} />
            </button>
          </div>

          <ul className="sidebar-library-list">
            {libraryItems.map(item => (
              <li key={item.label}>
                <button className="sidebar-library-item">
                  <div
                    className="library-item-cover"
                    style={{ background: item.color }}
                  >
                    <FiMusic size={14} color="white" style={{ opacity: 0.8 }} />
                  </div>
                  <div className="library-item-info">
                    <span className="library-item-name">{item.label}</span>
                    <span className="library-item-meta">Playlist · {item.count}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
