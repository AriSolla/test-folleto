import React from "react";
import CartNavbar from "../components/Navbars/CartNavbar";
import { useCart } from "../context/CartContext";
import ClearCartDialog from "../components/CartPage/Dialogs/ClearCartDialog";
import { useSnackbar } from "../context/SnackbarContext";
import CartGrid from "../components/CartPage/CartGrid";

const Cart = () => {
  const { clearCart } = useCart();
  const { showMessage } = useSnackbar();

  //Dialogs
  const [openDeleteCartDialog, setOpenDeleteCartDialog] =
    React.useState<boolean>(false);
  const handleDeleteAll = () => {
    clearCart();
    setOpenDeleteCartDialog(false);
    showMessage("Pedido borrado", "warning", 4000);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CartNavbar openDeleteCartDialog={() => setOpenDeleteCartDialog(true)} />

      <CartGrid />

      {/* Diálogo de Borrar Todo */}
      <ClearCartDialog
        openDialog={openDeleteCartDialog}
        handleCloseDialog={() => setOpenDeleteCartDialog(false)}
        handleDeleteAll={handleDeleteAll}
      />
    </>
  );
};

export default Cart;
