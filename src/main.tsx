import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { PermissionContextProvider } from "./contexts/PermissionContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./ui/tooltip.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthContextProvider>
            <PermissionContextProvider>
              <App />
            </PermissionContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </>
);
