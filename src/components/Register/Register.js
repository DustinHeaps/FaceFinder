import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    isErr: false
  };

  onNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  onEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };
  onPasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  onSubmitSignin = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    });
    try {
      const user = await axios
        .post('https://face-finder-12.herokuapp.com/register', body, config)
        .then(res => res.data);
      // if (user.id) {
      this.props.loadUser(user);
      this.props.onRouteChange('home');
      // }
    } catch (err) {
      this.setState({ errors: err.response.data.errors });
    }
  };

  render() {
    const { onRouteChange } = this.props;
    const { errors } = this.state;
    return (
      <section className="section-form">
        <form className="signin-form">
          <h2>Register</h2>
          <div className="signin-form__group">
            <label className="signin-form__label">Name</label>
            <input type="text" className="signin-form__input" name="name" id="name" onChange={this.onNameChange} />
          </div>
          <div className="signin-form__group">
            <label className="signin-form__label">Email</label>
            <input
              type="email"
              className="signin-form__input"
              name="email-address"
              id="email-address"
              onChange={this.onEmailChange}
            />
          </div>
          <div className="signin-form__group">
            <label className="signin-form__label">Password</label>
            <input
              type="password"
              className="signin-form__input"
              name="password"
              id="password"
              onChange={this.onPasswordChange}
            />
          </div>
          {errors && errors.length > 0 && <p className="errors">{errors[0].msg}</p>}
          <button className="signin-form__button" onClick={this.onSubmitSignin}>
            Register
          </button>
        </form>
      </section>
    );
  }
}

export default Register;
