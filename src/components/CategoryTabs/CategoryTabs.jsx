import { useState } from 'react'
import './CategoryTabs.css'

const TABS = ['All', 'Pop', 'Hip-Hop', 'Chill']

function CategoryTabs({ activeTab, onTabChange }) {
  return (
    <div className="category-tabs">
      {TABS.map(tab => (
        <button
          key={tab}
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
