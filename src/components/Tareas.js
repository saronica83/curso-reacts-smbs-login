import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
// subcomponents
import NuevaTarea from "./NuevaTarea";
class Tareas extends Component {
  constructor() {
    super();
    this.state = {
      tareas: []
    };
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }
  componentWillMount() {
    this.database = firebase
      .database()
      .ref()
      .child("tareas");
  }

  componentDidMount() {
    const { tareas } = this.state;
    this.database.on("child_added", snap => {
      tareas.push({
        tareaId: snap.key,
        titulo: snap.val().titulo,
        responsable: snap.val().responsable,
        descripcion: snap.val().descripcion,
        prioridad: snap.val().prioridad
      });
      this.setState({ tareas });
    });

    this.database.on("child_removed", snap => {
      for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].tareaId === snap.key) {
          tareas.splice(i, 1);
        }
      }
      console.log(tareas);
      this.setState({ tareas });
    });
  }
  addNote(tarea) {
    console.log(tarea);
    this.database.push().set({
      titulo: tarea.titulo,
      responsable: tarea.responsable,
      descripcion: tarea.descripcion,
      prioridad: tarea.prioridad
    });
  }
  removeNote(tareaId) {
    if (window.confirm("Seguro que deseas eliminarlo ?")) {
      this.database.child(tareaId).remove();
    }
  }
  render() {
    const datos = this.state.tareas.map(todo => {
      return (
        <div className="col-md-4" key={todo.tareaId}>
          <div className="card mt-4">
            <div className="card-title text-center">
              <h3>{todo.titulo}</h3>
              <span className="badge badge-pill badge-danger ml-2">
                {todo.prioridad}
              </span>
            </div>
            <div className="card-body">
              <p>{todo.descripcion}</p>
              <p>
                <mark>{todo.responsable}</mark>
              </p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={this.removeNote.bind(this, todo.tareaId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
    // RETURN THE COMPONENT
    return (
      <div className="Tareas">
        <nav className="navbar navbar-dark bg-dark">
          <label className="navbar-brand">
            Tareas
            <span className="badge badge-pill badge-light ml-2">
              {this.state.tareas.length}
            </span>
          </label>
          <div className="link-container">
            <Link to="/" className="link">
              <h2>Atras</h2>
            </Link>
          </div>
        </nav>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              <NuevaTarea addNote={this.addNote} />
            </div>
            <div className="col-md-8">
              <div className="row">{datos}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Tareas;
