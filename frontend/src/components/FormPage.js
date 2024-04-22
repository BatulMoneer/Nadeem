import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../form1.css"; // Importing our custom CSS

const FormPage = () => {
  const [formData, setFormData] = useState({
    insert_prompt: "",
    name: "",
    age: "",
    gender: "",
    choices: "",
    place: "",
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
    <div className="FormPage">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label className="lbl">
            اسم الطفل
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="in-btn"
            />
          </label>
          <label className="lbl">
            القصة
            <input
              name="insert_prompt"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="in-btn"
            />
          </label>
          <br />
          <label className="lbl">
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="in-btn"
            >
              {/* <option value="">ادخل عمر الطفل من القائمة</option> */}
              <option value="3">٣ سنوات</option>
              <option value="4">٤ سنوات</option>
              <option value="5">٥ سنوات</option>
              <option value="6">٦ سنوات</option>
              <option value="7">٧ سنوات</option>
              <option value="8">٨ سنوات</option>
            </select>
          </label>
          <label className="lbl">
            <input
              type="radio"
              name="gender"
              value="ولد"
              // checked={formData.gender === "boy"}
              onChange={handleChange}
            />
            ولد
          </label>
          <label className="lbl">
            <input
              type="radio"
              name="gender"
              value="girl"
              // checked={formData.gender === "girl"}
              onChange={handleChange}
            />
            بنت
          </label>
          <br />

          <br />
          {/* {formData.gender === "boy" && (
            <label className="lbl">
              اختر موضوع القصة
              <select
                name=" insert_prompt"
                value={formData.insert_prompt}
                onChange={handleChange}
              >
                <option value="">اختر موضوع القصة</option>
                <option value="msboy study">مذاكرة</option>
                <option value="msboy clean">ينظف</option>
                <option value="msboy pray">يصلي</option>
              </select>
            </label>
          )} */}
          {/* 
          {formData.gender === "msgirl hijabi" && (
            <label className="lbl">
              اختر موضوع القصة للبنت
              <select
                name=" insert_prompt"
                value={formData.insert_prompt}
                onChange={handleChange}
              >
                <option value="">اختر موضوع القصة</option>
                <option value="msgirl hijabi study">مذاكرة</option>
                <option value="msgirl hijabi walk">تمشي</option>
                <option value="msgirl hijabi cook">تطبخ</option>
                <option value="msgirl hijabi clean">تنظف</option>
                <option value="msgirl hijabi shop">تتسوق</option>
                <option value="msgirl hijabi pray">تصلي</option>
              </select>
            </label>
          )} */}

          <br />
          <label className="lbl">
            اختر مكان القصة
            <select name="place" value={formData.place} onChange={handleChange}>
              <option value="">اختر مكان القصة </option>
              <option value="msgarden">حديقة</option>
              <option value="msschool">مدرسة</option>
              <option value="msmosque"> مسجد</option>
            </select>
          </label>
          {/* 
          <label className="lbl">
            فعل اخر
            <input
              type="text"
              name="choice"
              value={formData.choices}
              onChange={handleChange}
              placeholder="ادخل كلمة واحدة تعبر عن الفعل المطلوب"
            />
          </label> */}

          <div className="btn-container">
            <button className="btn" type="submit">
              اكتب لي قصة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
