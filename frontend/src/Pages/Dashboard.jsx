import React from "react";
import Users from "../Components/Users";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 🔝 Navbar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-black">PayApp</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Hello, User</span>

          {/* Avatar */}
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white text-sm font-medium">
            U
          </div>
        </div>
      </div>

      {/* 💰 Balance Section */}
      <div className="px-6 py-6 border-b border-gray-200">
        <p className="text-sm text-gray-500">Your Balance</p>

        <h2 className="text-3xl font-semibold text-black mt-1">₹5,000</h2>
      </div>

      {/* 👥 Users Section */}
      <div className="px-6 py-6">
        <Users />
      </div>
    </div>
  );
};
