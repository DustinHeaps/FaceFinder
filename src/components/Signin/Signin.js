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
        .post('https://face-finder-123.herokuapp.com/signin', {
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
      // <article
      //   style={{ background: '#ecf0f1' }}
      //   className=" br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
      // >
      //   <main className="pa4 black-80">
      //     <div className="measure">
      //       <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      //         <legend className="f1 fw6 ph0 mh0">Sign In</legend>
      //         <div className="mt3">
      //           <label className="db fw6 lh-copy f6" htmlFor="email-address">
      //             Email
      //           </label>
      //           <input
      //             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
      //             type="email"
      //             name="email-address"
      //             id="email-address"
      //             onChange={this.onEmailChange}
      //           />
      //         </div>
      //         <div className="mv3">
      //           <label className="db fw6 lh-copy f6" htmlFor="password">
      //             Password
      //           </label>
      //           <input
      //             className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
      //             type="password"
      //             name="password"
      //             id="password"
      //             onChange={this.onPasswordChange}
      //           />
      //         </div>
      //       </fieldset>
      //       {errors && errors.length > 0 && <p className="errors">{errors[0].msg}</p>}

      //       <div className="">
      //         <input
      //           onClick={this.onSubmitSignin}
      //           className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
      //           type="submit"
      //           value="Sign in"
      //         />
      //       </div>
      //       <div className="lh-copy mt3">
      //         <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">
      //           Register
      //         </p>
      //       </div>
      //     </div>
      //   </main>
      // </article>
    );
  }
}

export default Signin;
