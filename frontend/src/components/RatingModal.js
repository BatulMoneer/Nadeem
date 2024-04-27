import React, { useState } from "react";
import { db } from "../firebaseConfig"; // Adjust the path as necessary
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const RatingModal = ({ isOpen, onClose }) => {
  const [feedbackText, setFeedbackText] = useState("");

  const sendFeedback = async () => {
    try {
      // Add a new document to the "feedback" collection with the feedback text
      await addDoc(collection(db, "feedback"), {
        text: feedbackText,
        timestamp: serverTimestamp(), // Add a timestamp field
      });

      console.log("Feedback sent successfully!");
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  return (
    <div
      className="modal-backdrop"
      style={{ display: isOpen ? "block" : "none" }}
    >
      {" "}
      {/* Conditional rendering based on isOpen */}
      <div className="modal-content">
        <label className="lbl1">قييم القصة</label>
        <div className="radio-buttons">
          <div className="radio-button">
            <input type="radio" id="like" name="reaction" value="like" />
            <label htmlFor="like" className="like-label"></label>
          </div>
          <div className="radio-button">
            <input type="radio" id="dislike" name="reaction" value="dislike" />
            <label htmlFor="dislike" className="dislike-label"></label>
          </div>
        </div>
        <input
          type="text"
          name="feedback"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="في حال الاستياء من القصة اكتب السبب"
          className="in-btn1"
        />
        <div className="small-btn-container">
          <button className="small-btn" onClick={sendFeedback}>
            ارسال
          </button>
          <button className="small-btn" onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
