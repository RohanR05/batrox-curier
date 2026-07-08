import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../RootLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import BeARider from "../pages/BeARider/BeARider";
import PrivetRoutes from "./PrivetRoutes";
import SendParcel from "../pages/SendParcel/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/beARider",
        element: (
          <PrivetRoutes>
            <BeARider></BeARider>
          </PrivetRoutes>
        ),
      },
      {
        path: "/send-Parcel",
        Component: SendParcel,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceJone.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
