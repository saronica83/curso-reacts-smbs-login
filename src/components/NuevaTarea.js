import React, { Component } from "react";
class NuevaTarea extends Component {
  constructor() {
    super();
    this.state = {
      titulo: "",
      responsable: "",
      descripcion: "",
      prioridad: "baja"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  addNote(e) {
    e.preventDefault();
    this.props.addNote(this.state);
    this.setState({
      titulo: "",
      responsable: "",
      descripcion: "",
      prioridad: "baja"
    });
  }

  handleInputChange(e) {
    const { value, name } = e.target;
    console.log(value, name);
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div className="card mt-4">
        <form onSubmit={this.addNote} className="card-body">
          <div className="form-group">
            <input
              autoComplete="off"
              type="text"
              name="titulo"
              className="form-control"
              value={this.state.titulo}
              onChange={this.handleInputChange}
              placeholder="Titulo"
            />
          </div>
          <div className="form-group">
            <input
              autoComplete="off"
              type="text"
              name="responsable"
              className="form-control"
              value={this.state.responsable}
              onChange={this.handleInputChange}
              placeholder="Responsable"
            />
          </div>
          <div className="form-group">
            <input
              autoComplete="off"
              type="text"
              name="descripcion"
              className="form-control"
              value={this.state.descripcion}
              onChange={this.handleInputChange}
              placeholder="Descripcion"
            />
          </div>
          <div className="form-group">
            <select
              name="prioridad"
              className="form-control"
              value={this.state.prioridad}
              onChange={this.handleInputChange}
            >
              <option>baja</option>
              <option>media</option>
              <option>alta</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    );
  }
}
export default NuevaTarea;
