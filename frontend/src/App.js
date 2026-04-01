import React, { useState } from 'react';
import './App.css';
import BrowseItems from './components/BrowseItems';
import PostItem from './components/PostItem';

function App() {
  const [currentView, setCurrentView] = useState('browse');

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-logo">🌿 Free Sewaa</h1>
        <p className="app-tagline">Community Donation Platform</p>
        <nav className="app-nav">
          <button
            className={`nav-btn ${currentView === 'browse' ? 'active' : ''}`}
            onClick={() => setCurrentView('browse')}
          >
            Browse Items
          </button>
          <button
            className={`nav-btn ${currentView === 'post' ? 'active' : ''}`}
            onClick={() => setCurrentView('post')}
          >
            Post Item
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === 'browse' && <BrowseItems />}
        {currentView === 'post' && <PostItem />}
      </main>

      <footer className="app-footer">
        <p>© 2026 Free Sewaa — Sharing is caring 💚</p>
      </footer>
    </div>
  );
}

export default App;
