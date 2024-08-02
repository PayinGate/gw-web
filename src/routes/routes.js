import { Route, Routes } from "react-router-dom";
import Pay from "../pages/pay/pay";
import PayOutlet from "../pages/pay/outlet";
import FontsDisplay from "../fonts";

export default function Router(){
    return (
        <Routes>
            <Route index path="/" element={<FontsDisplay />} />
            <Route path="/pay" element={<Pay />} >
                <Route path=":id" element={<PayOutlet />} />
            </Route>
        </Routes>
    );
}