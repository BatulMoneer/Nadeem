// FormPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const [formData, setFormData] = useState({
    insert_prompt: "",
    name: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/story", { state: { ...formData } }); // Spread the formData into the state object
  };

  return (
    <div>
      <h1>Enter Story Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="insert_prompt"
          value={formData.insert_prompt}
          onChange={handleChange}
          placeholder="Story prompt"
        />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Your age"
          type="number"
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
