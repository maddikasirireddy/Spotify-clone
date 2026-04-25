import React from 'react' // Changed to import React instead of unused useState
import './CategoryTabs.css'

// Pre-defined music categories
const TABS = ['All', 'Pop', 'Hip-Hop', 'Chill']

function CategoryTabs({ activeTab, onTabChange }) {
  return (
    <div className="category-tabs">
      {TABS.map(tab => (
        <button
          key={tab}
          // Dynamically apply the 'active' class to the currently selected tab
          className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs

