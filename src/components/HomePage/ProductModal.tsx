import { Dialog, DialogContent, Grid, CircularProgress, Typography, DialogActions, Button } from '@mui/material'
import type { Product } from '../../models/Flyer';
import AddtoCart from './AddToCart';
import ModalBadges from './ModalBadges';

interface Props {
    open: boolean;
    onClose: () => void;
    product: Product | null;
    productImage:string;
    imageLoading: boolean;

}
const ProductModal = ({open, onClose, product, productImage, imageLoading}: Props) => {
  return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth disableScrollLock >
        <DialogContent>
            {product && (
                <Grid container spacing={2}>
                    {/* Columna para la imagen */}
                    <Grid size={{xs:12, sm: 5.5}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {imageLoading ? (
                            <div>
                                <CircularProgress size={100} color="warning"/>
                                </div>
                            ) : (
                                <img 
                                src={productImage} 
                                alt={product.productName} 
                                style={{ width: "100%", height: "auto", margin:'auto' }} 
                                />
                            )}
                    </Grid>

                    {/* Columna para los detalles */}
                    <Grid size={{xs:12, sm: 6.5}}>
                      <Typography variant="h4" sx={{ marginTop: 0 }}>
                        {product.productName}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.7rem', marginTop: '5px', marginBottom:'15px' }}>
                        PLU: {product.productPLU}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        <span style={{ color: 'green' }}>Precio normal: </span>
                        <span style={{ color: 'black' }}>${product.precioVenta.toFixed(0)} c/u</span>
                      </Typography>          
                      <ModalBadges product={product} cents={0} />
                      
                      <AddtoCart product={product}/>
                      
                    </Grid>
                </Grid>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
            Cerrar
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ProductModal