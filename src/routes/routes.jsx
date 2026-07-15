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
import DashBoardHome from "../pages/DashBoard/DashBoardHome/DashBoardHome";
import DashBoardLayout from "../RootLayout/DashBoardLayout";
import MyParcels from "../pages/DashBoard/MyParcels/MyParcels";

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
        loader: () => fetch("/serviceJone.json").then((res) => res.json()),
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceJone.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivetRoutes>
        <DashBoardLayout></DashBoardLayout>
      </PrivetRoutes>
    ),
    children: [
      {
        index: true,
        Component: DashBoardHome,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
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
