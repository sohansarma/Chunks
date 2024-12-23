import { AuthContext } from "@/contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;

const UserLoginRedirection = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [updatedAccessToken, setAccessToken] = useState("");
  const [idTokens, setIdToken] = useState("");
  const {
    getAccessTokenSilently,
    isAuthenticated = false,
    getIdTokenClaims,
    isLoading = true,
    logout,
  } = useAuth0();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const { setUserSession } = authContext;
  const getAccessToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: AUTH0_AUDIENCE,
        },
      });
      const idToken: any = await getIdTokenClaims();
      setIdToken(idToken);
      setAccessToken(accessToken);
    } catch (error: any) {
      toast.error(error.message);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (!isLoading) {
      getAccessToken();
    }
  }, [isLoading]);

  const redirectUserTo = async () => {
    try {
      if (isAuthenticated) {
        localStorage.setItem("token", updatedAccessToken);

        navigate("/");
      }
    } catch (error: any) {
      let errorMessage = "";
      toast.error(errorMessage);
      if (isAuthenticated) {
        setTimeout(() => {
          logout({
            logoutParams: {
              returnTo: `${window.location.origin}`,
            },
          });
          localStorage.clear();
        }, 3000);
      }
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    if (updatedAccessToken) {
      redirectUserTo();
    }
  }, [updatedAccessToken, isAuthenticated]);
  // if (isPageLoading) {
  //   return <MainLoader />;
  // }
  return "";
};

export default UserLoginRedirection;
