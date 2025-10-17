import { Dialog, DialogContent, Grid, CircularProgress, Typography, DialogActions, Button, Box, Divider } from '@mui/material'
import type { Product } from '../../models/Flyer';
import AddtoCart from './AddToCart';
import { formatCurrency } from '../../utils/formatPrice';
import { getPriceSelected } from '../../utils/getPriceSelected';
import { useFlyer } from '../../context/FlyerContext';
import { getUnidad } from '../../utils/getUnidad';

interface Props {
    open: boolean;
    onClose: () => void;
    product: Product | null;
    productImage:string | undefined;
    imageLoading: boolean;
    isSmallScreen: boolean;

}
const ProductModal = ({open, onClose, product, productImage, imageLoading, isSmallScreen}: Props) => {
  if(!product) return
  const {business} = useFlyer()
  const precioDefault = getPriceSelected(product, business.price_default)
  const showNetPrice = business.ivaCondition != "Monotributo"
  
  return (
    <>
    {isSmallScreen ? (
      // MOBILE VISTA
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock>
          <DialogContent  sx={{pb:0}}>
              {product && (
                  <Grid container spacing={0}>
                      {/* Columna para la imagen */}
                      <Grid size={{xs:12, sm: 5.5}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb:2}}>
                          {imageLoading ? (
                              <div>
                                  <CircularProgress size={100} color="warning"/>
                                  </div>
                              ) : (
                                  <img 
                                  src={productImage} 
                                  alt={product.productName} 
                                  style={{ width: "75%", height: "auto", margin:'auto' }} 
                                  />
                              )}
                      </Grid>

                      {/* Columna para los detalles */}
                      <Grid size={{xs:12, sm: 6.5}} sx={{display:'flex', flexDirection:'column'}}>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight:"600" }}>
                            {product.productName}
                          </Typography>
                          <Typography variant="body2" color='text.secondary'>
                            {product.productDesc}
                          </Typography>
                        </Box>
                        <Box mt={1}>
                          <Typography variant="caption">
                            PLU: <span style={{fontWeight:'bold'}}>{product.productPLU}</span>
                          </Typography>
                        </Box>
                        <Box mt={0}>
                          <Typography variant="subtitle2">
                            Cant.: <span style={{fontWeight:'bold'}}>{product.quantity} {product.typeUnit}</span>
                          </Typography>
                        </Box>
                        <Box mt={2}>
                          <Typography variant="h6" sx={{color:'green', fontWeight:'bold'}}>
                            ${formatCurrency(precioDefault)} c/u
                          </Typography>
                          {showNetPrice && (
                            <Typography variant="subtitle2" color="text.secondary">
                              Precio sin impuestos nacionales: ${formatCurrency(product.NetPrice)}
                            </Typography>
                          )}
                            <Typography variant="subtitle2" color="text.secondary">
                              Precio por {getUnidad(product)} ${formatCurrency(product.priceunit)}
                            </Typography>
                        </Box>
                        
                        <Box mt={'auto'}>
                         <AddtoCart product={product} removeIcon={true}/>
                        </Box>
                        
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
    ):(
      // PC VISTA
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
                      <Grid size={{xs:12, sm: 6.5}} sx={{display:'flex', flexDirection:'column'}}>
                        <Box>
                          <Typography variant="h3" sx={{ fontWeight:"600" }}>
                            {product.productName}
                          </Typography>
                          <Typography variant="h5" color='text.secondary'>
                            {product.productDesc}
                          </Typography>
                        </Box>
                        <Divider/>
                        <Box mt={2}>
                          <Typography variant="subtitle2">
                            PLU: <span style={{fontWeight:'bold'}}>{product.productPLU}</span>
                          </Typography>
                        </Box>
                        <Box mt={0}>
                          <Typography variant="subtitle2">
                            Cant.: <span style={{fontWeight:'bold'}}>{product.quantity} {product.typeUnit}</span>
                          </Typography>
                        </Box>
                        <Box mt={'auto'}>
                          <Typography variant="h4" sx={{color:'green',fontWeight:'bold'}}>
                            ${formatCurrency(precioDefault)} c/u
                          </Typography>
                          {showNetPrice && (
                            <Typography variant="subtitle2" color="text.secondary">
                              Precio sin impuestos nacionales: ${formatCurrency(product.NetPrice)}
                            </Typography>
                          )}
                            <Typography variant="subtitle2" color="text.secondary">
                              Precio por {getUnidad(product)} ${formatCurrency(product.priceunit)}
                            </Typography>
                        </Box>
                        
                        {/* <ModalBadges product={product} cents={0} /> */}
                        <Box mt={'auto'}>
                          <AddtoCart product={product} removeIcon={true}/>
                        </Box>
                        
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
    )}
      
    </>
  )
}

export default ProductModal