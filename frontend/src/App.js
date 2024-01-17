import React, { useState, useEffect } from 'react';
import './App.css';
import FeedItem from './FeedItem'; 

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [feedData, setFeedData] = useState([]); 

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://finance-news-cron-6972a9cbd9e1.herokuapp.com/');
        const data = await response.json();
        setFeedData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

  fetchData(); // Fetch immediately on mount
  const intervalId = setInterval(fetchData, 60000); // Fetch every 60 seconds

  return () => clearInterval(intervalId); // Clean up on unmount
}, []);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <div className="App-header-title">Financial Fast Feed</div>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      
      <main className="feed-container">
        {feedData.map((item, index) => (
          <FeedItem
            key={index} 
            title={item.title}
            link={item.link}
            summary={item.summary}
            date={item.date}
          />
        ))}
      </main>

      <footer className="App-footer">
        <a href="https://github.com/EthanCratchley/finance-news" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://yourdonationlink.com" target="_blank" rel="noopener noreferrer">Donate</a>
        <a href="https://www.ethancratchley.com" target="_blank" rel="noopener noreferrer">Created by Ethan Cratchley</a>
      </footer>
    </div>
  );
}

export default App;
