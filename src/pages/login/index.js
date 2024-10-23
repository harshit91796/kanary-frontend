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
      router.push("/signup")
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

  // {
  //     "_id": "6717a8e1ca6a6f18c21736cf",
  //     "name": "Test User 1",
  //     "email": "testuser1@example.com",
  //     "role": "user",
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTdhOGUxY2E2YTZmMThjMjE3MzZjZiIsImlhdCI6MTcyOTYwMzgwOSwiZXhwIjoxNzI5NjA3NDA5fQ.9wc8imgJ2GyGabco6JS9kCOqhJG_RT326yFAPqQHBQE"
  //   }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login to your account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <label
              for="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label
              for="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              placeholder="********"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                for="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
