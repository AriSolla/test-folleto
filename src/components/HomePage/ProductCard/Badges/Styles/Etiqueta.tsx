import { styled } from '@mui/system';
import Box from '@mui/material/Box';
interface EtiquetaProps{
    badge_style: any;
    is_row: string;
}

export const Etiqueta = styled(Box)(({ is_row }: EtiquetaProps) => {
    return{
            backgroundColor: "#34b810d1",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: is_row ? "row" : "column",
            alignItems: "center",
            fontSize: "2.5rem",
            fontWeight: "500",
        }
  
});