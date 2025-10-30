import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './Hero';
import Footer from './Footer';
import CartSummary from './CartSummary'; // ✅ Import here

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories/")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (name, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max((prev[name] || 0) + delta, 0),
    }));
  };

  const handleAddToCart = (item) => {
    const qty = quantities[item.name] || 1;
    setCart((prev) => [...prev, { ...item, qty }]);
    alert(`${item.name} added to cart (${qty}x)`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="p-8">
      <Hero />
      <h2 className="text-2xl font-bold mb-6 text-center">🍽 Explore Categories</h2>

      {/* ✅ Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="shadow-lg rounded-2xl overflow-hidden hover:scale-105 transform transition"
          >
            <img src={cat.img} alt={cat.name} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-lg">{cat.name}</h3>
              <p className="text-gray-600">₹{cat.price}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(cat.name, -1)}
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">
                    {quantities[cat.name] || 0}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(cat.name, 1)}
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(cat)}
                  className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Cart Summary as separate component */}
      

      <Footer />
    </div>
  );
};

export default Categories;
