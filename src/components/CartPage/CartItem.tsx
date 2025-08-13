import {
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "../../models/Flyer";
import React from "react";
import ProductImage from "./ProductImage";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";
import DeleteProductDialog from "./Dialogs/DeleteProductDialog";
import { useSnackbar } from "../../context/SnackbarContext";

interface Props {
  item: Product;
}

export default function CartItem({ item }: Props) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const {showMessage} = useSnackbar()
  const [imageLoading, setImageLoading] = React.useState<boolean>(true);
  const [image, setImage] = React.useState<string | undefined>(undefined);
  
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);


  const borrarProducto = () => {
    removeFromCart(item.productPLU)
    setOpenDialog(false)
    showMessage("Producto borrado del carrito exitosamente.", "info")
  }

  const fetchImage = async (ean: string) => {
    setImageLoading(true);
    try {
      const response = await fetch(
        `https://pf.rtitec.com.ar/image/image.php?image&ean=${ean}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const imagenData = data[0];
          const base64Image = imagenData.image;
          setImage(base64Image);
        }
      } else {
        console.error(
          `Error al cargar la imagen con ean ${ean}: `,
          response.status
        );
      }
    } catch (error) {
      console.error(`Error en la solicitud para el ean ${ean}:`, error);
    } finally {
      setImageLoading(false);
    }
  };

  React.useEffect(() => {
    fetchImage(item.productPLU);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "row",
          },
          gap: 2,
          py: 2,
        }}
      >
        {/* Imagen */}
        <Box
          sx={{
            width: {
              xs: "50%",
              sm: "30%",
              md: "20%",
            },
            alignSelf: { xs: "center" },
            height: "auto",
            flexShrink: 0,
          }}
        >
          <ProductImage src={image} alt={item.productName} imageLoading={imageLoading} setImageLoading={setImageLoading} />
        </Box>

        {/* Contenido */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          {/* Nombre + PLU + Basura */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={500}>
                {item.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PLU: {item.productPLU}
              </Typography>
            </Box>

            <IconButton color="error" size="small" onClick={()=>{setOpenDialog(true)}}>
              <DeleteIcon />
            </IconButton>
          </Box>

          {/* Precio + Selector + Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 2,
              gap: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              ${item.precioVenta.toFixed(0)}
            </Typography>

            <QuantitySelector
              value={item.cartQuantity!}
              onDecrease={() => {
                decreaseQuantity(item.productPLU);
              }}
              onIncrease={() => {
                increaseQuantity(item.productPLU);
              }}
              min={1}
            />

            <Typography variant="body1" fontWeight={800} color="green">
              ${(item.precioVenta * item.cartQuantity!).toFixed(0)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mt: 2 }} />
      
      <DeleteProductDialog
        openDialog={openDialog}
        handleCloseDialog={()=>{setOpenDialog(false)}}
        handleDeleteItem={borrarProducto}
        productToDelete={item}
      />
    </>
  );
}
