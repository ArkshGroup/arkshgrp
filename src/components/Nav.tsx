'use client'
import React, { useState } from 'react'
import { Link } from '@payloadcms/ui'
import '../style/custom.css'

const Nav: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    communication: true,
    content: true,
    teams: true,
    matches: true,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  return (
    <nav className="side-nav">
      {/* Nav Groups */}
      <div className="nav-content">
        {/* COMMUNICATION */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('communication')}>
            <span>Communication</span>
            <span className={`nav-arrow ${openGroups.communication ? 'open' : ''}`}>▼</span>
          </div>
          {openGroups.communication && (
            <ul className="nav-links">
              <li>
                <Link href="/admin/collections/bookings">
                  <span className="nav-icon">💌</span>
                  Bookings
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/contacts">
                  <span className="nav-icon">📞</span>
                  Contacts
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* MEDIA */}
        <div className="nav-group">
          <div className="nav-group-header">
            <span>Media</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/admin/collections/gallery">
                <span className="nav-icon">📸</span>
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/admin/collections/gallery-album">
                <span className="nav-icon">📸</span>
                Gallery Album
              </Link>
            </li>
            <li>
              <Link href="/admin/collections/media">
                <span className="nav-icon">🖼️</span>
                Media
              </Link>
            </li>
            <li>
              <Link href="/admin/collections/notice">
                <span className="nav-icon">📢</span>
                Notice
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTENT */}
        <div className="nav-group">
          <div className="nav-group-header" onClick={() => toggleGroup('content')}>
            <span>Content</span>
            <span className={`nav-arrow ${openGroups.content ? 'open' : ''}`}>▼</span>
          </div>
          {openGroups.content && (
            <ul className="nav-links">
              <li>
                <Link href="/admin/collections/blogs">
                  <span className="nav-icon">📝</span>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/news">
                  <span className="nav-icon">📝</span>
                  News
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/youtube-news">
                  <span className="nav-icon">📝</span>
                  Youtube-News
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* CAREER */}
        <div className="nav-group">
          <div className="nav-group-header">
            <span>Career</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/admin/collections/careers">
                <span className="nav-icon">‍‍💻</span>
                Career
              </Link>
            </li>
            <li>
              <Link href="/admin/collections/applications">
                <span className="nav-icon">👨‍💻</span>
                Applications
              </Link>
            </li>
          </ul>
        </div>

        {/* AUTHENTICATION */}
        <div className="nav-group">
          <div className="nav-group-header">
            <span>Authentication</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/admin/collections/users">
                <span className="nav-icon">👤</span>
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
