import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import GoogleLogin from "../Components/GoogleLogin/GoogleLogin";
import GithubLogin from "../Components/GithubLogin/GithubLogin";
import Register from "../Components/Register/Register";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        children:[
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/login",
                element: <Login/>
            },
            {
                path:"/register",
                element: <Register/>
            },
            {
                path:"/googlelogin",
                element: <GoogleLogin/>
            },
            {
                path:"/githublogin",
                element: <GithubLogin/>
            },
            
        ]
    }
])

export default router;