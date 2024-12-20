import { NavLink } from "react-router-dom";
import { LayoutDashboard, Upload, Link, Users, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isAdmin, signOut } = useAuth();

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/uploads", icon: Upload, label: "Uploads" },
    { to: "/connections", icon: Link, label: "Connections" },
    { to: "/users", icon: Users, label: "Users" },
  ];

  return (
    <nav className="bg-white w-64 h-full shadow-lg flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Simpli Load</h1>
      </div>
      <ul className="space-y-2 p-4 flex-grow">
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
      <div className="p-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
