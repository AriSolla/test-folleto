import devMeta from "../../meta.dev.json"; // solo para desarrollo

// 🔹 Función para leer el meta.json
export const readMeta = async () => {
  try {
    let meta: any;

    if (import.meta.env.DEV) {
      // En desarrollo: usar archivo local para pruebas
      meta = devMeta;      
    } else {
      // En producción: traerlo del servidor
      const response = await fetch(`${import.meta.env.BASE_URL}meta.json`, { cache: "no-cache" });
      if (!response.ok) throw new Error("No se pudo cargar meta.json");
      meta = await response.json();
    }

    return meta;
  } catch (err) {
    console.error("Error leyendo meta:", err);
    return null;
  }
};
