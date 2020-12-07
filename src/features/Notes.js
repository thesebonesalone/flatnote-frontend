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
      date: 1,
    };
  }

  componentDidMount() {
    this.setState({
      notes: this.props.user.notes,
    });
    // fetch(`http://localhost:3000/users/${this.props.user.username}/notes`)
    //   .then((resp) => resp.json())
    //   .then((notes) => {
    //     //debugger
    //     this.setState({
    //       notes: notes,
    //     });

    //   });
  }

  renderNotes() {
    let filteredNotes = this.state.notes.filter((note) => {
      return (
        note.title.includes(this.state.filter) ||
        note.content.includes(this.state.filter)
      );
    });
    filteredNotes = filteredNotes.sort((a, b) => {
      let date1 = a.created_at;
      let date2 = b.created_at;
      if (date1 > date2) {
        return this.state.date;
      }
      if (date1 < date2) {
        return this.state.date;
      }
      return 0;
    });

    return filteredNotes.map((note) => {
      return <Note key={note.id} info={note} />;
    });
  }

  handleNewClick(e) {
    this.props.removeEditId();
  }

  handleChange = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };
  handleSort = (e) => {
    let newDate = this.state.date;
    this.setState({
      date: -newDate,
    });
  };

  render() {
    //debugger
    return (
      <div className="main-title card bg-light">
        {this.props.user.username === "" ? <Redirect push to="/" /> : null}
        <h1>{`${this.props.user.username}'s Notes`}</h1>
        <div>
          <input
            type="text"
            placeholder="search notes"
            onChange={(e) => this.handleChange(e)}
          />
          <button className="btn btn-primary" onClick={(e) => this.handleSort(e)}>
            {this.state.date > 0 ? "Sort by Newest" : "Sort by Oldest"}
          </button>
        </div>
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
