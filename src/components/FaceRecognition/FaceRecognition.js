import React from "react";
import "./FaceRecognition.css";

// we receive image url and box from App.js state
const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className="center ma">
      <div className ="absolute mt2">
        {/*we pass ImgUrl*/}
        <img id='inputimage' alt="" src={imageUrl} width="500px" height="auto"/>
        <div className="bounding-box" style={{top:box.topRow, right:box.rightCol,bottom :box.bottomRow, left:box.leftCol}}></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
