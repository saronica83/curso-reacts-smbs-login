import React, { Component } from "react";
import firebase from "firebase";
import Confirm from "./Confirm";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
class Login extends Component {
  INITIAL_STATE = {
    password: "",
    username: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.INITIAL_STATE,
      message: "",
      message_style: "",
      loading: false,
      openConfirm: false
    };
  }

  handleChange = event => {
    var element = event.target;

    var name = element.name;
    var value = element.value;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.setState({ message: "", loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(this.onLoginSuccess)
      .catch(error => {
        this.setState({ openConfirm: true, loading: false });
      });
  };
  onUserCreated = () => {
    this.setState({
      message: "Usuario Creado con éxito!",
      message_style: "alert-success",
      loading: false,
      openConfirm: false
    });
  };
  onLoginSuccess = user => {
    if (user) {
      this.setState({
        message: "Login exitoso!",
        message_style: "alert-success",
        loading: false,
        openConfirm: false
      });
    }
  };
  renderMenssage = () => {
    if (this.state.message)
      return (
        <div className={`alert ${this.state.message_style} mt-2`}>
          {this.state.message}
        </div>
      );
  };

  handleClose = () => {
    this.setState({ openConfirm: false });
  };

  handleConfirm = () => {
    const { username, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(this.onUserCreated)
      .catch(this.onLoginFail);
  };
  onLoginFail = error => {
    var errorCode = error.code;
    if (errorCode === "auth/email-already-in-use") {
      var mensaje = "dirección de correo ya en uso!";
      this.setState({
        message: mensaje
      });
    } else if (errorCode === "auth/weak-password") {
      var mensaje2 = "El passwords debe contener almenos 6 caracteres!";
      this.setState({
        message: mensaje2
      });
    } else if (errorCode === "auth/invalid-email") {
      var mensaje3 = "Formato de correo electrónico erróneo!";
      this.setState({
        message: mensaje3
      });
    } else if (errorCode === "auth/operation-not-allowed") {
      var mensaje4 = "Opción de inicio de sesión deshabilitada!";
      this.setState({
        message: mensaje4
      });
    }
    this.setState({
      message_style: "alert-danger",
      loading: false,
      openConfirm: false
    });
  };

  render() {
    return (
      <div>
        <div className="navbar navbar-dark bg-dark">
          <div className="link-container">
            <Link to="/" className="link">
              <h2>Atras</h2>
            </Link>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Login">
          <Confirm
            open={this.state.openConfirm}
            handleClose={this.handleClose}
            handleConfirm={this.handleConfirm}
          />
          <div className="card mt-4">
            <div className="card-header">Iniciar Sesión en SMBS</div>
            <div className="card-body">
              <form action="" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-12 AvatarWrapper">
                    <img src="/avatar.png" alt="" className="Avatar" />
                  </div>
                  <div className="col-12">{this.renderMenssage()}</div>
                  <div className="col-12">
                    <label htmlFor="">Username</label>
                    <input
                      autoComplete="off"
                      type="email"
                      name="username"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.username}
                      placeholder="ejemplo@ejemplo.com"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.password}
                      placeholder="Minimo 6 caracteres"
                    />
                  </div>
                  <div className="col-12 mt-2">
                    <button name="Login" className="btn btn-success">
                      Login{" "}
                      {this.state.loading && (
                        <i className="fas fa-spinner fa-spin"> </i>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
