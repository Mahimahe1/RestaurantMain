import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const url = "http://127.0.0.1:8000/api/viewcart/";
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate=useNavigate()

 
  useEffect(() => {
    if (!token) return;
    axios
      .get(url, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((resp) => setCart(resp.data))
      .catch((err) => console.log(err));
  }, [token, refresh]);


  const total = cart.reduce(
    (sum, item) => sum + item.category.price * item.quantity,
    0
  );

 
  const updateQuantity = (item, newQty) => {
    if (newQty < 1) return;
    axios
      .put(
        `http://127.0.0.1:8000/api/updatecart/${item.id}/`,
        { quantity: newQty },
        { headers: { Authorization: `Token ${token}` } }
      )
      .then(() => setRefresh(!refresh))
      .catch((err) => console.log(err));
  };

 {/* 
  const removeItem = (item) => {
    axios
      .delete(`http://127.0.0.1:8000/api/deletecart/${item.id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(() => setRefresh(!refresh))
      .catch((err) => console.log(err));
  };

  */}

const removeItem = (item) => {
  axios
    .delete(`http://127.0.0.1:8000/api/deletecart/${item.id}/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then(() => {
      // Refresh cart
      setRefresh(!refresh);

      // Temporary check BEFORE React re-renders
      if (cart.length === 1) {
        navigate("/view"); // 
      }
    })
    .catch((err) => console.log(err));
};


  
  const OrderedItem = () => {
    const geturl = "http://127.0.0.1:8000/api/Order/";
    const userid = localStorage.getItem("userid");

    axios
      .post(
        geturl,
        { user: userid, total },
        { headers: { Authorization: `Token ${token}` } }
      )
      .then(() => {
        setRefresh(!refresh);
        navigate('/payment')
      })
      .catch((err) => console.log(err));
  };

  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100">
        <p className="text-gray-700 text-lg font-medium bg-white px-6 py-3 rounded-2xl shadow-md">
          🛒 Your cart is empty
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🛍 Cart Summary
        </h3>

       
        <div className="space-y-4">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 hover:bg-gray-100 transition-all duration-200 p-4 rounded-2xl border border-gray-200"
            >
              
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <img
                  src={item.category.img}
                  alt={item.category.name}
                  className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {item.category.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{item.category.price.toLocaleString()}
                  </p>
                </div>
              </div>

              
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
                  <button
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>

                  <span className="w-8 text-center font-medium text-gray-800">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>

                  
                  <p className="font-semibold text-gray-800 text-lg ml-3">
                    ₹{(item.quantity * item.category.price).toLocaleString()}
                  </p>

                  
                  <button
                    onClick={() => removeItem(item)}
                    className="p-1.5 hover:bg-red-100 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex justify-between items-center mt-8 border-t pt-4">
          <p className="text-xl font-semibold text-gray-800">Total</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{parseInt(total).toLocaleString()}
          </p>
        </div>

        <button
          onClick={OrderedItem}
          className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-200"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default CartSummary;

