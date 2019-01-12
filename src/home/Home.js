import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="navbar navbar-dark bg-dark">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="link-container">
            <Link to="/login" className="link">
              <h2>Ejemplo Authentication</h2>
            </Link>
          </div>
          <div className="link-container">
            <Link to="/tareas" className="link">
              <h2>Ejemplo DataBase</h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
