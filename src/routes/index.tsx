import { Suspense, useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import _ from "lodash";
import { PermissionContext } from "@/contexts/PermissionContext";
import { AuthContext } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import UserLoginRedirection from "@/components/auth/UserLoginRedirection";
import PrivateRoute from "./privateRoute";
import Layout from "@/components/Layout";

const renderRoutes = (routes = []) => {
  if (_.isEmpty(routes)) return null;
  return routes.map((route1: any, idx: any) => {
    const { to, component, subItems = [], index = false } = route1;

    return (
      <Route
        key={idx}
        index={index}
        path={to}
        element={<Suspense>{component}</Suspense>}
      >
        {subItems.length &&
          subItems.map((route2: any, idx2: any) => {
            const {
              to: link2,
              component: component2,
              subItems: subItems2 = [],
              index: index2 = false,
            } = route2;
            return (
              <Route
                key={idx2}
                index={index2}
                path={link2}
                element={
                  <Suspense>{component2}</Suspense>
                  // <Suspense fallback={<ApplicationLoader />}>{component2}</Suspense>
                }
              >
                {subItems2.length &&
                  subItems2.map((route3: any, idx3: any) => {
                    const { to: link3, component: component3 } = route3;
                    return (
                      <Route
                        key={idx3}
                        path={link3}
                        element={
                          <Suspense>{component3}</Suspense>
                          // <Suspense fallback={<ApplicationLoader />}>{component3}</Suspense>
                        }
                      />
                    );
                  })}
              </Route>
            );
          })}
      </Route>
    );
  });
};

const AppRoutes = () => {
  const { currentUserRoutes = [] } = useContext(PermissionContext);
  const { isAuthLoading } = useContext(AuthContext);
  const homeRoutes: any = [];
  const nonHomeRoutes: any = [];

  currentUserRoutes.forEach((route: any) => {
    if (route.excludeNavAndSidebar) {
      nonHomeRoutes.push(route);
    } else {
      homeRoutes.push(route);
    }
  });

  //   if (isAuthLoading) return <MainLoader />;
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      {/* <Route path="logout" element={<Logout />} /> */}
      <Route path="callback" element={<UserLoginRedirection />} />

      <Route path="/" element={<PrivateRoute>{<Layout />}</PrivateRoute>}>
        {renderRoutes(homeRoutes)}
      </Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            {/* <ErrorBoundary>
              <Outlet />
            </ErrorBoundary> */}
          </PrivateRoute>
        }
      >
        {renderRoutes(nonHomeRoutes)}
      </Route>
      {currentUserRoutes.length ? (
        <Route
          path="*"
          element={<PrivateRoute>{/* <PageNotFound /> */}</PrivateRoute>}
        />
      ) : (
        <></>
        // <Route path="*" element={<PageNotFound />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
