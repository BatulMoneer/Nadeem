import React from 'react'
import HomePage from './components/HomePage';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import StoryPage from './components/StoryPage';
import Header from './components/Header';
const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/storypage" element={<StoryPage />} />
      </Routes>

    </Router>
  );
};

export default App;

