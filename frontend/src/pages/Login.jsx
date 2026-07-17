import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../services/authService";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
  try {
    const data = await login(
      formData.username,
      formData.password
    );

    localStorage.setItem(
      "access",
      data.access
    );

    localStorage.setItem(
      "refresh",
      data.refresh
    );

    toast.success("Login successful.");

    navigate("/dashboard");

  } catch (error) {
    console.error(error);

    toast.error(
      "Invalid username or password."
    );
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Comfy OS
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Sign in to continue
        </p>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
                onClick={handleSubmit}
                className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800"
                >
                Sign In
                </button>

        </div>

      </div>

    </div>
  );
}

export default Login;