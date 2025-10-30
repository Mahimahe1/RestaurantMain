import React, { useState } from "react";
import axios from "axios";

const UploadCategories = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    img: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      img: file,
    });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("img", formData.img);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/categories/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Uploaded:", response.data);
      setMessage("✅ Category added successfully!");
      setFormData({ name: "", price: "", img: null });
      setPreview(null);
    } catch (error) {
      console.error("❌ Error uploading:", error);
      setMessage("❌ Failed to upload category!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-100 to-green-200 py-10 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700">
          🌿 Add New Category
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Category Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Perfect Buffet"
              className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Price */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Price (₹):
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="e.g., 799"
              className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full text-gray-700"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 rounded-xl shadow-md w-full h-56 object-cover border border-green-200"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-200 disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "Add Category"}
          </button>

          {message && (
            <p className="mt-5 text-center font-semibold text-gray-700">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadCategories;
