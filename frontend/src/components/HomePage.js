import React from "react";
import "../App.css"; // Importing our custom CSS
import Header from "./Header";
import rectangle1 from "../addings/Group 2.png";
import rectangle2 from "../addings/Group 7.png";
import rectangle3 from "../addings/Rectangle 5.png";
import rectangle4 from "../addings/Rectangle 6.png";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />

      <div className="label-container">
        <p className="label-text">
          {" "}
          مرحبا، أنا
          <span> نديم </span>
          <br></br> رفيق القراءة!{" "}
        </p>
      </div>

      <div className="label-container2">
        <p className="lbl2">لدينا قصص بمختلف التصنيفات</p>

        <div className="image-wrapper">
          <img src={rectangle1} alt="التعليم" />
          <div className="hover-label">التعليم</div>
        </div>
        <div className="image-wrapper">
          <img src={rectangle2} alt="عمل جماعي" />
          <div className="hover-label">عمل جماعي</div>
        </div>
        <div className="image-wrapper">
          <img src={rectangle3} alt="الصلاة" />
          <div className="hover-label">الصلاة</div>
        </div>
        <div className="image-wrapper">
          <img src={rectangle4} alt="النظافة" />
          <div className="hover-label">النظافة</div>
        </div>
      </div>

      <div className="label-container3">
        <p className="lbl3">
          <span className="span1">
            في <span className="span2"> نديم </span>
          </span>
          <br></br>
          <span className="span3">
            نسافر بخيالنا في رحلات ممتعة في
            <br></br> مجرات من المرح وبآفاق العلم والأخلاق
          </span>
        </p>
      </div>

      <div className="label-container4">
        <p className="lbl4">
          باستخدام تقنيات
          <span> الذكاء الاصطناعي </span>
          <br></br>نمكنك من إنشاء قصص مشوقة ومليئة بالمغامرات الممتعة!
        </p>
        <p className="lbl5">
          قصص عربية مدعومة بصور تفاعلية وصوت للقراءة لنخوض تجربة تعليمية متكاملة{" "}
        </p>
      </div>

      <div className="custom-button-container">
        <button className="custom-button">اكتب لي قصة</button>
      </div>
    </div>
  );
};

export default HomePage;
