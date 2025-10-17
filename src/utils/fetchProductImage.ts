export const fetchProductImage = async (
  ean: string,
  meta: any
): Promise<string | null> => {
  const fallbackEan = "0000000000000";
  const fallbackImg = await fetchFallback(fallbackEan, meta)

  // Intentar con la API que devuelve base64
  let img = await fetchFromApi(ean, meta);
  if (img) return img;
  
  // // Si la API falla, intentar con la URL del meta
  img = await fetchFromMeta("ean", meta);
  if(img) return img;


  return fallbackImg || null //si no se consigue imagen
};


// ===================================================
// 🔹 Función que usa tu endpoint image.php
// ===================================================
const fetchFromApi = async (
  ean: string,
  meta: any
): Promise<string | null> => {
  try {
    // Imagen principal
    const response = await fetch(
      `https://image.rtitec.com.ar/image.php?image&ean=${ean}&ibusiness=${meta.business_id}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.length > 0 && data[0].image) {
        return data[0].image; // base64
      }
    }
    return null;
  } catch (error) {
    console.error(`Error ${ean}:`, error);
    return null;
  }
};

// ===================================================
//  Función que usa el CDN meta.products_image
// ===================================================
const fetchFromMeta = async (
  ean: string,
  meta: any
): Promise<string | null> => {
  const url = `${meta.products_image}/${ean}.jpg`;

  try {
    const res = await fetch(url);
    if (res.ok) return url;
    return null;
  } catch (error) {
    console.error(`Error ${ean}:`, error);
    return null;
  }
};


const fetchFallback = async (
  fallbackEan: string,
  meta: any
): Promise<string | null> => {
  try{
// Fallback si no hay imagen
    const fallbackResponse = await fetch(
      `https://image.rtitec.com.ar/image.php?image&ean=${fallbackEan}&ibusiness=${meta.business_id}`
    );

    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json();
      if (fallbackData.length > 0 && fallbackData[0].image) {
        return fallbackData[0].image;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fallback:`, error);
    return null;
  }
}