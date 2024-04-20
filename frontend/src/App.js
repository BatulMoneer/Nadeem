import React from 'react'
import HomePage from './components/HomePage';
import SetPreferences from './components/SetPreferences'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import StoryPage from './components/StoryPage';
import Header from './components/Header';
const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/storypage" element={<StoryPage />} />
        <Route path="/SetPreferences" element={<SetPreferences />} />
      </Routes>

    </Router>
  );
};

export default App;

