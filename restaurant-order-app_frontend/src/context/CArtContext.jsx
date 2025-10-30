import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const exist = cart.find(i => i.id === item.id);
    if(exist){
      setCart(cart.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));

  const increaseQty = (id) => setCart(cart.map(i => i.id === id ? {...i, quantity: i.quantity + 1} : i));

  const decreaseQty = (id) => setCart(cart.map(i => i.id === id ? {...i, quantity: Math.max(i.quantity - 1, 1)} : i));

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
