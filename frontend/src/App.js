import React from "react";
import HomePage from "./components/HomePage";
import FormPage from "./components/FormPage";
import StoryPage from "./components/StoryPage";
import RatingModal from "./components/RatingModal";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/storypage" element={<StoryPage />} />
        <Route path="/setpreferences" element={<FormPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/rate" element={<RatingModal />} />
      </Routes>
    </Router>
  );
};

export default App;
