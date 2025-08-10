import { Route, Routes } from "react-router-dom";
import AppMain from "../pages/dashboard/main";
import Login from "../pages/dashboard/auth/login";
import { useState } from "react";
import Home from "../pages/dashboard/home/home";
import Customers, { CustomersTable } from "../pages/dashboard/customers/customers";
import ViewCustomer, { CustomerTransactionsTable } from "../pages/dashboard/customers/view_customer";
import ViewTransaction from "../pages/dashboard/transactions/view_transaction";
import { Transactions, TransactionsTable } from "../pages/dashboard/transactions/transactions";
import { CustomersTransactions } from "../pages/dashboard/customers/transactions";
import Tokens from "../pages/settings/tokens";

export default function Router(){
    const [ loggedIn ] = useState(false);

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
                        <Route path="refunds" element={<></>}/>
                        <Route path="disputes" element={<></> }/>
                        <Route path="*" element={<CustomerTransactionsTable />} />
                    </Route>
                    <Route path="/transactions" element={<Transactions />} >
                        <Route path="" element={<TransactionsTable/>} />
                        <Route path="completed" element={<TransactionsTable filterWith={"completed"} />} />
                        <Route path="pending" element={<TransactionsTable filterWith={"pending"} />} />
                        <Route path="cancelled" element={<TransactionsTable filterWith={"cancelled"} />}/>
                    </Route>
                    <Route path="/transactions/:id" element={<ViewTransaction />} />
                    <Route path="/customers/:id/transactions" element={<CustomersTransactions />} >
                        <Route path="" element={<TransactionsTable />} />
                        <Route path="completed" element={<TransactionsTable filterWith={"completed"} />} />
                        <Route path="pending" element={<TransactionsTable filterWith={"pending"} />} />
                        <Route path="cancelled" element={<TransactionsTable filterWith={"cancelled"} />}/>
                    </Route>
                    <Route path="*" element={<Home />} />
                    <Route path="/settings">
                        <Route path="tokens" element={<Tokens />} />
                    </Route>
                </Route>
            </Routes>
        );
    }
    else {
        return <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
        </Routes>
    }
}