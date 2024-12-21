import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Link,
  Users,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { PermissionContext } from "@/contexts/PermissionContext";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { currentUserRoutes = [] } = useContext(PermissionContext);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    socialMedia: false,
    techies: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <nav className="bg-white w-64 h-full shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Task Nest</h1>
      </div>
      <ul className="space-y-2 p-4">
        {currentUserRoutes.map((item: any) => (
          <li key={item.label}>
            {item?.subItems?.length ? (
              <div>
                <button
                  onClick={() => toggleSection(item.id)}
                  className="flex items-center justify-between w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {expandedSections[item.id] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {expandedSections[item.id] && (
                  <ul className="ml-6 mt-2 space-y-2">
                    {item.subItems.map((subItem: any) => (
                      <li key={subItem.to}>
                        <NavLink
                          to={`${item.to}/${subItem.to}`}
                          className={({ isActive }) =>
                            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                              isActive
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-600 hover:bg-gray-100"
                            }`
                          }
                        >
                          <subItem.icon className="w-5 h-5" />
                          <span>{subItem.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
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
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
