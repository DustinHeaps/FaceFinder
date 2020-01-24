import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import './css/style.css';
import { slide as Menu } from 'react-burger-menu';
import Profile from './components/Profile/Profile';
import Leaderboard from './components/Leaderboard/Leaderboard';
import axios from 'axios';

const particlesOptions = {
  particles: {
    number: {
      value: 50,

      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  state = initialState;

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFacesLocation = data => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;

      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    });
  };

  displayFaceBoxes = boxes => {
    this.setState({ boxes });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    const resp = await axios
      .post('https://face-finder-12.herokuapp.com/imageurl', {
        input: this.state.input,
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.data);
    console.log(resp);

    const count = await axios
      .put('https://face-finder-12.herokuapp.com/image', {
        id: this.state.user.id,
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.data);

    this.setState(Object.assign(this.state.user, { entries: count }));
    this.displayFaceBoxes(this.calculateFacesLocation(resp));
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const {
      isSignedIn,
      imageUrl,
      route,
      boxes,
      user: { name, email }
    } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

        <div className="main-container">
          {this.state.route === 'home' ? (
            <section className="section-image-link">
              {/* <Logo onRouteChange={this.onRouteChange} /> */}
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </section>
          ) : this.state.route === 'profile' ? (
            <Profile name={name} email={email} onRouteChange={this.onRouteChange} />
          ) : this.state.route === 'leaderboard' ? (
            <Leaderboard />
          ) : this.state.route === 'signin' ? (
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          ) : (
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
