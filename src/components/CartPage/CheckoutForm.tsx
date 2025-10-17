// CheckoutForm.tsx
import { Box, TextField, Button, Typography, Divider, } from "@mui/material";
import { useCart } from "../../context/CartContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFlyer } from "../../context/FlyerContext";
import { readMeta } from "../../services/metaService";

interface Props {
  isDesktop: boolean;
  onClose: () => void;
  setOutdatedFlyer: (boolean:boolean) => void; 
  setExpiredFlyer: (boolean:boolean) => void;
}
export default function CheckoutForm({ onClose, isDesktop, setExpiredFlyer, setOutdatedFlyer }: Props) {
  const {flyerDataFull, business} = useFlyer()
  const {getProductListString} = useCart()
  const navigate = useNavigate()

  const [note, setNote] = React.useState<string>("");

  const expired = (expired_date: string) => {
    const today = new Date();
    return new Date(expired_date) < today;
  };

  const finalizarCompra = async () => {
    onClose()
    let meta: any = await readMeta()
      // Verificar si el hash cambio (hubo un cambio en los flyerData del servidor)
      if(meta.hashtag != flyerDataFull?.flyer.hashtag){
        setOutdatedFlyer(true)
        return
      }
      //Verificar primero si el folleto vencio por fecha
      if (expired(flyerDataFull!.flyer.expired_date)) {
        setExpiredFlyer(true)
        return
      }

    // const phoneNumber = business.phone;
    const rawPhone = business.phone; // Argentina: 54 + 9 + código + número
    const phoneNumber = rawPhone.replace(/\D/g, ""); 
    const titulo = "Hola, quiero realizar un pedido con los siguientes productos:";
    const productos = getProductListString();

    let message = `${titulo}\n${productos}`

    if(note) message+=`\n**Nota adicional**\n${note}`

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank"); // se abre en nueva pestaña
    navigate("/checkout/success")
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: isDesktop ? 4 : 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Datos de Compra
        </Typography>

        <Divider sx={{ width: "100%", mb: 2 }} />

        <Box sx={{ width: "100%" }}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ alignSelf: "start" }}
          >
            📝 Notas adicionales:
          </Typography>
          <TextField
            placeholder="OPCIONAL: Nota para tener en consideración, ej: A que hora se pasa a buscar el pedido; si falta un producto cambiarlo por otro; etc."
            multiline
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNote(event.target.value)}
          />
        </Box>

        {/* Más campos si querés */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 3,
            flexDirection: isDesktop ? "row" : "column",
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={finalizarCompra}>
            Finalizar compra
          </Button>
        </Box>
      </Box>
    </>
  );
}
