import React from "react";
import HomePage from "./components/HomePage";
import SetPreferences from "./components/SetPreferences";
import FormPage from "./components/FormPage";
import StoryPage from "./components/StoryPage";
import Header from "./components/Header";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/storypage" element={<StoryPage />} />
        <Route path="/setpreferences" element={<SetPreferences />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
