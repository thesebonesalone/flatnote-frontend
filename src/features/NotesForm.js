import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class NotesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      redirect: false
    };
  }

  handleChange = (e) => {
    if (e.target.name === "title") {
      this.setState({ title: e.target.value });
    }
    if (e.target.name === "content") {
      this.setState({ content: e.target.value });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.edit) {
      this.handleEdit();
    } else {
      this.handleCreate()
    }
  };

  componentDidMount() {
    if (this.props.edit) {
      fetch("http://localhost:3000/notes/" + this.props.edit)
        .then((resp) => resp.json())
        .then((note) =>
          this.setState({
            title: note.title,
            content: note.content,
          })
        );
    }
  }

  handleCreate = () => {
    let data = { note: { title: this.state.title, content: this.state.content, user_id: this.props.user.id } };
    let reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/notes", reqObj)
      .then((resp) => resp.json())
      .then((note) => {
        this.props.changeEdit(note.id)
        this.setState({
            redirect: true
        })
      });
  };

  handleEdit = () => {
    let data = { note: { title: this.state.title, content: this.state.content, user_id: this.props.user.id } };
    let reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`http://localhost:3000/notes/${this.props.edit}`, reqObj)
      .then((resp) => resp.json())
      .then((note) => {
          console.log(note)
        this.setState({
            redirect: true
        })
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <h2 className="row">
          {this.props.edit ? "Edit Notes" : "Take New Notes"}
        </h2>
        {this.props.user.username === "" ? <Redirect push to="/" /> : null}
        {this.state.redirect ? <Redirect push to="/notes"/> : null}
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="row"
            value={this.state.title}
            onChange={(e) => this.handleChange(e)}
          />
          <textarea
            type="text"
            name="content"
            className="row"
            style={{ width: "95%", height: "35rem" }}
            value={this.state.content}
            placeholder="Take your notes here..."
            onChange={(e) => this.handleChange(e)}
          />
          <button type="submit" name="submit">
            { this.props.edit ? "Save Note" : "Create Note"}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, edit: state.edit };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUser: (user) => dispatch({ type: "CHANGE_USER", user: user }),
    changeEdit: (editId) => dispatch({ type: "FILL_EDIT_ID", editId: editId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);
