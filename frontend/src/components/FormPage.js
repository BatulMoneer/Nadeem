import React, { useState, useEffect, useRef } from "react";
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
    gender: "msgirlhijabi",
    choices: "",
    place: "",
    image_prompt: "",
  });
  const navigate = useNavigate();
  const [errorName, setErrorName] = useState("");
  const [errorPrompt, setErrorPrompt] = useState("");
  const [readyToNavigate, setReadyToNavigate] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && name !== "age" && name !== "choices") {
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
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrorName("");
    }
    if (name === "insert_prompt" && name !== "age" && name !== "choices") {
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
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrorPrompt("");
    }
  };

  const translateChoices = async () => {
    const apiUrl =
      "https://nadeem-nadeemstory-aff85867.koyeb.app/translate_word/";
    const payload = { arabic_word: formData.choices }; // Change 'text' to 'arabic_word'

    console.log("Sending payload for translation:", JSON.stringify(payload));

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error(
          "API responded with an error:",
          JSON.stringify(errorBody)
        );
        throw new Error(
          `HTTP error! status: ${response.status}, Details: ${JSON.stringify(
            errorBody.detail
          )}`
        );
      }

      const result = await response.json();
      console.log("Translation result:", result.translation);

      setFormData((prevState) => ({
        ...prevState,
        choices: result.translation, // Assuming response key is 'translation'
      }));

      return true;
    } catch (error) {
      console.error("Error translating choices:", error.message);
      return false;
    }
  };
  const translateChoices = async () => {
    const apiUrl =
      "https://nadeem-nadeemstory-aff85867.koyeb.app/translate_word/";
    const payload = { arabic_word: formData.choices };

    console.log("Sending payload for translation:", JSON.stringify(payload));

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error(
          "API responded with an error:",
          JSON.stringify(errorBody)
        );
        throw new Error(
          `HTTP error! status: ${response.status}, Details: ${JSON.stringify(
            errorBody.detail
          )}`
        );
      }

      const result = await response.json();
      console.log("API Translation result:", result);
      console.log("Translation result:", result.translation);

      if (result.translation) {
        return new Promise((resolve) => {
          setFormData((prevState) => {
            const updatedState = { ...prevState, choices: result.translation };
            console.log(
              "State updated with English translation:",
              updatedState.choices
            );
            resolve(true);
            return updatedState;
          });
        });
      } else {
        console.error("No translation found in the response");
        return false;
      }
    } catch (error) {
      console.error("Error translating choices:", error.message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, newErrors } = validateForm();
    if (!isValid) {
      setErrors(newErrors);
      return;
<<<<<<< HEAD
    }

    if (formData.choices) {
      const translationSuccess = await translateChoices();
      if (!translationSuccess) {
        setErrors({ ...errors, choices: "Failed to translate choices" });
        return;
      } else {
        setReadyToNavigate(true);
      }
    } else {
      setReadyToNavigate(true);
=======
>>>>>>> origin/shahdNadeem
    }

    // Translate choices before navigating
    if (formData.choices) {
      const translationSuccess = await translateChoices();
      if (!translationSuccess) {
        setErrors({ ...errors, choices: "Failed to translate choices" });
        return; // Stop submission if translation fails
      }
    }

    navigate("/story", { state: { ...formData } });
  };

<<<<<<< HEAD
  useEffect(() => {
    if (readyToNavigate) {
      console.log("Navigating with updated formData:", formData);
      navigate("/story", { state: { ...formData } });
      setReadyToNavigate(false);
    }
  }, [readyToNavigate, formData, navigate]);

  // Further component code...
=======
>>>>>>> origin/shahdNadeem
  const isValidArabicName = (input) => {
    return !/[^ا-ي\s]/.test(input);
  };
  const isValidArabicPrompt = (input) => {
    return !/[^ا-ي\s]/.test(input);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

<<<<<<< HEAD
    if (!formData.name.trim()) newErrors.name = "يرجى إدخال اسم الطفل";
    if (!formData.age.trim()) newErrors.age = "يرجى اختيار عمر الطفل";
    if (!formData.gender.trim()) newErrors.gender = "يرجى اخيار جنس بطل القصة";
    if (!formData.place.trim()) newErrors.place = "يرجى اختيار مكان القصة";
    if (!formData.insert_prompt.trim())
=======
    if (!formData.name.trim()) {
      newErrors.name = "يرجى إدخال اسم الطفل";
    }
    if (!formData.age.trim()) {
      newErrors.age = "يرجى اختيار عمر الطفل";
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "يرجى اخيار جنس بطل القصة";
    }
    // if (!formData.image_prompt.trim()) {
    //   newErrors.image_prompt = "يرجى اختيار النشاط الأساسي لبطل القصة";
    // }
    if (!formData.place.trim()) {
      newErrors.place = "يرجى اختيار مكان القصة";
    }
    if (!formData.insert_prompt.trim()) {
>>>>>>> origin/shahdNadeem
      newErrors.insert_prompt = "يرجى ادخال الفكرة الرئيسية للقصة";

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
              <label className="lbl">جنس بطل القصة</label>
              <label className="rd-btn">
                بنت
                <input
                  type="radio"
                  name="gender"
                  value="msgirlhijabi"
                  onChange={handleChange}
                  className="real-radio-btn"
                />
                <span className="custom-radio"></span>
              </label>
              <label className="rd-btn">
                ولد
                <input
                  type="radio"
                  name="gender"
                  value="msboy"
                  onChange={handleChange}
                  className="real-radio-btn"
                />
                <span className="custom-radio"></span>
              </label>
            </div>

            {errors.gender && (
              <div className="error-message">{errors.gender}</div>
            )}

            <div className="select-container">
              <label className="lbl">النشاط الأساسي لبطل القصة</label>
            </div>
            {formData.gender === "msboy" && (
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
                  <option value="msboystudy">يذاكر</option>
                  <option value="msboyclean">ينظف</option>
                  <option value="msboypray">يصلي</option>
                  <option value="">نشاط اخر</option>
                </select>
              </div>
            )}

            {formData.gender === "msgirlhijabi" && (
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
                  <option value="msgirlhijabistudy">تذاكر</option>
                  <option value="msgirlhijabiwalk">تمشي</option>
                  <option value="msgirlhijabicook">تطبخ</option>
                  <option value="msgirlhijabiclean">تنظف</option>
                  <option value="msgirlhijabishop">تتسوق</option>
                  <option value="msgirlhijabipray">تصلي</option>
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
            <label className="lbl-inln">نشاط اخر</label>

            <div className="select-container">
              <label className="lbl"> مكان القصة</label>
              <select
                name="place"
                className="select-btn"
                value={formData.place}
                onChange={handleChange}
              >
                <option value="" hidden className="placeholder-class">
                  اختر مكان القصة
                </option>
                <option value="msgarden">حديقة</option>
                <option value="msschool">مدرسة</option>
                <option value="msmosque"> مسجد</option>
                <option value="home">منزل</option>
                <option value="shop">سوق</option>
                <option value="kitchen">مطبخ</option>
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
        <div className="nadeem-speech">
          <p className="nadeem-text">
            <span>مرحبًا مرة أخرى، ساعدني في</span>{" "}
            <span className="dif-txy">تعبئة البيانات</span>{" "}
            <span>التالية لأتمكن من إنشاء قصة تثير إعجابك</span>
          </p>
        </div>
      </div>
      <img src={FormStars} alt="Stars" className="form-stars" />
      <Footer />
    </div>
  );
};

export default FormPage;
