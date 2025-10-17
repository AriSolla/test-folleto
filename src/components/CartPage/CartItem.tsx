import { Box, Typography, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "../../models/Flyer";
import React from "react";
import ProductImage from "./ProductImage";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";
import DeleteProductDialog from "./Dialogs/DeleteProductDialog";
import { useSnackbar } from "../../context/SnackbarContext";
import { formatCurrency } from "../../utils/formatPrice";
import { fetchProductImage } from "../../utils/fetchProductImage";
import { getPriceSelected } from "../../utils/getPriceSelected";
import { useFlyer } from "../../context/FlyerContext";
import { readMeta } from "../../services/metaService";

interface Props {
  item: Product;
}

export default function CartItem({ item }: Props) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const {business, meta} = useFlyer()
  const { showMessage } = useSnackbar();
  const [imageLoading, setImageLoading] = React.useState<boolean>(true);
  const [image, setImage] = React.useState<string | undefined>(undefined);

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const precioDefault = getPriceSelected(item, business.price_default)

  const borrarProducto = () => {
    removeFromCart(item.productPLU);
    setOpenDialog(false);
    showMessage("Producto borrado del carrito exitosamente.", "info");
  };
    
  React.useEffect(() => {
    const fetchUrlMeta = async () => {
      let metaData: any = await readMeta();
      if(!metaData) metaData = meta
      return metaData
    };

      const fetchImage = async (ean: string) => {
        setImageLoading(true);
        const meta = await fetchUrlMeta();
        const img = await fetchProductImage(ean, meta);
        if (img) setImage(img);
      setImageLoading(false);
    };
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
          <ProductImage
            src={image}
            alt={item.productName}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
          />
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

            <IconButton
              color="error"
              size="small"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
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
              ${formatCurrency(precioDefault)}
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
              ${formatCurrency((precioDefault * item.cartQuantity!))}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mt: 2 }} />

      <DeleteProductDialog
        openDialog={openDialog}
        handleCloseDialog={() => {
          setOpenDialog(false);
        }}
        handleDeleteItem={borrarProducto}
        productToDelete={item}
      />
    </>
  );
}
