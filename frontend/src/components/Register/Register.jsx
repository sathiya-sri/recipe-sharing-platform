import React, { useState , useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
    setFormData({
      name: "",
      email: "",
      password: ""
    }); 
    navigate("/login");
  };
  

  return (
    <div className="w-full h-screen bg-[#fce3fe] flex items-center justify-center px-4">
      <div className="w-full max-w-xl h-fit bg-white px-6 md:px-[60px] py-10">
        <h1 className="mx-0 mt-5 mb-2 text-xl font-semibold">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[29px] mt-[30px]">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-14 pl-5 border border-[#c9c9c9] outline-none text-base"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-14 pl-5 border border-[#c9c9c9] outline-none text-base"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-14 pl-5 border border-[#c9c9c9] outline-none text-base"
            required
          />
          <button
            type="submit"
            className="w-full h-14 text-white bg-[#ff4141] mt-2 border-none text-base font-medium cursor-pointer uppercase"
          >
            Register
          </button>
        </form>
        <p className="mt-5 text-sm font-medium">
          Already have an account?
          <span
            className="text-[#ff4141] font-semibold ml-1 uppercase cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
        <div className="flex items-center mt-6 gap-4 text-sm font-medium">
          <input type="checkbox" className="w-5 h-5" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
