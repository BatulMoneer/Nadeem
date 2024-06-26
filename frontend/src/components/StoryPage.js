import React, { useState, useEffect, useRef, useCallback } from "react";
import "./StoryPage.css";
import Header from "./Header";
import RatingModal from "./RatingModal";
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
import SoundChoiceModal from "./SoundChoiceModal";
import newImage from "../addings/Group 420.png";
import newText from "../addings/Group 421.png";

// Define handleSound outside of the component
const handleSound = async (
  setAudioData,
  setSelectedVoice,
  setIsSoundLoading,
  selectedVoice
) => {
  setIsSoundLoading(true);
  console.log("Sound button clicked voice ", selectedVoice);

  const url = `https://nadeem-nadeemstory-aff85867.koyeb.app/generate_speech/${selectedVoice}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      setAudioData(jsonResponse.AudioBase64);
    } else {
      throw new Error("Failed to fetch from the backend");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  setIsSoundLoading(false);
};

const StoryPage = () => {
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  const [isSoundLoading, setIsSoundLoading] = useState(false);

  const [audioData, setAudioData] = useState("");
  const [story, setStory] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const storyContentRef = useRef(null);
  const exitFullScreenRef = useRef(null);
  const isLoading = isStoryLoading || isSoundLoading;
  const [selectedVoice, setSelectedVoice] = useState("nova"); // Default voice
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isSoundRequested, setIsSoundRequested] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchStory = useCallback(async () => {
    if (!location.state) {
      console.log("No form data provided");
      return;
    }

    const { insert_prompt, name, age, gender } = location.state;
    const url = "https://nadeem-nadeemstory-aff85867.koyeb.app/generate_story/";

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
    } finally {
      setIsStoryLoading(false);
    }
  }, [location.state]);

  const fetchImage = useCallback(async () => {
    if (!location.state) {
      console.log("No form data provided");
      return;
    }

    const { gender, place, image_prompt, choices } = location.state;
    console.log("Received gender:", gender);
    console.log("Received place:", place);
    console.log("Received image_prompt:", image_prompt);
    console.log("Received choices:", choices);
    const inn = " in";
    const dd = "donig";
    const combinedVariable = `${gender}${dd}${image_prompt}${choices}${inn}${place}`;

    try {
      const imageBlob = await query({
        inputs: combinedVariable,
        random: Math.random(), // Consider removing random if "Cache-Control" is set to "no-cache"
      });
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageSrc(imageObjectURL);
      console.log("Image fetched successfully");
      console.log("Image URL:", imageObjectURL);
    } catch (error) {
      console.error("Failed to fetch image:", error);
    }
  }, [location.state]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const query = async (data) => {
    let response = await fetch(
      "https://api-inference.huggingface.co/models/BatulMrakkan/snadeem",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", // This ensures no caching
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    let result = await response.blob();
    return result;
  };

  const handleAdd = () => {
    navigate("/setpreferences"); // Adjust the path as needed
  };

  const handleLike = () => {
    console.log("Like button clicked");
    toggleModal(); // Toggle modal visibility
  };

  const handleVoiceSelect = (voice) => {
    console.log(`Voice selected: ${voice}`);
    setShowVoiceModal(false);
    setSelectedVoice(voice);
    setIsSoundRequested(true);
  };

  useEffect(() => {
    if (selectedVoice && isSoundRequested) {
      handleSound(
        setAudioData,
        setSelectedVoice,
        setIsSoundLoading,
        selectedVoice
      );
      setIsSoundRequested(false); // Reset the request flag after playing the sound
    }
<<<<<<< HEAD
  }, [selectedVoice, isSoundRequested]); // This effect runs only when selectedVoice changes

  const handleSound = async () => {
    setIsSoundLoading(true);
    console.log("Sound button clicked voice ", selectedVoice);

    const url = `https://nadeem-nadeemstory-aff85867.koyeb.app/generate_speech/${selectedVoice}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setAudioData(jsonResponse.AudioBase64);
      } else {
        throw new Error("Failed to fetch from the backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsSoundLoading(false);
  };
=======
  }, [selectedVoice, isSoundRequested]);
>>>>>>> origin/shahdNadeem

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
              <button onClick={() => setShowVoiceModal(true)}>
                <img src={SoundButton} alt="Sound" />
              </button>
              <button onClick={handleFullScreen}>
                <img src={FullscreenButton} alt="FullScreen" />
              </button>
              <div className="new-button-container">
                <button onClick={fetchStory}>
                  <img src={newText} alt="New Text" />
                </button>
                <button onClick={fetchImage}>
                  <img src={newImage} alt="" />
                </button>
              </div>
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
      <SoundChoiceModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onVoiceSelect={handleVoiceSelect}
      />
      <Footer />
    </div>
  );
};

export default StoryPage;
