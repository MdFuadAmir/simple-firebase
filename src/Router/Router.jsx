import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";

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
                path:"/signin",
                element: <div>signin</div>
            },
        ]
    }
])

export default router;