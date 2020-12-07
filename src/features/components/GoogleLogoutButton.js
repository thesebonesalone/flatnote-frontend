import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { connect } from "react-redux";

const clientId =
  "552961180821-vlrabsqtdobcoqmf3q3vg84j8pbc3692.apps.googleusercontent.com";

class GoogleLogoutButton extends Component {
    constructor(props){
        super(props)
    }
  onSuccess() {
    this.props.logOut();
    //alert("Logout made successfully");
  };

  render() {
    return (
      <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="logout"
          onLogoutSuccess={() => this.onSuccess()}
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
    logOut: () => dispatch({ type: "REMOVE_USER" }),
    changeUser: (user) => dispatch({ type: "CHANGE_USER", user: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogoutButton);
