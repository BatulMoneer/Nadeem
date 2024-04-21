// FormPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const [formData, setFormData] = useState({
    insert_prompt: "",
    name: "",
    age: "",
    gender: "",
    choices: "",
    prompt: "",
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
        <label>
          Story prompt:
          <input
            name="insert_prompt"
            value={formData.insert_prompt}
            onChange={handleChange}
            placeholder="Story prompt"
          />
        </label>
        <label>
          Your name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>
        <br />
        <label>
          <select name="Age" value={formData.age} onChange={handleChange}>
            <option value="">ادخل عمر الطفل من القائمة</option>
            <option value="3">٣ سنوات</option>
            <option value="4">٤ سنوات</option>
            <option value="5">٥ سنوات</option>
            <option value="6">٦ سنوات</option>
            <option value="7">٧ سنوات</option>
            <option value="8">٨ سنوات</option>
          </select>
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="msboy"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          ولد
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="msgirl hijabi"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          بنت
        </label>
        <br />
        <label>
          فعل اخر
          <input
            type="text"
            name="choice"
            value={formData.choices}
            onChange={handleChange}
            placeholder="ادخل كلمة واحدة تعبر عن الفعل المطلوب"
          />
        </label>{" "}
        <br />
        <label>
          اختر موضوع القصة
          <select name="prompt" value={formData.prompt} onChange={handleChange}>
            <option value="">اختر موضوع القصة </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
