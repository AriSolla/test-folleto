import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '@mui/material';

interface Props {
    openDeleteCartDialog: () => void;

}

export default function CartNavbar({openDeleteCartDialog}:Props) {

  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const totalItems = getTotalItems();

  return (
    <div style={{marginBottom:100}}>
        <AppBar position="fixed" sx={{backgroundColor:"#723449"}} elevation={2}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            
            {/* Botón volver */}
            <IconButton color="inherit" onClick={() => {
                if (window.history.length > 1) {
                    // Va a la página anterior del navegador
                    window.history.back();
                } else {
                    // Si no hay historial, va al home
                    navigate('/');
                }
                }}
            >
                <ArrowBackIcon />
            </IconButton>

            {/* Nombre del negocio */}
            <Typography variant="h6" noWrap component="div">
                {'Tu pedido'}
            </Typography>

            {/* Botón vaciar carrito */}
            <Tooltip title="Vaciar carrito">
                <span>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={openDeleteCartDialog}
                        disabled={totalItems === 0}
                        startIcon={<RemoveShoppingCartIcon />}
                        sx={{ paddingRight: "5px" }} 
                        >
                    </Button>
                    </span>
            </Tooltip>

        </Toolbar>
        </AppBar>
    </div>
  );
}
