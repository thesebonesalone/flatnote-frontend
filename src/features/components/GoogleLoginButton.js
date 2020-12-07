import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";

const clientId =
  "552961180821-vlrabsqtdobcoqmf3q3vg84j8pbc3692.apps.googleusercontent.com";

class GoogleLoginButton extends Component {
  onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
    let data = {
      user: {
        username: res.profileObj.email.split("@")[0],
        password: res.profileObj.googleId,
      },
    };
    let reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    //debugger;
    fetch("http://localhost:3001/users", reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        console.log(user);
        if (user.message === "Success") {
          //debugger
          let userSave = {
            username: user.username,
            id: user.id,
            notes: user.notes,
          };
          this.props.makeGoogle()
          this.props.changeUser(userSave);
        } else {
          alert("Unable to create User");
        }
      });
  };

  onFailure = (res) => {
    console.log("[Login failed res:", res);
  };
  render() {
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={(res) => this.onSuccess(res)}
          onFailure={(res) => this.onFailure(res)}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "100px" }}
          isSignedIn={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeGoogle: () => dispatch({ type: "IS_A_GOOGLE_USER" }),
    changeUser: (user) => dispatch({ type: "CHANGE_USER", user: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLoginButton);
