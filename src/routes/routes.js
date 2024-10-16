import { Route, Routes } from "react-router-dom";
import AppMain from "../pages/dashboard/main";
import Login from "../pages/dashboard/auth/login";
import { useState } from "react";
import Home from "../pages/dashboard/home/home";

export default function Router(){
    const [ loggedIn, setLoggedIn ] = useState(true);

    if(loggedIn){
        return (
            <Routes>
                <Route path="/" element={<AppMain />} >
                    <Route index path="" element={<Home />} />
                    <Route  path="/home" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        );
    }
    else {
        return <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    }
}