import { useEffect, useState } from "react";
import axios from "axios";
import Piechart from "./Piechart";
import Navbar from "./Navbar";
import Backcomp from "./Backcomp";

function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/allorders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Back Button - Top Left */}
      <div className="absolute top-20 left-4 z-50">
        <Backcomp />
      </div>

      {/* Main Container */}
      <div className="min-h-screen bg-gray-700 p-4 md:p-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10">
          📦 All Orders
        </h1>

        <div className="space-y-10">
          {orders.map((order) => (
            <div
              key={order.id}
              className="
                w-full 
                bg-gradient-to-r from-red-200 to-blue-500
                text-black
                rounded-3xl 
                shadow-2xl 
                p-8 
                transition-transform 
                hover:scale-[1.01]
              "
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-bold">Order #{order.id}</h2>
                  <p className="text-black-200">
                    {new Date(order.added_on).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="bg-white text-blue-700 px-6 py-2 rounded-full font-bold shadow-lg text-lg">
                    ₹{order.total}
                  </span>
                </div>
              </div>

              {/* User Info */}
              <div className="mt-6 bg-white text-gray-900 p-5 rounded-xl shadow">
                <p className="text-xl font-semibold">
                  👤 User ID:{" "}
                  <span className="text-blue-600 font-bold">{order.user.id}</span>
                </p>
                <p className="text-gray-600 mt-1">
                  ✉ Email: <span className="font-medium">{order.user.email}</span>
                </p>
              </div>

              {/* Items */}
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4">🛍 Items</h3>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="
                        bg-white 
                        text-gray-900 
                        rounded-xl 
                        shadow 
                        p-5 
                        flex 
                        flex-col 
                        gap-2 
                        hover:shadow-lg 
                        transition
                      "
                    >
                      <p className="text-lg font-bold">
                        {item.category.name || item.category || "Item"}
                      </p>

                      <p className="font-medium">
                        Quantity:{" "}
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllOrders;
