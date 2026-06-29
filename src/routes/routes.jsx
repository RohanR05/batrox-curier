import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../RootLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import AuthPage from "../pages/Auth/AuthPage/AuthPage";

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
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceJone.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/authPage",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: AuthPage,
      },
    ],
  },
]);
