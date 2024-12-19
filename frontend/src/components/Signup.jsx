import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Payify from "../assets/Payify.png";  // Correctly import the image
import axios from "axios";

const Signup = () => {

    const [username , setUsername ] = useState("")
    const [firstName , setFirstName ] = useState("")
    const [lastName , setLastname ] = useState("")
    const [email, setEmail ] = useState("")
    const [password , setPassword ] = useState("")
    const navigate = useNavigate();


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
            Sign Up
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Create an account to get started!
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
                onChange = {(e)=> setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email..."
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-[#020066]"
                onChange = {(e)=> setEmail(e.target.value)}
              />
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstname" className="text-gray-700 text-sm font-medium">
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="Enter your first name..."
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-[#020066]"
                onChange = {(e)=> setFirstName(e.target.value)}

              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastname" className="text-gray-700 text-sm font-medium">
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Enter your last name..."
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-[#020066]"
                onChange = {(e)=> setLastname(e.target.value)}
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
                onChange = {(e)=> setPassword(e.target.value)}
              />
            </div>

            {/* Sign-Up Button */}
            <button
    onClick={async (e) => {
        e.preventDefault();  // Prevent form submission

        try {
            const response = await axios.post("http://localhost:5000/user/signup", {
                username,
                email,
                firstName,
                lastName,
                password,
            });

            localStorage.setItem("token" , response.data.token)
            navigate("/dashboard")
        } catch (err) {
            console.error('Signup Error:', err.message);
        }
    }}
    className="w-full mt-4 bg-[#020066] text-white py-2 rounded-lg font-bold hover:bg-[#1a1a80] transition-all"
>
    Sign Up
</button>

            {/* Sign In Redirect */}
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?
              <Link to="/signin" className="text-[#020066] underline">
                Login
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;
