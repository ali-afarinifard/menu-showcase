import { useState } from 'react';
import { calculateTotals, products } from './data';

export function useMenu() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const changeQuantity = (id: string, delta: number) => {
    const product = products.find(item => item.id === id);
    if (!product?.available) return;
    setCart(current => {
      const next = { ...current };
      const quantity = Math.max(0, (next[id] || 0) + delta);
      if (quantity === 0) delete next[id]; else next[id] = quantity;
      return next;
    });
  };
  const removeItem = (id: string) => setCart(current => { const next = { ...current }; delete next[id]; return next; });
  const toggleFavorite = (id: string) => setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  return { cart, favorites, changeQuantity, removeItem, toggleFavorite, clearCart: () => setCart({}), count: Object.values(cart).reduce((sum, value) => sum + value, 0), ...calculateTotals(cart) };
}
export type MenuState = ReturnType<typeof useMenu>;