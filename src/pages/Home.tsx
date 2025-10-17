import { useState, useMemo, useEffect, type ChangeEvent } from "react";
import ProductGrid from "../components/HomePage/ProductGrid";
import HomeDrawer from "../components/HomePage/HomeDrawer"; // Asegurate de importar bien
import { useFlyer } from "../context/FlyerContext";
import type { Group, Department, Product } from "../models/Flyer";
import CategorySelector from "../components/HomePage/CategorySelector";
import HomeFooter from "../components/HomePage/HomeFooter";
import { Box, Pagination, Typography } from "@mui/material";
import HomeNavbar from "../components/Navbars/HomeNavbar";
import NotProductsFound from "../components/HomePage/NotProductsFound";
import Popup from "../components/Popup/Popup";

export default function Home() {
  const { flyer, productList, groups } = useFlyer();

  const [flyerMessagePopup, setFlyerMessagePopup] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Group>(groups[0]);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  //Paginacion
  const [page, setPage] = useState<number>(
    parseInt(sessionStorage.getItem("currentPage") || "1")
  );
  const [itemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const filteredProducts = useMemo(() => {
    let filtered: Product[] = [];

    if (selectedCategory.name_id === "TODOS") {
      filtered = productList;
    } else if (!selectedDepartment) {
      const groupId = selectedCategory.group_id;
      filtered = productList.filter((product) =>
        product.group_id ? product.group_id.includes(groupId) : false
      );
    } else {
      const groupId = selectedCategory.group_id;
      const departCode = selectedDepartment.departCode;
      filtered = productList.filter((product) =>
        product.group_id
          ? product.group_id.includes(groupId) &&
            product.departCode == departCode
          : false
      );
    }

    // Filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [productList, selectedCategory, selectedDepartment, searchTerm]);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    sessionStorage.setItem("currentPage", value.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPaginatedProducts = (): Product[] => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const pages = Math.ceil(filteredProducts.length / itemsPerPage);
    setTotalPages(pages);

    // Asegura que si filtrás y hay menos páginas, no se quede en una inválida
    if (page > pages) {
      setPage(1);
    }
  }, [filteredProducts, itemsPerPage]);

 // Abrir el popup automáticamente si hay mensaje y no fue leído en esta sesión
  useEffect(() => {
    if (flyer.notice.active && !sessionStorage.getItem("flyerMessageRead")) {
      setFlyerMessagePopup(true);
    }
  }, [flyer.notice]);

  const handleClose = () => {
    setFlyerMessagePopup(false);
    sessionStorage.setItem("flyerMessageRead", "true"); // marcar como leído en session
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", minHeight: "100vh", background:'red'}}>

      <HomeNavbar
        search={searchTerm}
        setSearch={setSearchTerm}
        onMenuClick={handleOpenDrawer}
      />

      <HomeDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        groups={groups}
        selectedCategory={selectedCategory}
        selectedDepartment={selectedDepartment}
        onSelectCategory={(group) => setSelectedCategory(group)}
        onSelectDepartment={(dept) => setSelectedDepartment(dept)}
      />

      <CategorySelector
        selectedCategory={selectedCategory}
        selectedDepartment={selectedDepartment}
        onSelectCategory={(group) => setSelectedCategory(group)}
        onSelectDepartment={(dept) => setSelectedDepartment(dept)}
        categories={groups}
      />

      <Box sx={{ flexGrow: 1 }}>
        {getPaginatedProducts().length !== 0 ? (
          <ProductGrid products={getPaginatedProducts()} selectedCategory={selectedCategory} />
        ) : (
          <NotProductsFound query={searchTerm}/>
        )}

        <Box sx={{ display: getPaginatedProducts().length == 0 ? "none" : "flex", justifyContent: "center", py: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            siblingCount={2}
            color="primary"
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </Box>
      </Box>

      <Box component="footer" sx={{ mt: "auto" }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 2 }}>
          {flyer.comment}
        </Typography>
        <HomeFooter />
      </Box>

      {/* Mensaje que viene del flyer */}
      <Popup
        open={flyerMessagePopup}
        onClose={handleClose}
      />
    </Box>
  );
}
