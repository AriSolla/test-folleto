import { styled } from '@mui/system';
import Box from '@mui/material/Box';

interface ContenedorProps{
    badge_style: any;
}

export const Contenedor = styled(Box)(({}:ContenedorProps) => {
     return{
            width:'100%',
            height:'75%',
            top: "0px",
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "flex-start",
            justifyContent: "flex-start",
           
        }
  
});
