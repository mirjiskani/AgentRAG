import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Eye, EyeOff, Lock, Mail} from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    function handleLogin(): void {
        try {
            navigate('/dashboard'); // Redirect to dashboard on successful login
        } catch (error) {
            console.error('Login failed:', error);
            // Optionally, display an error message to the user
        }

    }

    return (
    <div className="min-h-screen flex items-center justify-center">
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

        <form className="space-y-4">

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
            className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700"
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