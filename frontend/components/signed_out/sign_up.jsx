import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" , errors: []};
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestSignIn = this.guestSignIn.bind(this);
  }


  update(type) {
    let self = this;
    return function(event) {
      let value;
      if (type === "password") {
        self.setState({ [type]: event.currentTarget.value , passwordView: "password"});
      } else {
        self.setState({ [type]: event.currentTarget.value });
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearErrors();
    this.props.signup(this.state).fail(() => { this.setState({ errors: this.props.errors }); });
  }

  componentWillReceiveProps() {
    if (this.props.errors.length < 1) {
      this.setState({ errors: []});
    }
  }

  guestSignIn() {
    const user = {
      username: "avital",
      password: "magichat12"
    };
    this.props.signin(user);
  }

  render() {
    let errorsList = "";
    if (this.state.errors.length > 0) {
      let errors = this.state.errors.map((error, index) => {
        return (<li key={index}>{error}</li>);
      });
      errorsList = (<ul className="sign-up-errors">{errors}</ul>);
    }

    return(
      <div className="sign-up">

        <section className="big-text">
          Meet your next favorite book.
        </section>

        <section className="sign-up">
          <h2>New here? Create a free account!</h2>

          {errorsList}

          <form className="signup" onSubmit={this.handleSubmit}>
            <input placeholder="Username" type="text" value={this.state.username} onChange={this.update("username")}/>

            <input placeholder="Password" type={this.state.passwordView} value={this.state.password} onChange={this.update("password")}/>
            <br/>
            <button className="big-gold">Sign up</button>
          </form>
          <button className="big-gold guest" onClick={this.guestSignIn} >Guest</button>
        </section>

      </div>
    );
  }
}