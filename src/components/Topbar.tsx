import React, { FC } from "react";
import { Button } from "@/ui/button";
import { Upload } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

interface TopbarProps {
  onUploadClick: () => void;
}

const Topbar: FC<TopbarProps> = ({ onUploadClick }) => {
  const location = useLocation();
  const showButton = location.pathname.includes("social-media");
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout({
        logoutParams: {
          returnTo: `${window.location.origin}`,
        },
      });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-end items-center">
        {showButton ? (
          <Button
            onClick={onUploadClick}
            className="flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </Button>
        ) : (
          <div className="h-10"></div> // Placeholder element with the same height as the button
        )}
        <Button onClick={handleLogout} className="ml-4">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
