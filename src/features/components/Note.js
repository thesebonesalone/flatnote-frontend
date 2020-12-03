import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      expand: false,
      confirm: false,
    };
  }
  parseDate = () => {
    let date = this.props.info.created_at.split("T")[0];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let splitDate = date.split("-");
    let newString = `${months[parseInt(splitDate[1] - 1)]} ${splitDate[2]}, ${
      splitDate[0]
    }`;
    return newString;
  };

  handleClick = (e) => {
    this.props.changeEdit(this.props.info.id);
  };
  handleDelete = (e) => {
    let truth = this.state.confirm;
    this.setState({ confirm: !truth });
  };

  renderEdit() {
    return (
      <div>
        <Link
          to="/notes/edit"
          onClick={(e) => this.handleClick(e)}
          className="btn btn-outline-primary"
        >
          Edit
        </Link>
        <span style={{ width: "10rem" }} />{" "}
        <div
          onClick={(e) => this.handleDelete(e)}
          className="btn btn-outline-danger"
        >
          Delete
        </div>
      </div>
    );
  }
  deleteSelf() {
    fetch(`http://localhost:3000/notes/${this.props.info.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((test) => {
        if (test.message === "Success") {
          this.setState({
            hidden: true,
          });
        }
      });
  }

  renderConfirm() {
    return (
      <div>
        <p>Are you sure you want to delete?</p>
        <p>
          <button
            onClick={(e) => this.handleDelete(e)}
            className="btn btn-outline-primary"
          >
            Cancel
          </button>
          <button
            onClick={(e) => this.deleteSelf(e)}
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </p>
      </div>
    );
  }

  renderHalfContent() {
    if (this.props.info.content.length < 256) {
      return this.props.info.content;
    } else {
      return this.props.info.content.slice(0, 255) + "...";
    }
  }

  handleExpand() {
    let expand = this.state.expand;
    this.setState({
      expand: !expand,
    });
  }

  render() {
    if (this.state.hidden) {
      return null;
    } else {
      return (
        <div className="row" style={{ margin: "20px" }}>
          <div className="card" style={{ width: "100%", height: "auto" }}>
            <h5 className="card-header">{this.props.info.title}</h5>
            <div className="card-body">
              <p className="card-subtitle mb-2 text-muted">
                {" "}
                Date Created: {this.parseDate()}
              </p>
              <p>
                {this.state.expand
                  ? this.props.info.content
                  : this.renderHalfContent()}
                {this.props.info.content.length > 256 ? (
                  <p>
                    <a
                      className="btn btn-primary"
                      onClick={() => this.handleExpand()}
                    >
                      {this.state.expand ? "Hide" : "Show All"}
                    </a>
                  </p>
                ) : null}
              </p>
              {this.state.confirm ? this.renderConfirm() : this.renderEdit()}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, editId: state.editId };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeEdit: (editId) => dispatch({ type: "FILL_EDIT_ID", editId: editId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
