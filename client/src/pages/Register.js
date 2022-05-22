import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        await axios.post("/auth/register", formData);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-2 min-h-screen">
        <div className="col-span-1 flex flex-col justify-center items-center">
          <form
            className="flex flex-col w-3/4 bg-white p-16 rounded-md space-y-4"
            onSubmit={handleSubmit}>
            <input
              required
              autoComplete="true"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              className="border border-gray-200 outline-none focus:border-teal-800 px-4 py-2 rounded-md bg-transparent w-full"
            />
            <input
              required
              autoComplete="true"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="border border-gray-200 outline-none focus:border-teal-800 px-4 py-2 rounded-md bg-transparent w-full"
            />
            <input
              required
              minLength={4}
              autoComplete="true"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="border border-gray-200 outline-none focus:border-teal-800 px-4 py-2 rounded-md bg-transparent w-full"
            />
            <input
              required
              minLength={4}
              autoComplete="true"
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleChange}
              className="border border-gray-200 outline-none focus:border-teal-800 px-4 py-2 rounded-md bg-transparent w-full"
            />
            <button
              type="submit"
              className="bg-teal-800 font-medium text-white py-2 rounded-md">
              {formData.password === formData.confirmPassword
                ? `Register`
                : `Password must match`}
            </button>
            <Link to="/login">
              <div className="bg-teal-800 font-medium text-white py-2 rounded-md text-center">
                Login
              </div>
            </Link>
          </form>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center">
          <div className="leading-relaxed">
            <h1 className="text-4xl font-bold text-teal-800">asitocial</h1>
            <p>Connect with friends & the world around you on asitocial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
