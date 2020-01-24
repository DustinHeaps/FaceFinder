import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
  state = {
    signInEmail: '',
    signInPassword: '',
    errors: ''
  };

  onEmailChange = e => {
    this.setState({
      signInEmail: e.target.value
    });
  };

  onPasswordChange = e => {
    this.setState({
      signInPassword: e.target.value
    });
  };

  onSubmitSignin = async e => {
    e.preventDefault();
    try {
      const user = await axios
        .post('https://face-finder-12.herokuapp.com/signin', {
          email: this.state.signInEmail,
          password: this.state.signInPassword,

          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.data);

      this.props.loadUser(user);
      this.props.onRouteChange('home');
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
          <h2>Sign In</h2>
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
            Sign In
          </button>
          <p onClick={() => onRouteChange('register')} className="signin-form__register-link">
            Register
          </p>
        </form>
      </section>
    );
  }
}

export default Signin;
