import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./routes/AppRoutes";
import { useFlyer } from "./context/FlyerContext";
import { Box, CircularProgress, Typography } from "@mui/material";

function App() {
  const { loadFlyerData } = useFlyer();
  const [status, setStatus] = useState<
    "loading" | "error" | "expired" | "done"
  >("loading");
  const [msgError, setMsgError] = useState("");
  const [dateExpired, setDateExpired] = useState("");

  const expired = (expired_date: string) => {
    const today = new Date();
    return new Date(expired_date) < today;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let flyerJson = sessionStorage.getItem("query")

        if(!flyerJson){
          const queryParams = new URLSearchParams(window.location.search);
          flyerJson = queryParams.get("flyer");
        }
        
        if (!flyerJson) throw new Error("No se ha recibido la información del folleto.");
  
        
        const response = await fetch(flyerJson);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        let data = await response.json();

        if (expired(data.flyer.expired_date)) {
          setDateExpired(data.flyer.expired_date);
          setStatus("expired");
        } else {
          loadFlyerData(data);
          sessionStorage.setItem("query", flyerJson)
          setStatus("done");
        }
      } catch (error: any) {
        setMsgError(error.message || "Error desconocido");
        setStatus("error");
      }
    };

    fetchData();
  }, []);

  // Estado: loading
  if (status === "loading")
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando folleto...
        </Typography>
      </Box>
    );

  // Estado: error
  if (status === "error")
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
        px={2}
      >
        <Typography variant="h3" color="error" gutterBottom>
          Error
        </Typography>
        <Typography variant="body1">{msgError}</Typography>
        <Typography variant="body2">Porfavor contacte con el local</Typography>
      </Box>
    );

  // Estado: expirado
  if (status === "expired")
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
        px={2}
      >
        <Typography variant="h3" color="error" gutterBottom>
          Folleto vencido
        </Typography>
        <Typography variant="body1">
          El folleto expiró el <strong>{dateExpired}</strong>
        </Typography>
        <Typography variant="body2">
          Contacte con el local para obtener uno nuevo
        </Typography>
      </Box>
    );

  if (status === "done")
    return (
      <>
        <CssBaseline />
        <AppRoutes />
      </>
    );
}

export default App;
