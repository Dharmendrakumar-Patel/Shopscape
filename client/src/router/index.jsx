import Home from '../pages/home.jsx';
import SignIn from '../pages/signin.jsx'
import Signup from '../pages/signup.jsx'
import Product from '../pages/product.jsx';
import Uploadproduct from '../pages/uploadproduct.jsx';
import ProductList from '../pages/productList.jsx';
import UserList from '../pages/userList.jsx';
import Cart from '../pages/cart.jsx';
import ErrorPage from '../components/ErrorPage.jsx'
import { redirect } from 'react-router-dom';

export const MainRoutes = () => {
    return [
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        loader: () => {
            if (!localStorage.getItem("Shopscape")) {
                return redirect("/signin")
            } else {
                redirect("/")
                return null
            }
        },
        children: [
            {
                path: "/",
                element: <Product />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/cart",
                element: <Cart />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/users",
                element: <UserList />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/products",
                element: <ProductList />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/uploadProduct",
                element: <Uploadproduct />,
                errorElement: <ErrorPage />,
            }
        ]
    },
    {
        path: "signin",
        element: <SignIn />,
        errorElement: <ErrorPage />,
        loader: () => {
            if (localStorage.getItem("Shopscape")) {
                return redirect("/")
            } else {
                return null
            }
        }
    },
    {
        path: "signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
        loader: () => {
            if (localStorage.getItem("Shopscape")) {
                return redirect("/");
            } else {
                return null;
            }
        }
    }
]
}