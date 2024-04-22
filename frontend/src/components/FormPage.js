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
          <div>
            <label className="lbl">
              اسم بطل القصة
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ادخل اسم الطفل كبطل للقصة"
              className="in-btn"
            /></div>

          <div className="select-container">
            <label className="lbl">العمر</label>
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="in-btn"
            >
              <option value="" hidden >
                اختر عمر الطفل من القائمة
              </option>
              <option value="3">ثلاث سنوات</option>
              <option value="4">اربع سنوات</option>
              <option value="5">خمس سنوات</option>
              <option value="6">ست سنوات</option>
              <option value="7">سبع سنوات</option>
              <option value="8">ثمان سنوات</option>
            </select>
          </div>



          <div>
            <label class="lbl">جنس بطل القصة</label>
            <label class="rd-btn">
              <span class="custom-radio"></span>
              بنت
              <input type="radio" name="gender" value="girl" onchange="handleChange(event)" />
            </label>
            <label class="rd-btn">
              <span class="custom-radio"></span>
              ولد
              <input type="radio" name="gender" value="ولد" onchange="handleChange(event)" />
            </label>
          </div>





          {
            // formData.gender === "boy" && 
            (
              <div className="select-container">
                <label className="lbl">
                النشاط الأساسي لبطل القصة
                </label>
                <input className="in-btn-small"
                type="text"
                name="choice"
                value={formData.choices}
                onChange={handleChange}
                placeholder="ادخل كلمة واحدة"
                />
                <label className="lbl-inln">
               نشاط اخر
               </label>
              
                <select className="select-btn"
                  name=" insert_prompt"
                  value={formData.insert_prompt}
                  onChange={handleChange}
                >
                  <option value="" hidden >اختر النشاط</option>
                  <option value="msboy study">مذاكرة</option>
                  <option value="msboy clean">تنظيف</option>
                  <option value="msboy pray">صلاة</option>
                </select>
                
              </div>
            )}

            {/* <div >
            
                <input className="in-btn-small"
                type="text"
                name="choice"
                value={formData.choices}
                onChange={handleChange}
                placeholder="ادخل كلمة واحدة"
                />
                <label className="lbl-inln">
               نشاط اخر
               </label>
                </div>
               */}

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
          )}

          <div className="select-container">
            <label className="lbl">
              اختر مكان القصة
            </label>
            <select name="place" className="select-btn" value={formData.place} onChange={handleChange}>
              <option value="">اختر مكان القصة </option>
              <option value="msgarden">حديقة</option>
              <option value="msschool">مدرسة</option>
              <option value="msmosque"> مسجد</option>
            </select>

          </div>


          

          <div>
            <label className="lbl">
              الفكرة الرئيسيه للقصة
            </label>
            <textarea
              name="insert_prompt"
              value={formData.name}
              onChange={handleChange}
              placeholder="وصف مختصر قصير عن القصة التي ترغب بإنشاءها"
              className="in-btn"
            /></div>

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
