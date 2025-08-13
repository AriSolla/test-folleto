import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../models/Flyer";
import { useFlyer } from "./FlyerContext";

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productPLU: string) => void;
  updateCart: (productPLU: string, quantity: number) => void;
  clearCart: () => void;
  addRestQuantity: (product: Product, num: number) => void;
  getItemQuantity: (plu: string) => number;
  getTotalItems: () => number;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  increaseQuantity: (plu: string) => void;
  decreaseQuantity: (plu: string) => void;
  getProductListString: () => string;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const { productList } = useFlyer();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [hasInitializedCart, setHasInitializedCart] = useState(false);

  //Carga nuevamente los items de la session al carrito
  useEffect(() => {
    const saved = sessionStorage.getItem("cart");

    if (!saved || productList.length === 0) return;
    const parsed = JSON.parse(saved);

    try {
      const fullItems = parsed
        .map(({ plu, cartQuantity }: { plu: string; cartQuantity: number }) => {
          const product = productList.find((p) => p.productPLU === plu);
          if (!product) return null;
          return { ...product, cartQuantity };
        })
        .filter(Boolean);

      setCartItems(fullItems);
      setHasInitializedCart(true);
    } catch (e) {
      sessionStorage.removeItem("cart");
      console.error("Error al cargar carrito:", e);
    }
  }, [productList]);

  //Guardo al session los productos sin exponer datos sensibles en el navegador
  useEffect(() => {
    if (!hasInitializedCart) return;

    const simplified = cartItems.map(({ productPLU, cartQuantity }) => ({
      plu: productPLU,
      cartQuantity,
    }));
    sessionStorage.setItem("cart", JSON.stringify(simplified));
  }, [cartItems, hasInitializedCart]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productPLU === product.productPLU
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.productPLU === product.productPLU
            ? { ...item, cartQuantity: item.cartQuantity! + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, cartQuantity: quantity }];
    });
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateCart = (productPLU: string, quantity: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productPLU === productPLU) {
        return { ...item, cartQuantity: quantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productPLU: string) => {
    // Implementa la lógica para eliminar un producto del carrito
    const updatedCartItems = cartItems.filter(
      (item) => item.productPLU !== productPLU
    );
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addRestQuantity = (product: Product, num: number) => {
    let existingProducto = cartItems.find(
      (item) => item.productPLU === product.productPLU
    );

    if (existingProducto) {
      const updatedCartItems = cartItems
        .map((item) => {
          if (item.productPLU === product.productPLU) {
            return { ...item, cartQuantity: item.cartQuantity! + num };
          }
          return item;
        })
        .filter((item) => item.cartQuantity! > 0);
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...product, cartQuantity: 1 },
      ]);
    }
  };

  const decreaseQuantity = (plu: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productPLU === plu && item.cartQuantity! > 1
          ? { ...item, cartQuantity: item.cartQuantity! - 1 }
          : item
      )
    );
  };

  const increaseQuantity = (plu: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productPLU === plu
          ? { ...item, cartQuantity: item.cartQuantity! + 1 }
          : item
      )
    );
  };

  const getItemQuantity = (plu: string) => {
    let item = cartItems.find((item) => item.productPLU === plu);
    return item ? item.cartQuantity! : 0;
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  const getTotalQuantity = () => {
    let contador = 0;
    cartItems.map((item) => {
      contador += item.cartQuantity!;
    });
    return contador;
  };

  const getTotalPrice = () => {
    let contador = 0;
    cartItems.map((item) => {
      let price;
      if (item.isPromo && item.isPromo === "S") price = item.precioPromo;
      else price = item.precioVenta;

      contador += item.cartQuantity! * price;
    });
    return contador;
  };

  const getProductListString = () => {
    let list = "";

    cartItems.map((item) => {
      list += `- ${item.productName} x${item.cartQuantity} (c/u$${item.precioVenta})\n`;
    });
    return list;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        addRestQuantity,
        getItemQuantity,
        getTotalItems,
        increaseQuantity,
        decreaseQuantity,
        getTotalQuantity,
        getTotalPrice,
        getProductListString,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
