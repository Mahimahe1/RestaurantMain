

import React, { useEffect, useState } from "react";
import Changeaddress from "./Changeaddress";

export default function Paymentpage() {
  const [address, setAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("upi1");
  const [loading, setLoading] = useState(false);
  const [showChangePage, setShowChangePage] = useState(false);
  

  useEffect(() => {
     const stored = localStorage.getItem("selectedAddress");
    if (stored) {
      setAddress(JSON.parse(stored));
      return; // don't fetch again if we already have one
    }
    // Fetch user's default address
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/api/get_addresses/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const defaultAddress = data.find((a) => a.is_default) || data[0];
        setAddress(defaultAddress);
      });
  }, []);

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      alert(`Payment via ${selectedPayment} initiated`);
      alert('Order placed Succesfully')
      setLoading(false);
    }, 1000);
  };

  const handleChangeAddress = () => {
    setShowChangePage(true);
  };

  // 👇 callback from Changeaddress when user selects one
  const handleSelectAddress = (selectedAddress) => {
    setAddress(selectedAddress);
    setShowChangePage(false); // close the Changeaddress page
    console.log("Selected Address:", selectedAddress);
  };

  // If user clicked "Change delivery address", show that page
  if (showChangePage) {
    return <Changeaddress onSelectAddress={handleSelectAddress} />;
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl border border-gray-200">
       
        <div className="p-4 border-b">
          {address ? (
            <>
              <h2 className="text-lg font-semibold text-gray-800">
                Delivering to {address.full_name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {address.house_no}, {address.street},{address.phone_number}, {address.landmark && `${address.landmark}, `}
                {address.city}, {address.state}, {address.pincode}, {address.country}
              </p>
              <button onClick={handleChangeAddress} className="text-indigo-600 text-sm mt-2 hover:underline">
                Change delivery address
              </button>
            </>
          ) : (
            <p>Loading address...</p>
          )}
        </div>

        
        <div className="p-4">
          <button
            onClick={handleContinue}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </div>

        {/* Payment Section */}
        <div className="border-t p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Select a payment method
          </h3>

          <div className="space-y-3">
            {[
              { id: "upi1", name: "Amazon Pay UPI (Andhra Pragathi Grameena Bank **1234)" },
              { id: "upi2", name: "Amazon Pay UPI (Canara Bank **1234)" },
              { id: "phonepe", name: "PhonePe" },
              { id: "gpay", name: "Google Pay" },
              { id: "upi_any", name: "Pay by any UPI App" },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                  selectedPayment === method.id ? "border-yellow-400 bg-yellow-50" : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                />
                <span className="ml-3 text-gray-700 text-sm">{method.name}</span>
              </label>
            ))}
          </div>

          <button className="mt-4 text-blue-600 text-sm hover:underline">
            + Add account to Amazon Pay UPI
          </button>
        </div>
      </div>
    </div>
  );
}
