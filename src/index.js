import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NavBar from "./features/NavBar";
import Notes from "./features/Notes";
import NotesForm from "./features/NotesForm";
import Login from "./features/Login";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import * as serviceWorker from './serviceWorker';

const reducer = (
  state = {google: false, user: { username: "", id: null }, edit: null ,},
  action
) => {
  switch (action.type) {
    case "ADD_NOTE_TO_STORE":
      return {...state, user: {...state.user, notes: [...state.user.notes, action.note]}}
    case "EDIT_NOTE_IN_STORE":
      let newNote = state.user.notes.filter(note => 
        note.id !== action.note.id)
      newNote = [...newNote, action.note]
      return {...state, user: {...state.user, notes: newNote}}
    case "IS_A_GOOGLE_USER":
      return {...state, google: true}
    case "CHANGE_USER":
      return { ...state, user: action.user };
    case "REMOVE_USER":
      return { ...state, google: false, user: { username: "", id: null } };
    case "FILL_EDIT_ID":
      return { ...state, edit: action.editId };
    case "REMOVE_EDIT_ID":
      return { ...state, edit: null };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  [] + window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.dispatch({ type: "@@INIT" });
//debugger

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <NavBar />
      <div className="container home-page">
        <div className="row"></div>
        <Switch>
          <Route path="/notes/new">
            <NotesForm is={"new"} />
          </Route>
          <Route path="/notes/edit">
            <NotesForm is={"edit"} />
          </Route>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Provider>
  </Router>,
  document.getElementById("root")
);
