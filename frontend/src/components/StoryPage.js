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
import Loading from "../addings/Loading.png";
import Footer from "./Footer";

const StoryPage = () => {
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  //const [isImageLoading, setIsImageLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audioData, setAudioData] = useState("");
  const [story, setStory] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const storyContentRef = useRef(null); // Ref for the story content div
  const exitFullScreenRef = useRef(null);
  const isLoading = isStoryLoading;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const RatingModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <label className="lbl1">قييم االقصة</label>
          <div className="radio-buttons">
            <div className="radio-button">
              <input type="radio" id="like" name="reaction" value="like" />
              <label htmlFor="like" className="like-label"></label>
            </div>
            <div className="radio-button">
              <input
                type="radio"
                id="dislike"
                name="reaction"
                value="dislike"
              />
              <label htmlFor="dislike" className="dislike-label"></label>
            </div>
          </div>
          <div>
            <input
              name=""
              value=""
              placeholder="في حال الاستياء من القصة اكتب السبب"
              className="in-btn1"
            />
          </div>
          {/* Implement your rating logic */}

          <div className="small-btn-container">
            <button className="small-btn" onClick={onClose}>
              ارسال
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Function to fetch and display the story automatically when the component loads
  useEffect(() => {
    if (!location.state) {
      console.log("No form data provided");
      return;
    }

    const { insert_prompt, name, age, gender } = location.state;
    const url = "http://localhost:8000/generate_story/";

    const fetchStory = async () => {
      setIsStoryLoading(true);
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
      setIsStoryLoading(false);
    };

    fetchStory();
  }, [location]);

  async function query(data) {
    let response = await fetch(
      "https://api-inference.huggingface.co/models/BatulMrakkan/nadeem",
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
  }, [location.state]);

  const handleAdd = () => {
    navigate("/setpreferences"); // Adjust the path as needed
  };

  const handleLike = () => {
    console.log("Like button clicked");
    toggleModal(); // Toggle modal visibility
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
      <RatingModal isOpen={isModalOpen} onClose={toggleModal} />
      {isLoading && (
        <div className="loading-container">
          <img src={Loading} alt="Loading" className="spinner" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default StoryPage;
