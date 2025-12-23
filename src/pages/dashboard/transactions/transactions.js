import { FaEllipsis } from "react-icons/fa6";
import toTwoDecimalPlaces from "../../../utils/to2dp";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { CustomNavLinks } from "../customers/customers";
import { mapKeyToValue, useTransaction } from "./view_transaction";
import { useEffect, useState } from "react";


export const TRANSACTION_LINKS = [
    {
        title: "All",
        path: ""
    },
    {
        title: "Completed",
        path: "completed"
    },
    {
        title: "Pending",
        path: "pending"
    },
    {
        title: "Cancelled",
        path: "cancelled"
    },
]

export function Transactions(){
    return <div className="p-2 flex flex-col gap-3">
        <div className="font-Archivo text-[22px] font-bold">Transactions</div>
        <div className="flex flex-col gap-0">
            <CustomNavLinks links={TRANSACTION_LINKS} />
            <div className="">
                <Outlet />
            </div>
        </div>
    </div>   
}



const TABLE_FIELDS = [
    {
        heading: "Status",
        key: "status"
    },
    {
        heading: "Amount",
        key: "amount",
        join_before_key: "currency",
        is_currency: true,
        text_format: "uppercase"
    },
    {
        heading: "Description",
        key: "description"
    },
    {
        heading: "Channel",
        key: "payment_channel"
    },
    {
        heading: "Pay Amount",
        key: "amount_to_pay",
        join_after_key: "coin",
        text_format: "uppercase"
    },
    {
        heading: "Chain",
        key: "chain",
    },
    {
        heading: "Created",
        key: "created_at",
        is_date: true
    }
];

const SHORT_TABLE_FIELDS = [
    {
        heading: "Status",
        key: "status",
    },
    {
        heading: "Amount",
        key: "amount",
        join_before_key: "currency",
        is_currency: true,
        text_format: "uppercase"
    },
    {
        heading: "Pay Amount",
        key: "amount_to_pay",
        join_after_key: "coin",
        text_format: "uppercase"
    },
    {
        heading: "Date",
        key: "created_at",
        is_date: true
    },
    {
        heading: "",
        key: null
    }
];

export const TransactionsTable = ({shortVersion, data, filterWith} = {shortVersion: false, data: [], filterWith: null}) => {
    const navigate = useNavigate();

    const {fetch} = useTransaction();
    const [ transactions, setTransactions ] = useState([]);

    const { from_customer } = useOutletContext() || {from_customer: null};


    useEffect(()=>{
        fetch({filter: filterWith || null, from_customer: from_customer}).then(({data})=>{
            setTransactions(data); 
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterWith]);

    return (
        <table className="w-full table-auto border-collapse">
            <thead className="border-t-[2px] w-full border-t-[#66676a2e] font-dmsans font-medium text-[12px] uppercase text-[#76777a] dark:text-[#e6e6e6]">
                <tr className="">
                    {(shortVersion ? SHORT_TABLE_FIELDS : TABLE_FIELDS).map((field, key)=> <th className="py-2 text-start" key={key}>{field.heading}</th>)}
                </tr>
                </thead>
                <tbody className="">
                    {(data || transactions)?.map((transaction, key)=>{
                        return <tr key={key} className="font-semibold font-dmsans text-[12.5px] border-t-[1px] border-t-[#66676a2e] cursor-pointer hover:bg-[#e5e5e538] dark:hover:bg-[#39393938] text-[#212121de] dark:text-[#c1c1c1]"
                                   onClick={()=>{ navigate(`/transactions/${transaction.reference}`) }}>
                                    {
                                        (shortVersion ? SHORT_TABLE_FIELDS : TABLE_FIELDS).map((field, key) => {
                                            let fieldValue = field.key ? transaction[field.key] || "N/A" : <div className="w-[20px]" title="View expanded"><FaEllipsis /></div>;
                                            if(field.is_currency) fieldValue = toTwoDecimalPlaces(fieldValue)
                                            if(field.is_date) fieldValue = new Date(fieldValue).toDateString();
                                            if(field.key === "status") fieldValue = <div className={`tr_status ${fieldValue}`}>{mapKeyToValue(fieldValue)}</div>
                                            if(field.key === "description") fieldValue = fieldValue || "Payment"
                                            
                                            return <td className={`py-[10px] ${field.text_format || "capitalize"}`} key={key}>
                                                {field.join_before_key && transaction[field.join_before_key]} {fieldValue} {field.join_after_key && transaction[field.join_after_key]}
                                            </td>
                                        })
                                    }
                        </tr>
                    })}
                </tbody>
        </table>
    );
}