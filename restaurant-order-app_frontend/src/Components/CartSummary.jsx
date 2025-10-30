import React from 'react';

const CartSummary = ({ cart }) => {
  if (!cart || cart.length === 0) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="mt-8 p-4 border-t">
      <h3 className="text-xl font-semibold mb-2">🛍 Cart Summary</h3>
      <ul className="list-disc ml-6 text-gray-700">
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.name} — {item.qty} × ₹{item.price} = ₹{item.qty * item.price}
          </li>
        ))}
      </ul>
      <p className="font-bold mt-3">Total: ₹{total}</p>
      
    </div>
  );
};

export default CartSummary;
