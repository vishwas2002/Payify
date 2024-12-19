import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const recipientId = searchParams.get("_id");
  const recipientNameFromURL = searchParams.get("name");

  const [amount, setAmount] = useState(0);
  const [recipientName, setRecipientName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in if token is not present
    }
  }, []);

  // Fetch the recipient's details only if `recipientNameFromURL` is not available
  useEffect(() => {
    const fetchRecipientDetails = async () => {
      if (recipientId && !recipientNameFromURL) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5000/user/getUser`, // Adjust the endpoint if needed
            {
              headers: { Authorization: `Bearer ${token}` },
              params: { recipientId }, // Pass recipientId as a query parameter
            }
          );
          const { firstName, lastName } = response.data;
          setRecipientName(`${firstName} ${lastName}`);
        } catch (error) {
          console.error("Failed to fetch recipient details:", error);
          setRecipientName("Unknown Recipient");
        } finally {
          setLoading(false);
        }
      } else if (recipientNameFromURL) {
        // If the name is already in the URL, use it directly
        setRecipientName(recipientNameFromURL);
        setLoading(false);
      }
    };

    fetchRecipientDetails();
  }, [recipientId, recipientNameFromURL]);

  const handleSendMoney = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/account/transfer",
        { to: recipientId, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.message);
      navigate(`/paymentstatus?message=${response?.data.message}`);
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-2.5 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col p-1">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>

          <div className="p-4">
            <div className="flex items-center space-x-4">
             
              <h3 className="text-xl font-semibold">
                {loading ? "Please enter the amount below" : recipientName}
              </h3>
            </div>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-2 rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSendMoney}
                  className="rounded-md mt-2 bg-[#020066] text-white font-medium h-13 transition-colors px-4 py-2"
                >
                  Initiate Transfer
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="rounded-md mt-2 bg-red-700 text-white font-medium h-13 transition-colors px-4 py-2"
                >
                  Cancel & Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
