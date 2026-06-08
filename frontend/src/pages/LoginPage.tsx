import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useLogin } from "../hooks/userLogin";
import toast from "react-hot-toast";
import type { LoginData } from "../types/auth";
import { setToken } from '../lib/tokens-store';
import { useAuth } from '../context/authContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [form, setForm] = useState<LoginData>({
    email: '',
    password: ''
  });
  const { setAccessToken } = useAuth()

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        email: form.email,
        password: form.password
      },
        {
          onSuccess: (response) => {
            setAccessToken(response.data.accessToken);
            setToken(response.data.accessToken);
            toast.success(response.message);
            setTimeout(() => {
              navigate('/dashboard'); // Redirect to dashboard on successful login
            }, 3000);
          },
          onError: () => {
            toast.error("login failed");
            // Optionally, display an error message to the user
          }
        });
    } catch (error) {
      // toast.error('Login failed');
      console.error('Login failed:', error);
      // Optionally, display an error message to the user
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-center text-4xl font-bold mb-2">
          Agent<span className="text-violet-600">RAG</span>
        </h1>

        <h2 className="text-center text-2xl font-semibold mt-6">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Sign in to continue
        </p>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Create a password"
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            onClick={() => handleLogin()}
            className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 cursor-pointer"
          >
            Sign In
          </button>
          <p className="text-center text-gray-500 mt-4">
            Don't have an account? <a href="/register" className="text-violet-600 hover:underline">Register</a>
          </p>

        </form>
      </div>
    </div>
  )
}   