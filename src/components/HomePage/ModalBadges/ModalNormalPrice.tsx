import {Box} from '@mui/material'
import type { ModalBadgesProps } from '../ModalBadges';
import { formatCurrency } from '../../../utils/formatPrice';
import { getPriceSelected } from '../../../utils/getPriceSelected';
import { useFlyer } from '../../../context/FlyerContext';

const ModalNormalPrice = ({product}:ModalBadgesProps) => {
    const {business} = useFlyer()
    const precioDefault = getPriceSelected(product, business.price_default)
    
  return (
    <Box>
        <div style={{ background:'green', borderRadius: '30px 30px 0px 0px' }}>
            <div>
                <h2 style={{color:'white',textAlign:'center'}}>Precio</h2>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', color:'white', background:'red'}}>
                <div style={{display: 'flex', alignItems: 'center', margin: '0px 5px'}}>
                    <span>$</span>
                    <span style={{fontSize: '2.5rem',
                                fontWeight: 'bold',
                                padding: '0px 5px'}}>
                            {formatCurrency(precioDefault)}
                    </span>
                    <span>c/u</span>
                </div>
            </div>
        </div>
    </Box>
 )
}

export default ModalNormalPrice