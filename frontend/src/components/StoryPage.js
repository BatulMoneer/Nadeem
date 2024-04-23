import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";

import LikeButton from "../addings/Group 401.png";
import AddButton from "../addings/Group 400.png";
import SoundButton from "../addings/Group 399.png";
import FullscreenButton from "../addings/Group 398.png";

const StoryPage = () => {
  const [audioData, setAudioData] = useState("");
  const [story, setStory] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Function to fetch and display the story automatically when the component loads
  useEffect(() => {
    if (!location.state) {
      console.log("No form data provided");
      return;
    }

    const { insert_prompt, name, age, gender } = location.state;
    const url = "http://localhost:8000/generate_story/";

    const fetchStory = async () => {
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
          setStory(jsonResponse);
          console.log("Story generated successfully");
        } else {
          throw new Error("Failed to fetch from the backend");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStory();
  }, [location]);

  useEffect(() => {
    // Checking if there's state provided from navigation
    if (!location.state) {
      console.log("No form data provided");
      return;
    }

    const { place, image_prompt } = location.state;
    const combinedVariable = `${place},${image_prompt}`;

    const url = `http://localhost:8000/generate-image/${encodeURIComponent(
      combinedVariable
    )}`;
    const fetchImage = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ place, image_prompt }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageSrc(imageObjectURL);
        console.log("Image fetched successfully");
        console.log("Image URL:", imageObjectURL); // Check the URL in the console
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    };

    fetchImage();
  }, [location.state]);

  // Function to navigate back to the form page
  const handleAdd = () => {
    navigate("/setpreferences"); // Adjust the path as needed
  };

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
        <audio autoPlay controls src={audioData}>
          gvv Your browser does not support the audio element.
        </audio>
      )}
      <div>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Generated from AI"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    </div>
  );
};

export default StoryPage;
