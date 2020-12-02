import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import NavBar from "./features/NavBar";
import Notes from "./features/Notes";
import NotesForm from "./features/NotesForm";
import Login from "./features/Login";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import * as serviceWorker from './serviceWorker';

const reducer = (
  state = { user: { username: "", id: null }, edit: null },
  action
) => {
  switch (action.type) {
    case "CHANGE_USER":
      return { ...state, user: action.user };
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
      <div className="container">
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
