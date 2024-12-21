// import { setInterceptors, setHeader } from '../api/interceptor';
import { createContext, useEffect, useMemo, useState } from "react";

export type UserAuthInfo = {
  token: string;
  user?: any;
  id?: string;
  syndicateType?: string;
  permalink?: string;
  refreshToken?: string;
};

export type AuthContextProps = {
  authState: UserAuthInfo;
  isUserAuthenticated: Function;
  isAuthLoading: boolean;
  setUserSession: Function;
  getUserSession: Function;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState<UserAuthInfo>({} as UserAuthInfo);

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const setUserSession = (
    token: string,
    user: any,
    id: string,
    syndicateType: string,
    permalink: string,
    refreshToken: string
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("syndicate_id", id);
    localStorage.setItem("syndicate_type", syndicateType);
    localStorage.setItem("syndicate_permalink", permalink);
    localStorage.setItem("refreshToken", refreshToken);
    setAuthState({
      token,
      user: JSON.stringify(user),
      id,
      syndicateType,
      permalink,
      refreshToken,
    });
  };

  const getUserSession = (): UserAuthInfo => {
    const token = localStorage.getItem("token") as string;
    const user = localStorage.getItem("user");
    const id = localStorage.getItem("syndicate_id") as string;
    const syndicateType = localStorage.getItem("syndicate_type") as string;
    const permalink = localStorage.getItem("syndicate_permalink") as string;
    const refreshToken = localStorage.getItem("refreshToken") as string;
    return { token, user, id, syndicateType, permalink, refreshToken };
  };

  useEffect(() => {
    const token = getUserSession();
    if (Object.keys(token)?.length) {
      setAuthState(token);
    }
    setIsAuthLoading(false);
  }, []);

  const isUserAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const stateValues = useMemo(
    () => ({
      authState,
      isUserAuthenticated,
      isAuthLoading,
      setUserSession,
      getUserSession,
    }),
    [isAuthLoading, authState]
  );

  return (
    <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
  );
};
