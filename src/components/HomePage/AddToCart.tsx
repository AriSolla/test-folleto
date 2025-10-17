import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useCart } from "../../context/CartContext"
import type { Product } from "../../models/Flyer";

interface Props{
    product: Product
    removeIcon?:boolean
}
const AddtoCart = ({product, removeIcon}:Props) => {
const { getItemQuantity, addRestQuantity } = useCart();


  const quantity = getItemQuantity(product.productPLU);


  const incrementQuantity = () => {
    addRestQuantity(product, 1)
  };

  // Función para decrementar la cantidad
  const decrementQuantity = () => {
    if (quantity > 0) {
      addRestQuantity(product, -1)
    }
  };

  return (
    <>
      <div style={{display: "flex", justifyContent:"space-evenly", alignItems:'center'}}>
        {getItemQuantity(product.productPLU) === 0 ? 
          (
            <div style={{ display: "flex", alignItems: "center", justifyContent: 'center',  }}>
                <IconButton 
                    onClick={incrementQuantity}
                    color="error" aria-label="add to shopping cart" 
                >
                  {!removeIcon ? <LocalMallIcon /> : (
                    <div style={{background:'red', padding:10, borderRadius:'30px', width:'1000%'}}>
                      <Typography color="white" fontWeight={600}>Agregar</Typography>
                    </div>
                  )}
                </IconButton>
            </div>
          )
          :
          (
            <div style={{ display: "flex", alignItems: "center", justifyContent: 'center',  height: '36px' }}>
              <IconButton
                onClick={decrementQuantity}
                aria-label="Decrementar cantidad"
                sx={{
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  '&:hover': {
                    borderColor: '#007fff',  // blue[500]
                    backgroundColor: '#daecff',  // blue[100]
                  },
                  '&:active': {
                    borderColor: '#0059B2',  // blue[700]
                    backgroundColor: '#66b2ff',  // blue[300]
                  },
                }}
              >
                <RemoveIcon />
              </IconButton>
              <div
                style={{
                  width: "64px",
                  height: "32px",
                  borderRadius: "4px",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 10px",
                }}
              >
                <Typography variant="body1">{quantity}</Typography>
              </div>
              <IconButton
                onClick={incrementQuantity}
                aria-label="Incrementar cantidad"
                sx={{
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  '&:hover': {
                    borderColor: '#007fff',  // blue[500]
                    backgroundColor: '#daecff',  // blue[100]
                  },
                  '&:active': {
                    borderColor: '#0059B2',  // blue[700]
                    backgroundColor: '#66b2ff',  // blue[300]
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
          )
        }
      </div>
    </>
  );
};



export default AddtoCart;
