import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
class AlertDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Usuario y Contraseña inválidos, desea registrarse?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.props.handleConfirm} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;
