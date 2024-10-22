import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface TopbarProps {
  onUploadClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onUploadClick }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Dashboard
        </h2>
        <Button onClick={onUploadClick} className="flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload</span>
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
