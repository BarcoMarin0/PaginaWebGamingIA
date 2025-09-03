import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Settings, Home } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-black border-b border-cyan-500/30 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Gamepad2 className="w-8 h-8 text-cyan-400 group-hover:text-magenta-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-20 group-hover:bg-magenta-400 transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                GameNewsX
              </h1>
              <p className="text-xs text-gray-400">Tu portal de noticias gaming</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === "/"
                  ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                  : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
            
            <Link
              to="/admin"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === "/admin"
                  ? "bg-magenta-500/20 text-magenta-400 shadow-lg shadow-magenta-500/20"
                  : "text-gray-300 hover:text-magenta-400 hover:bg-magenta-500/10"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Animated border bottom */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
    </header>
  );
};

export default Header;