import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "cc78d8e2640545a1968b375ebb105457"
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  //constructor for the state
  constructor() {
    super();
    this.state = {
      //what user have put in input
      input: "",
      //the link that come from input
      imageUrl: "",
      box: {}
    };
  }
  // this function receive data, base on the response
  calculateFaceLocation = data => {
    console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    // we are returning an object that will fil the box object in the state, thw returned objet will figureout all the four dot arround the face
    return {
      //the pourcentage of the width  * width
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };
  // filup the box withe the value of calculateFaceLocation
  displayFaceBox = box => {
    console.log(box);
    this.setState({ box: box });
  };

  // event listener who wait for a new event from input to do an action, we pass the onInputchange to the form on a props, is a property of the app
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  //imageUrl get display on FaceRecognition component when we click on submti
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    console.log("click");
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      //get a response (bunding box)
      // when we click the button we want calculate face location whit the response we going to run the calculate faceLocation function
      // the fonction returnr an object in the state boix , the box is needed by the displaFaceBox
      //when we get the response , we calculateFaceLocation and the display it with displayFacebox
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
          //promise
          .catch(err => {
            console.log(err);
          })
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        {/*we pass onInputChange like a props and use this for link the class onInputChange property*/}
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {/*we pass ImageUrl like a props and use this for lthe input with the image for diplay it here
                ater passed like a propr i can use image url in my component*/}

         {/*we pass Box state to our component*/}
        <FaceRecognition box ={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
