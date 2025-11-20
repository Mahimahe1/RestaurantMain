import { ShoppingBag, Calendar } from "lucide-react";
import Navbar from "./Navbar";
import Backcomp from "./Backcomp";
export default function Orders({ orders }) {
  return (
    <>
    <div className="w-full">
          <Navbar />
    </div>
    <div className="absolute top-20 left-4 z-50">
      <Backcomp />
    </div>
    <div className="max-w-5xl mx-auto p-6">
        
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2">
        <ShoppingBag className="w-7 h-7 text-blue-600" />
        Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="mb-6 shadow-md border border-gray-100 rounded-2xl">
            <div className="p-5">
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-lg">Order #{order.id}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(order.added_on).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-blue-600">
                    ₹{order.total.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Total</p>
                </div>
              </div>

              <hr className="mb-4" />

             
              {order.items && order.items.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.category.img}
                          alt={item.category.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.category.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.category.price} × {item.quantity} 
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{(parseFloat(item.category.price) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No items found.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
}

