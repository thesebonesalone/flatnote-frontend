import React, { Component } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand">FlatNotes</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/" className="active">
            Logout <span className="sr-only"></span>
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/notes" className="active">
            My Notes
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/notes/new" className="active">
            New Note
          </Link>
        </li>
      </ul>
    </nav>
  );
}
