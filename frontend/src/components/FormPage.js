// FormPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../form1.css'; // Importing our custom CSS


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
    <div class= "FormPage">
      <div class="form-container">
      <form onSubmit={handleSubmit}>
        <div class="label-container">

        <label class="lbl">اسم بطل القصة</label>
        
      <input
          class="in-btn"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="حدد اسم بطل القصة"
        />
        </div>

        <div class="label-container">
        <label class="lbl">العمر</label>

        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="اختر عمر الطفل من القائمة"
          type="number"
          class="in-btn"
        /></div>

        <div class="label-container">
        <label class="lbl">جنس بطل القصة</label>
        <select class="in-btn" name="gender" value={formData.gender} onChange={handleChange}>
          <option class="in-btn" value="">اختر الجنس</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select></div>
        
        <div class="label-container">
        <label class="lbl">الفكرة الرئيسية للقصة</label>
        <textarea class="in-btn"
          name="insert_prompt"
          value={formData.insert_prompt}
          onChange={handleChange}
          placeholder="وصف مختصر قصير عن القصة التي ترغب بإنشاءها"
        /></div>
        <div class="btn-container">
        <button class="btn" type="submit">اكتب لي قصة</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default FormPage;
