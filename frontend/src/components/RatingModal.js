import React, { useState } from "react";
import { db } from "../firebase"; // Adjust the path to your Firebase config file as necessary
import { collection, addDoc } from "firebase/firestore";

const RatingModal = ({ isOpen, onClose }) => {
  const [reaction, setReaction] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleReactionChange = (event) => {
    setReaction(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    if (!reaction) {
      alert("Please select a reaction.");
      return;
    }
    if (reaction === "dislike" && !feedback) {
      alert("Please provide feedback for your dislike.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "feedback"), {
        reaction: reaction,
        feedback: feedback,
        timestamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to store data. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <label className="lbl1">قييم القصة</label>
        <div className="radio-buttons">
          <div className="radio-button">
            <input
              type="radio"
              id="like"
              name="reaction"
              value="like"
              onChange={handleReactionChange}
            />
            <label htmlFor="like" className="like-label"></label>
          </div>
          <div className="radio-button">
            <input
              type="radio"
              id="dislike"
              name="reaction"
              value="dislike"
              onChange={handleReactionChange}
            />
            <label htmlFor="dislike" className="dislike-label"></label>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="في حال الاستياء من القصة اكتب السبب"
            className="in-btn1"
          />
        </div>
        <div className="small-btn-container">
          <button className="small-btn" onClick={handleSubmit}>
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
