import React, { Component } from 'react'
import Note from './components/Note'
import { connect } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

class Notes extends Component {
    constructor(props){
        super(props)
        this.state = {
            notes: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.user.username}/notes`)
        .then(resp => resp.json())
        .then(notes => {
            this.setState({
                notes: notes
            })
        })
    }

    renderNotes(){
        return this.state.notes.map(note => {
            return (<Note key={note.id} info={note}/>)
        })
    }

    handleNewClick(e){
        console.log("yup")
        this.props.removeEditId()
    }

    render(){
        //debugger
        return(
            <div className="main-title">
                {this.props.user.username === '' ? <Redirect push to="/" />: null}
                <h2>{`${this.props.user.username}'s Notes`}</h2>
                <div>
                    {this.renderNotes()}
                </div>
                <Link to="/notes/new" onClick={(e) => this.handleNewClick(e)}>Create New Note</Link>
                
            </div>

        )

    }

}
const mapStateToProps = (state) => {
    return { user: state.user, editId: state.editId };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      changeUser: (user) =>
        dispatch({ type: "CHANGE_USER", user: user }),
        removeEditId: () =>
        dispatch({ type: "REMOVE_EDIT_ID"}),
        
    };
    
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Notes);