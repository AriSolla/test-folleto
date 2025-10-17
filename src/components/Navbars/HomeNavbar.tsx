import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Badge, IconButton, TextField } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { readMeta } from '../../services/metaService';
import React from 'react';
import { useFlyer } from '../../context/FlyerContext';

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
  onMenuClick: () => void;

}

export default function HomeNavbar({
  search,
  setSearch,
  onMenuClick
}: NavbarProps) {
    const {getTotalItems} = useCart();
    const {meta, business} = useFlyer()
    const navigate = useNavigate()
    const [logo, setLogo] = React.useState<string| undefined>(undefined);

    React.useEffect(() => {
      const fetchLogo = async () => {
        let metaData: any = await readMeta();
        if(!metaData) metaData = meta
        const url = `${metaData.logo_image}${business.logo_image}`
        setLogo(url || "");
      };
      fetchLogo();
    }, []);

  return (
    <div style={{marginBottom:100}}>
      <AppBar position="fixed" sx={{backgroundColor:"#723449"}}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '20px' }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ height: '50px' }}
                />
              </div>
              <IconButton style={{ borderLeft: 'solid 1px white', borderRadius: '0' }} onClick={onMenuClick}>
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
            </div>
          </Box>

          {/* Buscador centrado */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <TextField
              variant="outlined"
              fullWidth
              value={search}     
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Productos..."
              sx={{
                width: '70%',
                background: 'white',
                borderRadius: '50px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                },
                '& .MuiInputBase-input': {
                  padding: '8px 12px',
                  fontSize: '0.9rem',
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="cart" onClick={() => navigate('/cart')}>
              <Badge badgeContent={getTotalItems()} color="error">
                <LocalMallIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
