import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import type { Group, Product } from "../../models/Flyer";
import ProductCard from "./ProductCard/ProductCard";
import AddtoCart from "./AddToCart";
import ProductModal from "./ProductModal";
import { useEffect, useState } from "react";
import { fetchProductImage } from "../../utils/fetchProductImage";
import { useFlyer } from "../../context/FlyerContext";
import { readMeta } from "../../services/metaService";
// import { readMeta } from "../../services/metaService";

interface ProductGridProps {
  products: Product[];
  selectedCategory: Group;
}

export default function ProductGrid({
  products,
  selectedCategory,
}: ProductGridProps) {
  const theme = useTheme();
  const isSmallScreenTest = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallScreen = false;

  //Estados para modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductImage, setSelectedProductImage] = useState<
    string | undefined
  >(undefined);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const [fade, setFade] = useState(true);
  // const [background, setBackground] = useState(selectedCategory?.background);

  const { meta } = useFlyer();
  const [background, setBackground] = useState<string | undefined>(undefined);

  const handleClickOpenModal = async (product: Product) => {
    setSelectedProduct(product); // Establece el producto seleccionado
    setOpenModal(true); // Abre el modal
    await fetchImage(product.productPLU);
  };

  // 🔹 Función para traer la imagen del producto
  const fetchImage = async (ean: string) => {
    try {
      setImageLoading(true);

      // Obtener el meta (usa el global si no hay local)
      let metaData: any = await readMeta();
      if (!metaData) metaData = meta;

      // Obtener la imagen (sea de la API o del CDN)
      const img = await fetchProductImage(ean, metaData);

      if (img) setSelectedProductImage(img);
      else console.warn(`No se encontró imagen para ${ean}`);
    } catch (error) {
      console.error("Error al cargar imagen:", error);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    const fetchLogo = async () => {
      if (!selectedCategory.background) {
        setBackground(undefined);
        return;
      }
      let metaData: any = await readMeta();
      if (!metaData) metaData = meta;
      const url = `${metaData.logo_image}${selectedCategory.background}`;
      setBackground(url || "");
    };

    setFade(false);
    setTimeout(() => {
      fetchLogo();
      // setBackground(selectedCategory?.background);
      setFade(true);
    }, 500);
  }, [selectedCategory]);

  return (
    <>
      <Grid
        sx={{
          border: "1px solid #ddd",
          boxShadow:
            " 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
          borderRadius: "4px",
          padding: isSmallScreen ? "10px" : "50px 20px",
          position: "relative",
          margin: "auto",
          width: "95%",
          background: background ? undefined : "#0000000d",
        }}
      >
        {background && (
          <Box
            sx={{
              position: "absolute", // Lo coloca detrás de los productos
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${background}), linear-gradient(to bottom, transparent, #f3f3f3 100%)`, // Gradiente
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: fade ? 0.4 : 0, // Aplica la opacidad solo al fondo
              transition: "opacity 1s ease-in-out", // Efecto de transición
              zIndex: -1, // Asegura que el fondo quede detrás de los productos
            }}
          />
        )}
        <Grid
          container
          spacing={isSmallScreen ? 0 : 3}
          justifyContent="center"
          margin={isSmallScreen ? 0 : undefined}
        >
          {products.map((product: Product) => (
            <Grid
              size={{ xs: isSmallScreen ? 6 : undefined }}
              key={product.productPLU}
              sx={{
                position: "relative",
                paddingBottom: "25px",
              }}
            >
              <ProductCard
                product={product}
                onClick={() => handleClickOpenModal(product)}
              />
              <Box sx={{ position: "absolute", bottom: 0 }}>
                <div>
                  <AddtoCart product={product} />
                </div>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        product={selectedProduct}
        productImage={selectedProductImage}
        imageLoading={imageLoading}
        isSmallScreen={isSmallScreenTest}
      />
    </>
  );
}
