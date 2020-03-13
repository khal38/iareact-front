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
  apiKey: 'cc78d8e2640545a1968b375ebb105457'
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
      input: '',
      imageUrl :""
    }
  }
  // event listener who wait for a new event from input to do an action, we pass the  onInputchange to the form on a props, is a property of the app

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonSubmit = () => {
    console.log('click')
    app.models.predict(Clarifai.COLOR_MODEL, "https://samples.clarifai.com/face-det.jpg").then(
      function (response) {
        console.log(response)
        // do something with response
      },
      function (err) {
        // there was an error
      }
    );

  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        {/*we pass onInputChange like a props and use this for link the class onInputChange property*/}
        <ImageLinkForm onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />


        <FaceRecognition />
      </div>
    );
  }
}

export default App;
