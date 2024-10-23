import { signup } from "@/services";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        gender: e.target.gender.value,
        age: e.target.age.value,
      });
      if (response.status === 201) {
        router.push("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className="min-h-screen bg-[#b4d2a6] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#407165] mb-6 text-center">
          Create your account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} method="POST" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#407165]">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border border-[#b4d2a6] rounded-md shadow-sm focus:ring-[#407165] focus:border-[#407165] text-gray-700"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-[#407165]">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="mt-1 block w-full px-4 py-2 border border-[#b4d2a6] rounded-md shadow-sm focus:ring-[#407165] focus:border-[#407165] text-gray-700"
              placeholder="20"
              required
            />
          </div>

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

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-[#407165]">
              Gender
            </label>
            <div className="flex items-center gap-4 mt-1">
              <label className="inline-flex items-center">
                <input type="radio" name="gender" value="male" className="text-[#407165] focus:ring-[#407165]" required />
                <span className="ml-2 text-[#407165]">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="gender" value="female" className="text-[#407165] focus:ring-[#407165]" required />
                <span className="ml-2 text-[#407165]">Female</span>
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-[#407165] focus:ring-[#407165] border-[#b4d2a6] rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-[#407165]">
              I agree to the{" "}
              <a href="#" className="text-[#407165] hover:text-[#305753]">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#407165] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#305753] focus:outline-none focus:ring-2 focus:ring-[#407165] focus:ring-offset-2 transition duration-300"
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#407165]">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#407165] hover:text-[#305753]">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
