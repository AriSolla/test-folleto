import { useEffect } from "react";

export function useSession(expiryMinutes: number, inactiveMinutes:number) {
  useEffect(() => {
    // Sesión por tiempo total
    const sessionExpiry = Date.now() + expiryMinutes * 60 * 1000;
    localStorage.setItem("sessionExpiry", sessionExpiry.toString());

    // Función que chequea si expiró
    const checkExpiry = () => {
      const expiry = localStorage.getItem("sessionExpiry");
      if (!expiry) return false;
      if (Date.now() > parseInt(expiry, 10)) {
        localStorage.removeItem("sessionExpiry");
        alert("Sesión expirada");
        window.location.reload(); // o redirigir a login
        return false;
      }
      return true;
    };

    const interval = setInterval(checkExpiry, 1200000); //20 mins

    // Sesión por inactividad
    let inactiveTimeout: any;
    const resetInactiveTimer = () => {
      clearTimeout(inactiveTimeout);
      inactiveTimeout = setTimeout(() => {
        alert("Inactivo demasiado tiempo, sesión expirada");
        window.location.reload();
      }, inactiveMinutes * 60 * 1000);
    };

    window.addEventListener("mousemove", resetInactiveTimer);
    window.addEventListener("keydown", resetInactiveTimer);
    window.addEventListener("click", resetInactiveTimer);
    resetInactiveTimer();

    return () => {
      clearInterval(interval);
      clearTimeout(inactiveTimeout);
      window.removeEventListener("mousemove", resetInactiveTimer);
      window.removeEventListener("keydown", resetInactiveTimer);
      window.removeEventListener("click", resetInactiveTimer);
    };
  }, [expiryMinutes, inactiveMinutes]);
}
