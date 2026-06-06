import {
  Bell,
  Moon,
  Menu,
  Plus,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({
  onToggleSidebar,
}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);
 
  return (
    <header className="h-16 bg-white border-b-2 border-gray-200 px-6 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-xl font-semibold">
            Chat with your documents
          </h1>

          <p className="text-sm text-gray-500">
            Ask questions and get AI-powered answers
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search */}
      

        {/* Upload Button */}
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          <Plus size={18} />
          Upload Document
        </button>

        {/* Dark Mode */}
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Moon size={18} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell size={18} />

          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div ref={profileRef} className="relative flex items-center gap-3 cursor-pointer" 
            onClick={() => setIsProfileOpen(true)}
         >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-gray-200"
          />

          <div className="hidden lg:block">
            <p className="text-sm font-medium">
              Mir Khan
            </p>

            <p className="text-xs text-gray-500">
              Senior Full Stack Engineer
            </p>
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg py-1 z-10">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}