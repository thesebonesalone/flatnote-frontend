import React, { Component } from "react";
import Note from "./components/Note";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      filter: "",
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.user.username}/notes`)
      .then((resp) => resp.json())
      .then((notes) => {
        this.setState({
          notes: notes,
        });
      });
  }

  renderNotes() {
    let filteredNotes = this.state.notes.filter((note) => {
      return (
        note.title.includes(this.state.filter) ||
        note.content.includes(this.state.filter)
      );
    });
    return filteredNotes.map((note) => {
      return <Note key={note.id} info={note} />;
    });
  }

  handleNewClick(e) {
    console.log("yup");
    this.props.removeEditId();
  }

  handleChange = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  render() {
    //debugger
    return (
      <div className="main-title">
        {this.props.user.username === "" ? <Redirect push to="/" /> : null}
        <h1>{`${this.props.user.username}'s Notes`}</h1>
        <input
          type="text"
          placeholder="search notes"
          onChange={(e) => this.handleChange(e)}
        />
        <div>{this.renderNotes()}</div>
        <Link to="/notes/new" onClick={(e) => this.handleNewClick(e)}>
          Create New Note
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user, editId: state.editId };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUser: (user) => dispatch({ type: "CHANGE_USER", user: user }),
    removeEditId: () => dispatch({ type: "REMOVE_EDIT_ID" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
