import { readMeta } from "./services/metaService";
import { useEffect, useState } from "react";
import { useSession } from "./hooks/useSession";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./routes/AppRoutes";
import { useFlyer } from "./context/FlyerContext";
import { Box, CircularProgress, Typography } from "@mui/material";
// import devMeta from "../meta.dev.json"; // solo para desarrollo

function App() {
  useSession(20, 20); //20 min
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
    const loadData = async () => {
      try {
        // Obtener meta
        let meta: any = await readMeta();

        //  Obtener flyer usando la URL con fecha
        if (!meta.flyer_url)
          throw new Error("No se ha recibido la URL del flyer.");
        const flyerUrl = `${meta.flyer_url}?v=${meta.hashtag}`;

        const flyerResponse = await fetch(flyerUrl);
        
        if (!flyerResponse.ok)
          throw new Error(`Error HTTP: ${flyerResponse.status}`);
        
        const flyerData = await flyerResponse.json();
        // console.log(flyerData);

        // console.log(flyerData.flyer.hashtag);
        if (flyerData.flyer.hashtag != meta.hashtag) {
          throw new Error("hashtag no concuerda con el Flyer");
        }

        const normalizeId = (id: string | number) => String(id).replace(/^0+/, "") || "0"; //saco los 0 del inicio
        
        if (normalizeId(flyerData.business[0].business_id) !== normalizeId(meta.business_id)) {
          throw new Error("Id Business no concuerda con el Flyer");
        }

        if (normalizeId(flyerData.business[0].store_id) !== normalizeId(meta.store_id)) {
          throw new Error("Id Store no concuerda con el Flyer");
        }

        if (expired(flyerData.flyer.expired_date)) {
          setDateExpired(flyerData.flyer.expired_date);
          setStatus("expired");
        } else {
          // console.log(flyerData);
          
          loadFlyerData(flyerData, meta);
          setStatus("done");
        }
      } catch (error: any) {
        // console.log(error);
        setMsgError(error.message || "Error desconocido");
        setStatus("error");
      }
    };

    loadData();
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
