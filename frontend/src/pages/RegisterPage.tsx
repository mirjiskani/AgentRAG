import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'; 
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isEightChar, setIsEightChar] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleRegister = () => {

      toast.error("Registration not implemented yet");
   
  };


  function setPassword(value: string): void {
    if(value.length >= 8) {
      setIsEightChar(true);
    }else{
      setIsEightChar(false);
    }
  }

  function setConfirmPasswordMatch(value: string): void {
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            Agent<span className="text-violet-600">RAG</span>
          </h1>

          <h2 className="text-2xl font-semibold mt-6">
            Create your account
          </h2>

          <p className="text-gray-500 mt-2">
            Start chatting with your documents
          </p>
        </div>

        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

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
                name="email"
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
                name="password"
                onKeyUp={(e) => setPassword(e.currentTarget.value)}
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
            
            <p className="text-md text-gray-500 mt-1">
              <span className="text-green-500" style={{ display: isEightChar ? 'inline' : 'none' }}>✓</span> <span className="text-red-500" style={{ display: !isEightChar ? 'inline' : 'none' }}>x</span> Must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                name="confirmPassword"
                onKeyUp={(e) => setConfirmPasswordMatch(e.currentTarget.value)}
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
               
            <p className="text-md text-gray-500 mt-1">
              <span className="text-green-500" style={{ display: isEightChar ? 'inline' : 'none' }}>✓</span> <span className="text-red-500" style={{ display: !isEightChar ? 'inline' : 'none' }}>x</span> Password match confirmation
            </p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-lg transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-violet-600 hover:text-violet-700 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}