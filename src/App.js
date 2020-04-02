import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import "./App.css";

const app = new Clarifai.App({
  apiKey: "cc78d8e2640545a1968b375ebb105457"
});
// parameter for particles
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

const initialState = {
  //what user have put in input
  input: "",
  //the link that come from input
  imageUrl: "",
  box: {},
  //track where we are one the page
  route: "signin",
  // used for the navigation button sign in and register
  isSignedIn: false,
  userProfil: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  //constructor for the state
  constructor() {
    super();
    this.state = initialState;
  }

  // fetch function is better in app
  // we receive a user data from server, and we update the state
  loadUser = userData => {
    this.setState({
      userProfil: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined
      }
    });
    console.log(this.state.userProfil.email);
    console.log(this.state.userProfil.name);
    console.log(this.state.userProfil.password);
  };

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
      // when we click the button we want calculate face location whit the response we going to run the calculate faceLocation function  the fonction returnr an object in the state boix , the box is needed by the displaFaceBox
      //when we get the response , we calculateFaceLocation and the display it with displayFacebox
      .then(response => {
        // if we receive a response from Api so we hhtp put entries +
        if (response) {
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.userProfil.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(
                Object.assign(this.state.userProfil, { entries: count })
              );
            })
            .catch(console.log)
            
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      //promise
      // catch if clarifai fails
      .catch(err => {
        console.log(err);
      });
  };

  onRouteChange = route => {
    // userd for button signin , signt out and regisiter on the navigation component
    if (route === "signOut") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    } // it's for change the sign route state   state property : state value  , value is changeg by on click in the component who are linked with props
    this.setState({ route: route });
  };

  render() {
    // without destructuring i have to wire this.state.box , this.state. route etccc so
    const { isSignedIn, imageUrl, box, route } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        {/* isSignedIn is passed by pros form the state, if it's true sign out appear else register and sign in appear
    i used destructing
    */}
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {this.state.route === "home" ? (
          <div>
            <Logo />
            {/*To update the Rank with the states of the user (loaded above)*/}
            <Rank
              name={this.state.userProfil.name}
              entries={this.state.userProfil.entries}
            />{" "}
            {/*we pass onInputChange like a props and use this for link the class onInputChange property*/}
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {/*we pass ImageUrl like a props and use this for lthe input with the image for diplay it here after passed like a propr i can use image url in my component*/}{" "}
            {/*we pass Box state to our component*/}
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          // we pass props loadUser and onRouteChange
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
