import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom"
import { CustomNavLinks, useCustomer } from "./customers";
import { TransactionsTable } from "../transactions/transactions";
import toTwoDecimalPlaces from "../../../utils/to2dp";

export default function ViewCustomer(){
    const params = useParams();
    const navigate = useNavigate();
    const { fetch } = useCustomer({id: params.id});
    const [ customer, setCustomer ] = useState(null);
    useEffect(()=>{
        fetch().then(({data})=>{
            setCustomer(data);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    const handleBackClick = () => {
        navigate(-1);
    }


    return (
        <div>
            <div className="flex items-center justify-between">
                <div class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors h-9 rounded-md px-3 cursor-pointer" onClick={handleBackClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left mr-2 h-4 w-4"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>Back
                </div>
            </div>
            <div className="p-3 flex gap-5 w-full">
                {/* User's details */}
                <div className="w-[40%] flex flex-col gap-5">
                    <div className="font-inter">
                        <div className="capitalize text-[20px] font-semibold">{customer?.name}</div>
                        <div className="text-[14px] font-medium text-[gray]">{customer?.email}</div>
                    </div>
                    <div className="space-y-[2px] font-inter">
                        <div className="font-medium text-[13px] text-[#777777] dark:text-[#CCCCCC]">Created</div>
                        <div className="text-[12px] font-semibold text-[#141414] dark:text-white">{new Date(customer?.created_at).toDateString()}</div>
                    </div>
                    <div className="space-y-[2px] font-inter">
                        <div className="font-semibold text-[14px] dark:text-[#d0d0d0] text-[#777777]">Tags</div>
                        <div className="block font-inter text-[13px]">
                            {Array.from({length: 6}, ()=>{ return <div className="inline-block m-1 bg-[#09ae032d] p-1 rounded-md w-fit">ABCD iz a tag</div> } )}
                        </div>
                    </div>
                    <div className="space-y-[3px] font-inter w-[80%]">
                        <div className="font-semibold text-[15px]">Metadata</div>
                        {customer?.metadata ? <pre className="bg-[#282C34] text-[#CCCCCC] text-[14px] p-4 rounded-[5px] overflow-x-auto" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
                            <code>
                                {JSON.stringify(customer.metadata, null, 2)}
                            </code>
                        </pre> : ""}
                    </div>
                </div>
                <div className="w-[60%] py-5">
                    <div className="border-b-[#66676a2e] w-full border-b-[1px]">
                        <CustomNavLinks links={[{title: "Transactions", path: ""},{title: "Refunds", path: "refunds"}, {title: "Disputes", path: "disputes"}]} />
                    </div>
                    <Outlet context={{data: customer }} />
                </div>
            </div>
            <div className="h-20" />
        </div>
    );  
}   


const TRANSACTION_STATS = [
    {
        title: "Total Transaction",
        key: "total_transactions"   
    },
    {
        title: "Total Spent",
        key: "total_spend",
        is_currency: true
    },
    {
        title: "First Transaction",
        key: "first_transaction",
        is_date: true
    },
    {
        title: "Last Transaction",
        key: "last_transaction",
        is_date: true
    },
]


const CustomerTransactionsTable = () => {
    const { data } = useOutletContext();

    if(data){

    return <div className="">
            <div className="py-1">
                <div className="flex items-center gap-10 py-5 whitespace-nowrap overflow-x-auto">
                    {TRANSACTION_STATS.map((stat, key)=>{
                        let fieldValue = data[stat.key];
                        if(stat.is_currency) fieldValue = `₦${toTwoDecimalPlaces(fieldValue)}`;
                        if(stat.is_date) fieldValue = new Date(fieldValue).toDateString();

                        return <div className="space-y-[2px] text-inter" key={key}>
                            <div className="font-medium text-[14px]">{stat.title}</div>
                            <div className="text-[12px] font-semibold text-[#777777] dark:text-[#CCCCCC]">{fieldValue}</div>
                        </div>
                    })}
                </div>
            </div>
            <div className="w-full py-2 flex items-center justify-between font-inter">
                <div className="text-[17px]  font-semibold text-[#464646e4] dark:text-[#b9b9b9e4]">Transactions</div>
                <Link className="text-[#26d28c] text-[12px] font-semibold" to={"transactions"} >View all</Link>
            </div>
            <TransactionsTable shortVersion={true} data={data?.transactions} />
        </div>
    }

}

export {CustomerTransactionsTable};