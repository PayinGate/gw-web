import { Route, Routes } from "react-router-dom";
import AppMain from "../pages/dashboard/main";
import Login from "../pages/dashboard/auth/login";
import { useState } from "react";
import Home from "../pages/dashboard/home/home";
import Customers, { CustomersTable } from "../pages/dashboard/customers/customers";
import ViewCustomer, { CustomerTransactionsTable } from "../pages/dashboard/customers/view_customer";
import ViewTransaction from "../pages/dashboard/transactions/view_transaction";

export default function Router(){
    const [ loggedIn ] = useState(true);

    if(loggedIn){
        return (
            <Routes>
                <Route path="/" element={<AppMain />} >
                    <Route index path="" element={<Home />} />
                    <Route  path="/home" element={<Home />} />
                    <Route path="/customers" element={<Customers />} >
                        <Route path="" element={<CustomersTable />} />
                        <Route path="guests" element={<CustomersTable />} />
                        <Route path="top-customers" element={<CustomersTable />} />
                        <Route path="recent-customers" element={<CustomersTable />} />
                    </Route>
                    <Route path='/customers/:id' element={<ViewCustomer />} >
                        <Route path="" element={<CustomerTransactionsTable />}/>
                        <Route path="*" element={<CustomerTransactionsTable />} />
                    </Route>
                    <Route path="/transactions/:id" element={<ViewTransaction />} />
                    <Route path="/customers/:id/transactions" element={<></>} />
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