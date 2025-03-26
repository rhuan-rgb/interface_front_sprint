import {Navigate} from "react-router-dom"
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = ({children}) =>{
    const isAunthenticated = localStorage.getItem("authenticated");
    return isAunthenticated ? <DefaultLayout>{children}</DefaultLayout> : <Navigate to="/" />

   
}

export default ProtectedRoute;