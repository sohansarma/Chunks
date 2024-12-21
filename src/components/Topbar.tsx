import React, { FC } from "react";
import { Button } from "@/ui/button";
import { Upload } from "lucide-react";
import { useLocation } from "react-router-dom";

interface TopbarProps {
  onUploadClick: () => void;
}

const Topbar: FC<TopbarProps> = ({ onUploadClick }) => {
  const location = useLocation();
  const showButton = location.pathname.includes("social-media");

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
      </div>
    </header>
  );
};

export default Topbar;
