import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SlideShow from "./Slideshow";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      new_username: "",
      currentImage: 0,
      opacity: 1,
    };
  }

  changeImage = () => {
    let newCurrentImage = this.state.currentImage;
    newCurrentImage += 1;
    if (newCurrentImage === 4) {
      newCurrentImage = 0;
    }
    this.setState({
      currentImage: newCurrentImage,
    });
    this.setState({
      opacity: 0,
    });
    setTimeout(() => this.incrementOpacity(), 16.66);
  };

  incrementOpacity() {
    if (this.state.opacity <= 1) {
      let newOpacity = this.state.opacity;
      this.setState({
        opacity: newOpacity + 0.02,
      });
      setTimeout(() => this.incrementOpacity(), 16.66);
    }
  }

  componentDidMount() {
    setInterval(() => this.changeImage(), 6000);
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
        if (user.length > 0) {
          this.props.changeUser(user[0]);
        } else {
          alert("This user does not exist!");
        }
      });
  };
  handleCreate = (e) => {
    e.preventDefault();
    //debugger
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
        if (user.message === "Success") {
          this.props.changeUser(user.user);
        } else {
          alert("Unable to create User");
        }
      });
  };

  render() {
    return (
      <div className="main-title card">
        {this.props.user.id !== null ? <Redirect push to="/notes" /> : null}
        <SlideShow
          currentImage={this.state.currentImage}
          alpha={this.state.opacity}
        />
        <div className="container">
          <div className="row">
            <div className="col login-col">
              Already a user?
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <input
                className="login-col"
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={(e) => this.handleChange(e)}
                ></input>
                <button type="submit" name="submit" className="btn btn-primary">
                  Log In
                </button>
              </form>
            </div>
            <div className="col login-col">
              Not a User Yet?
              <form onSubmit={(e) => this.handleCreate(e)}>
                <input
                className="login-col"
                  type="text"
                  name="new_username"
                  placeholder="new username"
                  onChange={(e) => this.handleChange(e)}
                ></input>
                <button type="submit" name="submit" className="btn btn-primary">
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
