import React from "react";
import "../App.css"; // Importing our custom CSS
import "../HomePage.css";
import Header from "./Header";
import rectangle1 from "../addings/Group 2.png";
import rectangle2 from "../addings/Group 7.png";
import rectangle3 from "../addings/Rectangle 5.png";
import rectangle4 from "../addings/Rectangle 6.png";
import FirstFrame from "../addings/HomeFirstFrame.png";
import FirstStars from "../addings/HomeUpStars.png";
import Nadeem from "../addings/HomeNadeem.png";
import cloud from "../addings/HomeClouds.png";
import bubble from "../addings/HomeNadeemBubble.png"
import SecFrame from "../addings/HomeSecondFrame.png"
import ThirdFrame from "../addings/HomeThirdFrame.png"
import scoop from "../addings/HomeScoop.png"
import last from "../addings/HomeFourthFrame.png"
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="homepage">
            <div className="Hader"></div>
            <Header/>
         <div className="first">
         <img src={FirstStars} alt="first" className='firststars' />
         <img src={FirstFrame} alt="first" className='firstframe' />
         <img src={Nadeem} alt="first" className='Nadeem'/>
         <img src={cloud} alt="first" className='cloud'/>
         <img src={bubble} alt="first" className='bubble'/>
         <p className="label-text">
               
               مرحبا، أنا
               <span> نديم </span>
               <br></br> رفيق القراءة!  
           </p>

         </div>

         <div className="Second">
         <img src={SecFrame} alt="first" className='SecFrame' />
         <p className="lbl2">لدينا قصص بمختلف التصنيفات</p>
         <img src={ThirdFrame} alt="first" className='ThirdFrame' />
         <img src={scoop} alt="first" className='scop' />
         <div className="label-container3">
                <p className="lbl3">
                    <span className="span1">
                        في <span className="span2"> 
                        نديم </span>
                    </span>
                    <br></br>
                    <span className="span3">
                    <br></br>
                        نسافر بخيالنا في رحلات ممتعة في
                        <br></br> مجرات من المرح وبآفاق العلم والأخلاق
                    </span>
                </p>
            </div>
         </div>
             <div className="last">
         <img src={last} alt="first" className='lastpic' />
         </div>
          
        </div>
    );
};

export default HomePage;
