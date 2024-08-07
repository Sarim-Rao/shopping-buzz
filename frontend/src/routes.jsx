import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import AuthLayout from "./Layout/AuthLayout";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Cart from "./Pages/Cart";
import PrivateRoutes from "./Components/PrivateRoutes";
import CheckOut from "./Pages/CheckOut";
import Profile from "./Pages/Profile";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,

        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/products/:id",
                element: <Products />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: "/checkout",
                        element: <CheckOut />,
                    },
                    {
                        path: "/profile",
                        element: <Profile />,
                    },
                ],
            },
        ],
    },

    {
        path: "/auth",
        element: <AuthLayout />,

        children: [
            {
                index: true,
                element: <Navigate to="login" />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

export default routes;
