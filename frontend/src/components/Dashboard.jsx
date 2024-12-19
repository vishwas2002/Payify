import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  // Fetch balance from the server
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userToken = localStorage.getItem("token");
        if (userToken) {
          const response = await axios.get(
            "http://localhost:5000/account/balance",
            {
              headers: {
                Authorization: "Bearer " + userToken,
              },
            }
          );
          setBalance(response.data.balance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  // Fetch users based on search input
  const handleSearchInput = async (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (inputValue.length === 0) {
      setUsers([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/user/bulk?filter=${inputValue}`
      );
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Redirect to SendMoney component
  const handleSendMoney = (userId) => {
    navigate(`/sendmoney/${userId}`, {state : {userId}});
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#020066]">Payify</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Hello</span>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
            U
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Balance Card */}
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Your Balance</h2>
          <p className="text-2xl font-bold text-green-500">Rs {balance}</p>
        </div>

        {/* User Search Section */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Search Users</h3>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchInput}
              onChange={handleSearchInput}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FiSearch className="absolute top-3 left-3 text-gray-400" />
          </div>

          {/* Render filtered users */}
          <div className="mt-4">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user._id}
                  className="p-2 mt-2 rounded-lg bg-gray-50 shadow-md flex justify-between items-center"
                >
                  <div>
                    {user.firstName} {user.lastName} - {user.email}
                  </div>

                  {/* Send Money Button */}
                  <button
                    onClick={() => handleSendMoney(user._id)}
                    className="ml-4 bg-[#020066] text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Send Money
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-2">No users found...</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        &copy; 2024 Payify. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
