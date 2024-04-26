import React, { useState, useEffect, useRef } from "react";
import "./StoryPage.css";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";

import LikeButton from "../addings/Group 401.png";
import AddButton from "../addings/Group 400.png";
import SoundButton from "../addings/Group 399.png";
import FullscreenButton from "../addings/Group 398.png";
import StoryBook from "../addings/StoryBook.png";
import StoryClouds from "../addings/StoryClouds.png";
import StoryFrame from "../addings/StoryFrame.png";
import ExitFullScreen from "../addings/ExitFullScreen.png";

const StoryPage = () => {
  const [audioData, setAudioData] = useState("");
  const [story, setStory] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const storyContentRef = useRef(null); // Ref for the story content div
  const exitFullScreenRef = useRef(null);

  // Function to fetch and display the story automatically when the component loads
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

  async function query(data) {
    let response = await fetch(
      "https://api-inference.huggingface.co/models/BatulMrakkan/snadeem",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", // Prevent caching
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    let result = await response.blob();

    return result;
  }

  useEffect(() => {
    // Checking if there's state provided from navigation
    if (!location.state) {
      console.log("No form data provided");
      return;
    }

    const { place, image_prompt } = location.state;
    const combinedVariable = `${place},${image_prompt}`;

    const fetchImage = async () => {
      try {
        const imageBlob = await query({ inputs: combinedVariable });
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageSrc(imageObjectURL);
        console.log("Image fetched successfully");
        console.log("Image URL:", imageObjectURL); // Check the URL in the console
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    };

    fetchImage();
  }, [location]);

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
      } else {
        throw new Error("Failed to fetch from the backend");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate Sound");
    }
  };

  const handleFullScreen = () => {
    if (storyContentRef.current) {
      const element = storyContentRef.current;
      const isFullscreen = document.fullscreenElement;

      const onFullScreenChange = () => {
        if (document.fullscreenElement) {
          element.classList.add("full-screen-active");
          console.log("Entering full-screen mode...");
        } else {
          element.classList.remove("full-screen-active");
          console.log("Exiting full-screen mode...");
        }
      };

      document.addEventListener("fullscreenchange", onFullScreenChange);

      if (!isFullscreen) {
        if (element.requestFullscreen) {
          element.requestFullscreen().catch((err) => {
            console.error(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  const handleExitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="storypage">
      <Header />
      <div className="story-bigframe">
        <img src={StoryClouds} alt="Clouds" className="story-clouds" />
        <div className="story-section">
          <img src={StoryFrame} alt="Frame" className="story-frame" />
          <div className="story-content" ref={storyContentRef}>
            <div>
              <img src={StoryBook} alt="Book" className="story-book" />
              <div className="left-page">
                {/* Story text output */}
                <div className="story-output">
                  {story && (
                    <div>
                      <p>{story}</p>
                    </div>
                  )}
                  {audioData && (
                    <audio autoPlay src={audioData} className="audio">
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </div>
              <div className="right-page">
                {/* Story image output */}
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Generated from AI"
                    className="story-image"
                  />
                ) : (
                  <p></p>
                )}
              </div>
            </div>
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
            <button
              ref={exitFullScreenRef}
              className="exit-fullscreen-button"
              onClick={handleExitFullScreen}
            >
              <img src={ExitFullScreen} alt="Exit full-screen" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
