import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-lg w-80 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">{user.full_name || "User"}</h2>
        <p className="text-gray-600">{user.email || "Email not found"}</p>
      </div>
    </div>
  );
};

export default Profile;
