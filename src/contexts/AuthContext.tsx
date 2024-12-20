import { createContext, useContext, useEffect, useState } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, loginWithRedirect, logout } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsAdmin(
        user["https://your-app.com/roles"]?.includes("admin") || false
      );
    }
  }, [user]);
  const signIn = () => {
    loginWithRedirect();
  };

  const signOut = () => {
    logout({
      logoutParams: {
        returnTo: `${window.location.origin}`,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading: isLoading, signIn, signOut, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
