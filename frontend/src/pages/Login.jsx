import { useState } from "react";

import {
    FiUser,
    FiLock,
    FiArrowRight,
    FiShield,
    FiBarChart2,
    FiBox,
} from "react-icons/fi";

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

  <div className="min-h-screen bg-slate-100">

      <div className="grid min-h-screen lg:grid-cols-2">

          {/* LEFT */}

          <div className="hidden bg-slate-900 text-white lg:flex">

              <div className="m-auto max-w-lg px-12">

                  <div className="mb-10">

                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-bold">

                          C

                      </div>

                      <h1 className="text-5xl font-bold">

                          COMFY OS

                      </h1>

                      <p className="mt-5 text-lg leading-8 text-slate-300">

                          Modern Business Management Software built for retailers,
                          wholesalers and growing businesses.

                      </p>

                  </div>

                  <div className="space-y-6">

                      <div className="flex gap-4">

                          <FiBarChart2
                              className="mt-1 text-2xl text-blue-400"
                          />

                          <div>

                              <h3 className="font-semibold">

                                  Smart Reports

                              </h3>

                              <p className="text-slate-400">

                                  Real-time business insights.

                              </p>

                          </div>

                      </div>

                      <div className="flex gap-4">

                          <FiBox
                              className="mt-1 text-2xl text-blue-400"
                          />

                          <div>

                              <h3 className="font-semibold">

                                  Inventory Control

                              </h3>

                              <p className="text-slate-400">

                                  Track every stock movement.

                              </p>

                          </div>

                      </div>

                      <div className="flex gap-4">

                          <FiShield
                              className="mt-1 text-2xl text-blue-400"
                          />

                          <div>

                              <h3 className="font-semibold">

                                  Secure Access

                              </h3>

                              <p className="text-slate-400">

                                  Role-based permissions with audit logs.

                              </p>

                          </div>

                      </div>

                  </div>

              </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center justify-center px-6">

              <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

                  <div className="mb-8 text-center">

                      <h2 className="text-4xl font-bold">

                          Welcome Back

                      </h2>

                      <p className="mt-3 text-slate-500">

                          Login to continue

                      </p>

                  </div>

                  <div className="space-y-6">

                      <div>

                          <label className="mb-2 block font-medium">

                              Username

                          </label>

                          <div className="flex items-center rounded-xl border px-4">

                              <FiUser className="text-slate-400" />

                              <input
                                  type="text"
                                  name="username"
                                  value={formData.username}
                                  onChange={handleChange}
                                  placeholder="Enter username"
                                  className="w-full bg-transparent px-3 py-4 outline-none"
                              />

                          </div>

                      </div>

                      <div>

                          <label className="mb-2 block font-medium">

                              Password

                          </label>

                          <div className="flex items-center rounded-xl border px-4">

                              <FiLock className="text-slate-400" />

                              <input
                                  type="password"
                                  name="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  placeholder="Enter password"
                                  className="w-full bg-transparent px-3 py-4 outline-none"
                              />

                          </div>

                      </div>

                      <button

                          onClick={handleSubmit}

                          className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"

                      >

                          Login

                          <FiArrowRight />

                      </button>

                  </div>

              </div>

          </div>

      </div>

  </div>

  );
}

export default Login;