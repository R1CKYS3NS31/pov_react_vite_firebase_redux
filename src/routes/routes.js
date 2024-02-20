import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Page404 } from "../pages/page-404/Page404";
import { Login } from "../pages/auth/signIn/Login";
import { Register } from "../pages/auth/signUp/Register";
import { PrivateRoute } from "../components/private_route/PrivateRoute";
import { CreatePoV } from "../pages/pov/CreatePoV";
import { PovEdit } from "../pages/pov/PovEdit";
import { Profile } from "../pages/auth/profile/Profile";

export const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    // {
    //   children: [
    //     { element: <Navigate to="/" />, index: true },
    //     { path: "/home", element: <Home /> },
    //     { path: "404", element: <Page404 /> },
    //     { path: "*", element: <Navigate to="/404" replace /> },
    //   ],
    // },
    { path: "pov/create", element: <PrivateRoute component={CreatePoV} /> },
    { path: "pov/edit/:povId", element: <PovEdit /> },
    { path: "signin", element: <Login /> },
    { path: "signup", element: <Register /> },
    { path: "profile", element: <Profile /> },
    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to={"/404"} replace />,
    },
  ]);
};
