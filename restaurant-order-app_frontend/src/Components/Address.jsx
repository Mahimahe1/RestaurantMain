import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAddressForm() {
  const token = localStorage.getItem("token");
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    house_no: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    address_type: "home",
    is_default: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,  //TO update the feilds on what we entered the value ONCHANGE
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/address/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          full_name: "",
          phone_number: "",
          house_no: "",
          street: "",
          landmark: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
          address_type: "home",
          is_default: false,
        });
        navigate('/payment')
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl border border-indigo-100">
        <div className="p-6 border-b border-indigo-100 text-center">
          <h2 className="text-2xl font-semibold text-indigo-600">
            🏠 Add New Address
          </h2>
        </div>

      
        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Mahendra Reddy"
              required
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="6303619658"
              required
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              House / Flat No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="house_no"
              value={formData.house_no}
              onChange={handleChange}
              placeholder="12B"
              required
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="MG Road"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Near City Mall"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Anantapur"
              required
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Andhra Pradesh"
              required
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="560001"
              required
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="India"
              required
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Type
            </label>
            <select
              name="address_type"
              value={formData.address_type}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>

         
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="is_default"
              checked={formData.is_default}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">
              Set as Default Address
            </label>
          </div>

      
          <div className="sm:col-span-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
            >
              {loading ? "Saving..." : "Add Address"}
            </button>
          </div>
        </form>

       
        {success && (
          <p className="text-green-600 text-center mt-4 font-medium">
            ✅ Address added successfully!
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">
            ❌ {error}
          </p>
        )}
      </div>
    </div>
  );
}
