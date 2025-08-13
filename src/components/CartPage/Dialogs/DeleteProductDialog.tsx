import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import type { Product } from '../../../models/Flyer';

interface Props {
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleDeleteItem: () => void;
    productToDelete: Product
}

const DeleteProductDialog = ({ openDialog, handleCloseDialog, handleDeleteItem, productToDelete }: Props) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
    <DialogTitle>
      {productToDelete && `¿Desea borrar ${productToDelete.productName}?`}
    </DialogTitle>
    <DialogActions>
      <Button onClick={handleCloseDialog}>Cancelar</Button>
      <Button onClick={handleDeleteItem} color="error" autoFocus>
        Borrar
      </Button>
    </DialogActions>
  </Dialog>
  );
};

export default DeleteProductDialog;
