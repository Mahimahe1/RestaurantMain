import { useEffect,useState } from "react";
import axios from "axios";
function CartSummary()  {
  let url="http://127.0.0.1:8000/api/viewcart/";
  let token=localStorage.getItem("token");
  
  let [cart,setCart]=useState([])
  let [empty,setempty]=useState(false)

  useEffect(()=>{ 
    if (!token) return;
    axios.get(url,{
    headers:{
      "Authorization":`Token ${token}`,
    }
  }).then((resp)=>{
    setCart(resp.data)
    console.log(resp.data)
  }).catch((err)=>{console.log(err)}) },[empty]);

            if (cart.length === 0) {
              return <p className="text-gray-500 mt-4">Your cart is empty.</p>;
            }

  let OrderedItem=()=>{
    let geturl="http://127.0.0.1:8000/api/Order/";
    let userid=localStorage.getItem("userid");
        axios.post(geturl,{
          "user":userid,
          "total":total
        },{
        headers:{
          "Authorization":`Token ${token}`,
        }
      }).then((resp)=>{
        alert("Order placed Succesfully")
        setempty(!empty)
          console.log(resp)
        }).catch((err)=>{
          console.log(err)
        })
        
      }

  const total = cart.reduce((sum, item) => sum + item.category.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">🛍 Cart Summary</h3>

        <div className="space-y-4">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-all duration-200 p-4 rounded-xl border border-gray-200"
            >
              <div>
                <p className="font-semibold text-gray-800">{item.category.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × ₹{item.category.price}
                </p>
              </div>
              <p className="font-semibold text-gray-700">
                ₹{item.quantity * item.category.price}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <p className="text-lg font-semibold text-gray-800">Total</p>
          <p className="text-xl font-bold text-gray-900">₹{parseInt(total)}</p>
        </div>

        <button
          onClick={OrderedItem}
          className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          Order Now
        </button>
      </div>
    </div>

  );
};

export default CartSummary;
