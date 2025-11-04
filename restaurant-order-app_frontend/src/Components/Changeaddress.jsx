import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Changeaddress({ onSelectAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate=useNavigate()

  const token = localStorage.getItem("token");

  useEffect(() => {
    let token=localStorage.getItem("token")
    fetch("http://127.0.0.1:8000/api/get_addresses/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data);
        const defaultAddr = data.find((a) => a.is_default);
        if (defaultAddr) setSelectedId(defaultAddr.id);
      });
  }, [token]);

  const handleSelect = (id) => {
    setSelectedId(id);
    
  };

  let handleAddAddress = ()=>{
        navigate('/address')   
  };

  


  const handleUseAddress = () => {
    const selectedAddress = addresses.find((a) => a.id === selectedId);
    onSelectAddress(selectedAddress);
    if (!selectedAddress) return alert("Please select an address");
   
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));

    if (onSelectAddress) onSelectAddress(selectedAddress);

  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl border border-gray-200">
        <div className="border-b p-4 text-center">
          <h2 className="text-xl font-semibold text-indigo-600">
            📦 Choose Delivery Address
          </h2>
        </div>

        {/* Address List */}
        <div className="p-4 space-y-3">
          {addresses.length === 0 ? (
            <p className="text-gray-500 text-center">
              No saved addresses. Please add one.
            </p>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => handleSelect(addr.id)}
                className={`cursor-pointer border rounded-xl p-4 transition ${
                  selectedId === addr.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {addr.full_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {addr.house_no}, {addr.street}, {addr.city}, {addr.state} -{" "}
                      {addr.pincode}
                    </p>
                    <p className="text-sm text-gray-500">{addr.country}</p>
                  </div>
                  {selectedId === addr.id && (
                    <span className="text-green-600 font-medium text-sm">
                      ✔ Selected
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {addr.address_type.toUpperCase()}
                  {addr.is_default && " • Default"}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Buttons */}
        <div className="border-t p-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddAddress}
            className="w-full sm:w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition"
          >
            ➕ Add Delivery Address
          </button>

          <button
            onClick={handleUseAddress}
            disabled={!selectedId}
            className={`w-full sm:w-1/2 ${
              selectedId
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-medium py-2 rounded-lg transition`}
          >
            Use This Address
          </button>
        </div>
      </div>
    </div>
  );
}
