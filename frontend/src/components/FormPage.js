import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPage.css"; // Importing our custom CSS
import Header from "./Header";
import FormClouds from "../addings/FormClouds (2).png";
import FormStars from "../addings/FormStars.png";
import FormNadeem from "../addings/FormNadeem.png";
import Footer from "./Footer";

const FormPage = () => {
  const [formData, setFormData] = useState({
    insert_prompt: "",
    name: "",
    age: "",
    gender: "",
    choices: "",
    place: "",
    image_prompt: "",
  });

  const navigate = useNavigate();
  const [errorName, setErrorName] = useState("");
  const [errorPrompt, setErrorPrompt] = useState("");

  const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   // if (isValidArabicInput(value)){
  //   //   setError('');

  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // // }else{
  // //   setError('يرجى ملئ الحقل باللغة العربية');
  // // }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check the type of the input to decide if it needs Arabic validation
    if (name === "name" && name !== "age" && name !== "choices") {
      // Assuming 'age' and 'choices' do not require Arabic validation
      if (isValidArabicName(value)) {
        setErrorName("");
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else {
        setErrorName("يرجى ادخال الاسم باللغة العربية");
        formData.name = "";
      }
    } else {
      // For non-text inputs or text inputs that do not require Arabic validation
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrorName(""); // Clear any error as other inputs do not require Arabic validation
    }
    if (name === "insert_prompt" && name !== "age" && name !== "choices") {
      // Assuming 'age' and 'choices' do not require Arabic validation
      if (isValidArabicPrompt(value)) {
        setErrorPrompt("");
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else {
        setErrorPrompt("يرجى ادخال الوصف باللغة العربية");
        formData.insert_prompt = "";
      }
    } else {
      // For non-text inputs or text inputs that do not require Arabic validation
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrorPrompt(""); // Clear any error as other inputs do not require Arabic validation
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, newErrors } = validateForm();
    if (!isValid) {
      setErrors(newErrors);
    } else {
      navigate("/story", { state: { ...formData } }); // Spread the formData into the state object
      setErrors({});
    }
  };

  // Validation
  const isValidArabicName = (input) => {
    return !/[^ا-ي\s]/.test(input);
  };
  const isValidArabicPrompt = (input) => {
    return !/[^ا-ي\s]/.test(input);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "يرجى إدخال اسم الطفل";
    }
    if (!formData.age.trim()) {
      newErrors.age = "يرجى اختيار عمر الطفل";
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "يرجى اخيار جنس بطل القصة";
    }
    if (!formData.image_prompt.trim()) {
      newErrors.image_prompt = "يرجى اختيار النشاط الأساسي لبطل القصة";
    }
    if (!formData.place.trim()) {
      newErrors.place = "يرجى اختيار مكان القصة";
    }
    if (!formData.insert_prompt.trim()) {
      newErrors.insert_prompt = "يرجى ادخال الفكرة الرئيسية للقصة";
    }

    isValid = Object.keys(newErrors).length === 0;
    return { isValid, newErrors };
  };

  return (
    <div className="FormPage">
      <Header />
      <img src={FormClouds} alt="Clouds" className="form-clouds" />
      <div className="form-wrapper">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="lbl">اسم بطل القصة</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ادخل اسم الطفل كبطل للقصة"
                className={errorName ? "in-btn-error" : "in-btn"}
              />
            </div>
            {errorName && <div className="error-message">{errorName}</div>}
            {errors.name && <div className="error-message">{errors.name}</div>}

            <div className="select-container">
              <label className="lbl">العمر</label>
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="in-btn"
              >
                <option value="" hidden className="placeholder-class">
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
            {errors.age && <div className="error-message">{errors.age}</div>}

            <div>
              <label class="lbl">جنس بطل القصة</label>
              <label class="rd-btn">
                بنت
                <input
                  checked
                  type="radio"
                  name="gender"
                  value="بنت"
                  onChange={handleChange}
                  class="real-radio-btn"
                />
                <span class="custom-radio"></span>
              </label>
              <label class="rd-btn">
                ولد
                <input
                  type="radio"
                  name="gender"
                  value="ولد"
                  onChange={handleChange}
                  class="real-radio-btn"
                />
                <span class="custom-radio"></span>
              </label>
            </div>

            {errors.gender && (
              <div className="error-message">{errors.gender}</div>
            )}

            <div className="select-container">
              <label className="lbl">النشاط الأساسي لبطل القصة</label>
            </div>
            {formData.gender === "ولد" && (
              <div className="select-container">
                <select
                  className="select-btn"
                  name="image_prompt"
                  value={formData.image_prompt}
                  onChange={handleChange}
                >
                  <option value="" className="placeholder-class" hidden>
                    اختر النشاط
                  </option>
                  <option value="msboystudy">مذاكرة</option>
                  <option value="msboyclean">تنظيف</option>
                  <option value="msboypray">صلاة</option>
                  <option value="">نشاط اخر</option>
                </select>
              </div>
            )}

            {formData.gender === "بنت" && (
              <div className="select-container">
                <select
                  name="image_prompt"
                  className="select-btn"
                  value={formData.image_prompt}
                  onChange={handleChange}
                >
                  <option value="" hidden className="placeholder-class">
                    اختر النشاط
                  </option>
                  <option value="msgirlhijabistudy">مذاكرة</option>
                  <option value="msgirlhijabiwalk">مشي</option>
                  <option value="msgirlhijabicook">طبخ</option>
                  <option value="msgirlhijabiclean">تنظف</option>
                  <option value="msgirlhijabishop">تسوق</option>
                  <option value="msgirlhijabipray">صلاة</option>
                  <option value="">نشاط اخر</option>
                </select>
              </div>
            )}
            {errors.image_prompt && (
              <div className="error-message">{errors.image_prompt}</div>
            )}

            <input
              className="in-btn-small"
              type="text"
              name="choices"
              value={formData.choices}
              onChange={handleChange}
              placeholder="ادخل كلمة واحدة"
            />
            <label className="lbl-inln ">نشاط اخر</label>

            <div className="select-container">
              <label className="lbl"> مكان القصة</label>
              <select
                name="place"
                className="select-btn"
                value={formData.place}
                onChange={handleChange}
              >
                <option value="" hidden className="placeholder-class">
                  اختر مكان القصة{" "}
                </option>
                <option value="msgarden">حديقة</option>
                <option value="msschool">مدرسة</option>
                <option value="msmosque"> مسجد</option>
              </select>
            </div>
            {errors.place && (
              <div className="error-message">{errors.place}</div>
            )}
            <div>
              <label className="lbl">الفكرة الرئيسيه للقصة</label>
              <textarea
                name="insert_prompt"
                value={formData.insert_prompt}
                onChange={handleChange}
                placeholder="وصف مختصر قصير عن القصة التي ترغب بإنشائها"
                className="in-btn"
              />
            </div>
            {errorPrompt && <div className="error-message">{errorPrompt}</div>}
            {errors.insert_prompt && (
              <div className="error-message">{errors.insert_prompt}</div>
            )}

            <div className="btn-container">
              <button className="btn" type="submit">
                اكتب لي قصة
              </button>
            </div>
          </form>
        </div>
        <img src={FormNadeem} alt="Nadeem" className="form-nadeem" />
        <div class="nadeem-speech">
          <text class="nadeem-text">
            <span>مرحبًا مرة أخرى، ساعدني في</span>{" "}
            <span className="dif-txy">تعبئة البيانات</span>{" "}
            <span>التالية لأتمكن من إنشاء قصة تثير إعجابك</span>
          </text>
        </div>
      </div>
      <img src={FormStars} alt="Stars" className="form-stars" />
      <Footer />
    </div>
  );
};

export default FormPage;
