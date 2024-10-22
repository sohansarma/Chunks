import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Upload, Link } from "lucide-react";

const Navbar: React.FC = () => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/uploads", icon: Upload, label: "Uploads" },
    { to: "/connections", icon: Link, label: "Connections" },
  ];

  return (
    <nav className="bg-white w-64 h-full shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Simply Load</h1>
      </div>
      <ul className="space-y-2 p-4">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
