import { Box, CircularProgress } from "@mui/material";

interface Props{
    alt:string;
    src:string | undefined;
    imageLoading: boolean;
    setImageLoading: (value: boolean) => void;
}

export default  function ProductImage  ({ src, alt, imageLoading, setImageLoading }:Props) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 1,
        overflow: "hidden",
        mr: 2,
      }}
    >
      {imageLoading ? (
       <Box sx={{textAlign:'center', padding:'1rem'}}>
          <CircularProgress size={35} />
        </Box>
      ):(
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={() => setImageLoading(false)}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 1,
            objectFit: "cover",
          }}
        />
      )}

    </Box>
  );
};
