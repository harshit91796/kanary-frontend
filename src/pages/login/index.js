import { login } from "@/services";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const response = await login({
      email: e.target.email.value,
      password: e.target.password.value,
    });

    if (response.error) {
      setError(response.error);
    } else if (response && response.token) {
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("name", response.name);
      sessionStorage.setItem("role", response.role);
      sessionStorage.setItem("isAdmin", response.isAdmin);
      router.push("/");
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#b4d2a6] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#407165] mb-6 text-center">
          Login to your account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#407165]">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-[#b4d2a6] rounded-md shadow-sm focus:ring-[#407165] focus:border-[#407165] text-gray-700"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#407165]">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-[#b4d2a6] rounded-md shadow-sm focus:ring-[#407165] focus:border-[#407165] text-gray-700"
              placeholder="********"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#407165] focus:ring-[#407165] border-[#b4d2a6] rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#407165]">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-[#407165] hover:text-[#305753]">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#407165] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#305753] focus:outline-none focus:ring-2 focus:ring-[#407165] focus:ring-offset-2 transition duration-300"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#407165]">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-[#407165] hover:text-[#305753]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
