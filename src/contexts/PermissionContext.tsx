import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import _ from "lodash";
import { AdminRoutes } from "@/routes/constants/adminRoutes";

export type PermissionContextType = {
  currentUserRoutes: any;
  currentUserRoles: any;
  setCurrentUserRoutes: any;
  setUserRoutes: any;
};

export const PermissionContext = createContext<PermissionContextType>(
  {} as PermissionContextType
);
type PermissionProviderProps = {
  children: ReactNode;
};
export const PermissionContextProvider: FC<PermissionProviderProps> = ({
  children,
}: PermissionProviderProps) => {
  const [currentUserRoutes, setCurrentUserRoutes] = useState<any>();
  const [currentUserRoles, setCurrentUserRoles] = useState<any>();
  const getRoleWiseRoutes = (role: any) => {
    let routes: any = [];
    //Call conditional routes based on roles
    routes = AdminRoutes();
    return routes
      .filter((route: any) => route.roles.includes(role))
      .map((subroute: any) => {
        if (!_.isEmpty(subroute?.subItems)) {
          subroute.subItems = subroute.subItems
            .filter((option: any) => option.roles.includes(role))
            .map((subroute2: any) => {
              if (!_.isEmpty(subroute2?.subItems)) {
                subroute2.subItems = subroute2.subItems.filter((option2: any) =>
                  option2.roles.includes(role)
                );
              }
              return subroute2;
            });
        }
        return subroute;
      });
  };

  const setUserRoutes = async () => {
    try {
      let userRoutes: any[] = [];
      //Get user roles
      const roles = ["ADMIN"];
      roles.forEach((userRole: any) => {
        userRoutes = userRoutes.concat(getRoleWiseRoutes(userRole));
      });

      // Sort the routes based on priority, it will decide the landing route.
      userRoutes = _.sortBy(userRoutes, (route) => route.priority);
      const resultingRoutes: any = [];
      userRoutes.forEach((route) => {
        const foundRoute = resultingRoutes.find(
          (item: any) => item.to === route.to
        );
        if (!foundRoute) {
          resultingRoutes.push(route);
        } else {
          foundRoute.subItems = _.uniqBy(
            [...(foundRoute.subItems || []), ...(route.subItems || [])],
            (route) => route.to
          );
          if (_.isEmpty(foundRoute.subItems)) {
            delete foundRoute.subItems;
          }
        }
      });
      // Sort the routes based on order, it will decide the order of menu items in the sidebar.
      userRoutes = _.sortBy(resultingRoutes, (route) => route.order);
      setCurrentUserRoles(roles);
      setCurrentUserRoutes(userRoutes);
      return userRoutes;
    } catch (error) {
      setCurrentUserRoutes([]);
    }
  };

  useEffect(() => {
    setUserRoutes();
  }, []);
  const stateValues = useMemo(
    () => ({
      currentUserRoutes,
      currentUserRoles,
      setCurrentUserRoutes,
      setUserRoutes,
    }),
    [currentUserRoutes, currentUserRoles]
  );

  return (
    <PermissionContext.Provider value={stateValues}>
      {children}
    </PermissionContext.Provider>
  );
};
