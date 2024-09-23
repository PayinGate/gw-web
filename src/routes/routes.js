import { Route, Routes } from "react-router-dom";
import Portal from "../pages/portal/portal";
import Login from "../pages/portal/auth/login";

export default function Router(){
    return (
        <Routes>
            <Route path="/" element={<Portal />} >
                <Route index path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
}