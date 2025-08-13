import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface Props {
    openDialog: boolean,
    handleCloseDialog: () => void;
    handleDeleteAll: () => void;
}

const DeleteCartDialog = ({ openDialog, handleCloseDialog, handleDeleteAll }: Props) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>
        ¿Desea borrar todos los productos del carrito?
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" color="textSecondary">
          Esta acción es irreversible.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancelar</Button>
        <Button onClick={handleDeleteAll} color="error" autoFocus>
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCartDialog;
