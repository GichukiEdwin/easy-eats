"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

const queryClient = new QueryClient();
export const CartContext = createContext({});
export const Provider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  const clearCart = () => {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  };

  const removeFromCart = (productId) => {
    setCartProducts((prevProducts) => {
      const newProducts = prevProducts.filter(
        (product) => product._id !== productId
      );
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  };

  const saveCartProductsToLocalStorage = (cartProducts) => {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  };

  const addToCart = (product, size = null, extras = []) => {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  };

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <CartContext.Provider
          value={{
            cartProducts,
            setCartProducts,
            addToCart,
            clearCart,
            removeFromCart,
          }}
        >
          {children}
        </CartContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};
