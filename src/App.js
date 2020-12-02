import "./App.css";
import { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/users/1")
      .then((resp) => resp.json())
      .then((user) => {
        //debugger
        this.props.changeUsername(user.username);
      });
  }
  render() {
    return <div>{this.props.username}</div>;
  }
}

const mapStateToProps = (state) => {
  return { username: state.username };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUsername: (username) => dispatch({ type: "CHANGE_USERNAME", username: username})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
