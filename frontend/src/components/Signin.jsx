import React from "react";
import { Link } from "react-router-dom";
import Payify from "../assets/Payify.png";  // Correctly import the image

const Signin = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 lg:p-10">
      <div className="max-w-screen-lg w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
        
        {/* Left Side - Background Image */}
        <div
          className="w-1/2 bg-[#020066] hidden md:flex items-center justify-center"
          style={{
            backgroundImage: `url(${Payify})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50 flex flex-col justify-center">
          
          <h1 className="text-3xl font-extrabold text-[#020066] text-center mb-6">
            Log In
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Login to your account to get started!
          </p>

          {/* Form */}
          <form className="space-y-4">
            
            {/* Username */}
            <div>
              <label htmlFor="username" className="text-gray-700 text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username..."
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-[#020066]"
              />
            </div>

            

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password..."
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-[#020066]"
              />
            </div>

            {/* Sign-Up Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#020066] text-white py-2 rounded-lg font-bold hover:bg-[#1a1a80] transition-all"
            >
              Sign In
            </button>

            {/* Sign In Redirect */}
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?
              <Link to="/signup">
                <span className="text-[#020066] underline"> Sign Up</span>
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signin;
