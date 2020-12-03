import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      new_username: "",
    };
  }
  handleChange = (e) => {
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value,
      });
    }
    if (e.target.name === "new_username") {
      this.setState({
        new_username: e.target.value,
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/users/${this.state.username}`)
      .then((resp) => resp.json())
      .then((user) => {
          //debugger
        console.log(user[0]);
        this.props.changeUser(user[0]);
      });
  };
  handleCreate = (e) => {
    e.preventDefault();
    let data = { user: { username: this.state.new_username } };
    let reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/users", reqObj)
      .then((resp) => resp.json())
      .then((user) => {
          debugger
        this.props.changeUser(user);
      });
  };

  render() {
    return (
      <div className="main-title">
        {this.props.user.id !== null ? <Redirect push to="/notes" /> : null}
        <h2>Welcome to FlatNotes!</h2>
        <div className="container login">
          <div>
            <div className="login-row">
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={(e) => this.handleChange(e)}
                ></input>
                <button type="submit" name="submit">
                  Log In
                </button>
              </form>
            </div>
          </div>
          <div>
            <div className="login-row">Not a User Yet?</div>
          </div>
          <div>
            <div className="login-row">
              <form onSubmit={(e) => this.handleCreate(e)}>
                <input
                  type="text"
                  name="new_username"
                  placeholder="new username"
                  onChange={(e) => this.handleChange(e)}
                ></input>
                <button type="submit" name="submit">
                  Create User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUser: (user) => dispatch({ type: "CHANGE_USER", user: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
