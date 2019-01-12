import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Tareas from "./components/Tareas";
import Home from "./home/Home";
import firebase from "firebase";
import { DB_CONFIG } from "./config/config";
class App extends Component {
  componentWillMount() {
    firebase.initializeApp(DB_CONFIG);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Redirect from="/" to="/home" />
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/Tareas" render={() => <Tareas/>} />
          </Switch> */}
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/tareas"} component={Tareas} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
