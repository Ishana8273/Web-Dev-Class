import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const cards = [
    {
      path: '/read',
      icon: '📖',
      title: 'Read File',
      desc: 'View current file content, line count, and metadata',
      color: '#3B82F6',
    },
    {
      path: '/create',
      icon: '✏️',
      title: 'Create / Write',
      desc: 'Append new content or overwrite the entire file',
      color: '#10B981',
    },
    {
      path: '/update',
      icon: '🔄',
      title: 'Update Content',
      desc: 'Find and replace text or edit specific lines',
      color: '#F59E0B',
    },
    {
      path: '/delete',
      icon: '🗑️',
      title: 'Delete Content',
      desc: 'Remove specific lines or clear all file content',
      color: '#EF4444',
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>📂 File Manager Dashboard</h1>
        <p>Full CRUD operations on <code>file.txt</code> using React + Node.js</p>
      </div>

      <div className="home-grid">
        {cards.map(card => (
          <Link
            to={card.path}
            className="home-card"
            key={card.path}
            style={{ borderTop: `3px solid ${card.color}` }}
          >
            <span className="card-icon">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;