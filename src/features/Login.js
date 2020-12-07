import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleLoginButton from "./components/GoogleLoginButton";
import SlideShow from "./Slideshow";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      new_username: "",
      password: "",
      new_password: "",
      confirm_password: "",
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
    if (e.target.name === "password") {
      this.setState({
        password: e.target.value,
      });
    }
    if (e.target.name === "new_password") {
      this.setState({
        new_password: e.target.value,
      });
    }
    if (e.target.name === "confirm_password") {
      this.setState({
        confirm_password: e.target.value,
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
    let data = {
      username: this.state.username,
      password: this.state.password,
    };

    let reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`http://localhost:3001/auth`, reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        console.log(user);
        if (user.message === "Success") {
          this.props.changeUser({
            username: user.username,
            id: user.id,
            notes: user.notes,
          });
        } else {
          alert(user.message);
        }
      });
  };
  handleCreate = (e) => {
    e.preventDefault();
    if (this.state.new_password !== this.state.confirm_password) {
      alert("Passwords must match!")
    } else {
    let data = {
      user: {
        username: this.state.new_username,
        password: this.state.new_password,
      },
    };
    let reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3001/users", reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        console.log(user);
        if (user.message === "Success") {
          let userSave = {
            username: user.username,
            id: user.id,
            notes: user.notes,
          };
          this.props.changeUser(userSave);
        } else {
          alert("Unable to create User");
        }
      })};
  };

  render() {
    return (
      <div className="main-title card">
        <h5 className="navbar-brand large-text">
          <a style={{ color: "rgb(189, 28, 16)" }}>Flat</a>
          <a style={{ color: "white" }}>Note</a>
        </h5>
        <h6>Notes, but flatter.</h6>
        {this.props.user.id !== null ? <Redirect push to="/notes" /> : null}
        <SlideShow
          currentImage={this.state.currentImage}
          alpha={this.state.opacity}
        />
        <div className="container">
          <div className="row">
            <div className="col login-col card">
              <h3>Login</h3>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <input
                  className="login-col"
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={(e) => this.handleChange(e)}
                ></input>
                <input
                  className="login-col"
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={(e) => this.handleChange(e)}
                ></input>
                <br></br>
                <button type="submit" name="submit" className="btn btn-primary">
                  Log In
                </button>
              </form>
            </div>
            <div className="col login-col card">
              <h3>Login with Google</h3>
              <GoogleLoginButton />
            </div>
            <div className="col login-col card">
              <h3>Sign Up</h3>
              <form onSubmit={(e) => this.handleCreate(e)}>
                <input
                  className=""
                  type="text"
                  name="new_username"
                  placeholder="new username"
                  onChange={(e) => this.handleChange(e)}
                ></input>
                <br />
                <input
                  className=""
                  type="password"
                  name="new_password"
                  placeholder="password"
                  onChange={(e) => this.handleChange(e)}
                ></input>
                <br />
                <input
                  className=""
                  type="password"
                  name="confirm_password"
                  placeholder="confirm password"
                  onChange={(e) => this.handleChange(e)}
                ></input>
                <br />
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
