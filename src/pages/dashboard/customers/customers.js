import classNames from "classnames"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import useAPI from "../../../hooks/useApi"
import { useEffect, useState } from "react"
import toTwoDecimalPlaces from "../../../utils/to2dp"

const CUSTOMER_LINKS = [
    {
        title: "All",
        path: "/customers"
    },
    {
        title: "Guests",
        path: "/customers/guests"
    },
    {
        title: "Top customers",
        path: "/customers/top-customers"
    },
    {
        title: "Recent customers",
        path: "/customers/recent-customers"
    },
]

export default function Customers() {
    return <div className="p-2 flex flex-col gap-3">
        <div className="font-Archivo text-[22px] font-bold">Customers</div>
        <div className="flex flex-col gap-0">
            <CustomNavLinks links={CUSTOMER_LINKS} />
            <div className="">
                <Outlet />
            </div>
        </div>
    </div>
}



export function CustomersTable() {

    const { fetch } = useCustomer();
    const [ rows, setRows ] = useState([]);

    useEffect(()=>{
        fetch().then(({data})=>{
            if(data){
                setRows(data);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();

   
    const HEADINGS = [<input type="checkbox" />, "Name", "Email", "Total Spend", "Transactions", "Last Transaction", "Created"]
    return (
        <table className="w-full table-auto border-collapse">
            <thead className="border-t-[2px] w-full border-t-[#66676a2e] font-dmsans font-medium text-[12px] uppercase text-[#76777a] dark:text-[#e6e6e6]">
                <tr className="">
                    {HEADINGS.map((heading, key)=> <th className="py-2 text-start" key={key}>{heading}</th>)}
                </tr>
                </thead>
                <tbody className="">
                    {rows?.customers?.map((customer, key)=>{
                        const lastTransactionDate = customer.last_transaction && new Date(customer.last_transaction).toDateString();
                        return <tr key={key} className="font-medium font-inter text-[13px] border-t-[1px] border-t-[#66676a2e] cursor-pointer hover:bg-[#e5e5e538] text-[#212121de] dark:text-[#c1c1c1]"
                                   onClick={()=>{ navigate(`/customers/${customer.id}`) }}>
                            <td className="py-2 w-[50px]"><input type="checkbox" /></td>
                            <td className="capitalize py-2">{customer.name}</td>
                            <td className="py-2">{customer.email}</td>
                            <td className="py-2"><span className="text-[#949494]">₦</span>{toTwoDecimalPlaces(customer.total_spend)}</td>
                            <td className="py-2">{customer.total_transactions}</td>
                            <td className="py-2">{lastTransactionDate || <span className="text-[#707070]">Never</span>}</td>
                            <td className="py-2">{new Date(customer.created_at).toDateString()}</td>
                        </tr>
                    })}
                </tbody>
        </table>
    );
}


const useCustomer = ({id} = {}) => {
    const { get } = useAPI();
    const fetch = async () => {
        try {
            const response = await get(id ? `/api/p/customer/${id}` : "/api/p/customer/all", []);
        
            if(response['success'] === true) {
                return {data : response["data"] };
            }
        }
        catch(error) {
            console.log(error);
            return { data: null };
        }
        return { data: null };
    }

    return { fetch };
}


const CustomNavLinks = ({ links } ) => {
    return <div className="flex items-center gap-4 whitespace-nowrap overflow-x-auto">{
        links.map((link, key)=>{
        return <NavLink end to={link.path} key={key}
                     className={({isActive}) => classNames("text-[13px] py-1 font-inter font-semibold relative w-fit transition-all "+
                        "after:h-[2px] rounded-lg after:w-0 after:left-0 text-[#66676a] dark:text-[#dcdcdc] after:bg-[#26d28c] after:absolute after:bottom-0 after:transition-all", 
                                {"!text-[#26d28c] after:!w-full font-semibold ": isActive})}>
                {link.title}
                </NavLink>
        })
    }</div>
}


export {useCustomer, CustomNavLinks};