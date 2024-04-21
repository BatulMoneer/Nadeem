import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import { useLocation } from "react-router-dom";

import LikeButton from "../addings/Group 401.png";
import AddButton from "../addings/Group 400.png";
import SoundButton from "../addings/Group 399.png";
import FullscreenButton from "../addings/Group 398.png";

const StoryPage = () => {
  const [audioData, setAudioData] = useState("");
  const [story, setStory] = useState("");
  const location = useLocation();

  // Moved handleAdd outside of useEffect to make it accessible for button click
  const handleAdd = async () => {
    if (!location.state) {
      console.log("No form data provided");
      return;
    }

    const { insert_prompt, name, age, gender } = location.state;
    const url = "http://localhost:8000/generate_story/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ insert_prompt, name, age, gender }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setStory(jsonResponse);
        alert("Story generated successfully");
      } else {
        throw new Error("Failed to fetch from the backend");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate story");
    }
  };

  // Trigger handleAdd when the component mounts if location.state is available
  useEffect(() => {
    handleAdd();
  }, [location]); // Dependency array includes location to re-run on state change

  const handleLike = () => {
    console.log("Like button clicked");
  };

  const handleSound = async (e) => {
    e.preventDefault();
    console.log("Sound button clicked");
    const url = "http://localhost:8000/generate_speech/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setAudioData(jsonResponse.AudioBase64); // Set the audio data state
        alert("Sound generated successfully");
      } else {
        throw new Error("Failed to fetch from the backend");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate Sound");
    }
  };

  const handleFullScreen = () => {
    console.log("FullScreen button clicked");
  };

  return (
    <div className="storypage">
      <Header />
      <div className="button-container">
        <button onClick={handleLike}>
          <img src={LikeButton} alt="Like" />
        </button>
        <button onClick={handleAdd}>
          {" "}
          {/* Correctly bound to handleAdd */}
          <img src={AddButton} alt="Add" />
        </button>
        <button onClick={handleSound}>
          <img src={SoundButton} alt="Sound" />
        </button>
        <button onClick={handleFullScreen}>
          <img src={FullscreenButton} alt="FullScreen" />
        </button>
      </div>
      <div className="story-output">
        {story && (
          <div>
            <h3>Generated Story:</h3>
            <p>{story}</p>
          </div>
        )}
      </div>
      {audioData && (
        <audio autoPlay controls src={`data:audio/mp3;base64,${audioData}`}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default StoryPage;
