import React, { Component } from 'react';
import Tilt from 'react-tilt';

class Profile extends Component {
  state = {
    currentPassword: '',
    newPassword: ''
  };

  onCurrentPasswordChange = e => {
    this.setState({ currentPassword: e.target.value });
  };

  onNewPasswordChange = e => {
    this.setState({ newPassword: e.target.value });
  };

  handleChangePassword = e => {
    e.preventDefault();
    fetch('https://face-finder-12.herokuapp.com/changepassword', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        userEmail: this.props.email,
        currentPassword: this.state.currentPassword,
        newPassword: this.state.newPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          this.props.onRouteChange('home');
        }
      })
      .catch(err => 'error changing password');
  };

  handleDeleteProfile = e => {
    e.preventDefault();
    fetch('https://face-finder-12.herokuapp.com/delete', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        userEmail: this.props.email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'account deleted') {
          this.props.onRouteChange('signout');
        }
      });
  };

  render() {
    const { name } = this.props;

    return (
      <div className="profile">
        <form className="profile-form">
          <h2>{name.toUpperCase()}</h2>
          <img alt="profilepic" src={`https://robohash.org/${name}?size=150x150`} />

          <div className="profile-form__group">
            <label className="profile-form__label">Current Password</label>
            <input type="password" className="profile-form__input" onChange={this.onCurrentPasswordChange} />
          </div>
          <div className="profile-form__group">
            <label className="profile-form__label">New Password</label>
            <input onChange={this.onNewPasswordChange} type="password" className="profile-form__input" />
          </div>
          <button onClick={this.handleChangePassword}>Change Password</button>
          <button className="profile-form__delete-btn" onClick={this.handleDeleteProfile}>
            Delete Account
          </button>
        </form>
      </div>
    );
  }
}

export default Profile;
