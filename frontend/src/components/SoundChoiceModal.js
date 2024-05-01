// SoundChoiceModal.js
import React from 'react';
import './SoundChoiceModal.css';  // Make sure your CSS styles are defined here

const SoundChoiceModal = ({ isOpen, onClose, onVoiceSelect }) => {
    if (!isOpen) return null;

    // Helper function to map gender choice to specific voice
    const handleVoiceChoice = (gender) => {

        const voice = (gender === 'male' ? 'alloy' : 'nova');
        console.log(`Gender: ${gender}, Voice: ${voice}`);
        onVoiceSelect(voice);
    };

    return (
        <div className="modal-backdrop2">
            <div className="modal-content2">
                <h2>أختر صوت القارئ</h2>
                <button className="modal-choice" key="female" onClick={() => handleVoiceChoice('female')}>أنثى</button>
                <button className="modal-choice" key="male" onClick={() => handleVoiceChoice('male')}>ذكر</button>
                <button className="modal-close-button2" onClick={onClose}>الغاء</button>
            </div>
        </div>
    );
};

export default SoundChoiceModal;
