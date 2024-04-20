import React from 'react';
import '../App.css'; // Importing our custom CSS
import Header from './Header';

const HomePage = () => {
    return (
        <div className="homepage">
            <Header />
            <div className="label-container">
                <p className="label-text"> مرحبا، أنا 
                <span> نديم  </span>
                <br></br> رفيق القراءة! </p>
            </div>
            <div className="label-container2">
            <p className='lbl2'>
                لدينا قصص بمختلف التصنيفات
                </p>
                </div>
                <div className="label-container3">
                <p className='lbl3'>
                    <span className='span1'>في <span className='span2'> نديم </span></span>
                    <br></br>
                    <span className='span3'>
نسافر بخيالنا في رحلات ممتعة في
<br></br> مجرات من المرح وبآفاق العلم والأخلاق</span></p>
 </div>

        </div>
    );
};

export default HomePage;
