import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { loginUser } from "../api/authApi";
import { saveToken } from "../utils/auth";

const LoginPage = () => {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await loginUser(
          formData
        );

      saveToken(
        data.token
      );

      alert(
        "Login successful!"
      );

      navigate(
        "/dashboard"
      );
    } catch (error: any) {
      alert(
        error?.response?.data
          ?.message ||
          "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-5xl font-bold text-center text-slate-900">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mt-4 text-xl">
          Login to Smart Leads Dashboard
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-10 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
              className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="text-center text-slate-500 mt-8">
          Don&apos;t have an
          account?
          <Link
            to="/register"
            className="text-blue-600 font-medium ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;