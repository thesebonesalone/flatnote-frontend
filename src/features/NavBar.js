import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class NavBar extends Component {
  handleLogOut(e) {
    this.props.logOut();
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        {/* <img src={require("../assets/logo192.png")} alt="flatnote logo"/> */}
        <h5 className="navbar-brand large-text"><color style={{color: 'rgb(189, 28, 16)'}}>Flat</color><color style={{color: 'white'}}>Note</color></h5>
        <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
        {this.props.user.id ? (<ul className="navbar-nav mr-auto">
          
          <li className="nav-item active">
            
              <a
                className="active faux-link"
                onClick={(e) => this.handleLogOut(e)}
              >
                {" "}
                Logout
              </a>
          </li>
          <li className="nav-item active">
            <Link to="/notes" className="active">
              My Notes
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/notes/new" className="active" onClick={() => this.props.removeEditId()}>
              New Note
            </Link>
          </li>
        </ul>) : null}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUser: (user) => dispatch({ type: "CHANGE_USER", user: user }),
    logOut: () => dispatch({ type: "REMOVE_USER" }),
    removeEditId: () => dispatch({ type: "REMOVE_EDIT_ID" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
