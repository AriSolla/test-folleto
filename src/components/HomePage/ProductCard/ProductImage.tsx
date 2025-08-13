import React from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import noImage from '../../../assets/noImage.png'
// ✅ Usamos un 'img' directo
const FixedSizeMedia = styled('img')(() => ({
  width: '95%',
  marginLeft: '35px',
  height: '180px',
  objectFit: 'contain',
  zIndex: -1,
}));

const StyledCircularProgress = styled('div')({
  width: '90%',
  height: '180px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

interface ImageCardProps {
  image: string;
  productName: string;
  imageLoading: boolean;
  setImageLoading: (value: boolean) => void;
}

const ProductImage: React.FC<ImageCardProps> = ({ image, productName, imageLoading, setImageLoading }) => {
  const src = image !== '' ? image : noImage
  return (
    <>
      {imageLoading ? (
        <StyledCircularProgress>
          <CircularProgress />
        </StyledCircularProgress>
      ) : (
        <FixedSizeMedia
          src={src}
          alt={productName}
          onLoad={() => setImageLoading(false)}
        />
      )}
    </>
  );
};

export default ProductImage;
