import React from "react";

// we receive image url for App.js state
const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma">
      <div className ="absolute mt2">
        {/*we pass ImgUrl*/}
        <img id='inputimage' alt="" src={imageUrl} width="500px" height="auto"/>
      </div>
    </div>
  );
};

export default FaceRecognition;
