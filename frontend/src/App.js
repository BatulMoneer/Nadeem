import React from "react";
import HomePage from "./components/HomePage";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import FormPage from "./components/FormPage";
import StoryPage from "./components/StoryPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
