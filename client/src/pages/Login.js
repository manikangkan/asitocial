import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { state, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(formData, dispatch);
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-2 min-h-screen">
        <div className="col-span-1 flex flex-col justify-center items-center">
          <div className="leading-relaxed">
            <h1 className="text-4xl font-bold text-teal-800">asitocial</h1>
            <p>Connect with friends & the world around you on asitocial</p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center">
          <form
            className="flex flex-col w-3/4 bg-white p-16 rounded-md space-y-4"
            onSubmit={handleSubmit}>
            <input
              required
              type="email"
              autoComplete="true"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="border border-gray-200 outline-none focus:border-teal-800 px-4 py-2 rounded-md bg-transparent w-full"
            />
            <input
              required
              autoComplete="true"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="border border-gray-200 outline-none focus:border-teal-800 px-4 py-2 rounded-md bg-transparent w-full"
            />
            <button className="bg-teal-800 font-medium text-white py-2 rounded-md">
              {state.isFetching ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="animate-spin mx-auto"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg>
              ) : (
                `Login`
              )}
            </button>
            <p>Forgot password ?</p>
            <Link to="/register">
              <div className="bg-teal-800 font-medium text-white py-2 rounded-md text-center">
                Register
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
