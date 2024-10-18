import { useEffect, useState } from "react";
import useAPI from "../../../hooks/useApi";
import { useParams } from "react-router-dom";
import classNames from "classnames";

export default function ViewTransaction(){

    const params = useParams();
    const { fetch } = useTransaction({ref: params.id});

    const [ transaction, setTransaction ] = useState(null);

    useEffect(()=>{
        fetch().then(({data})=>{
            if(data){
                setTransaction(data);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])

    return (<>
        <div className="p-2 h-screen">
            <div className="flex items-center gap-2">
                <span className={classNames(`h-[8px] w-[8px] rounded-full tr1_status ${transaction?.status}`)}></span>
                <span className="font-Archivo text-[18px] font-bold">Transaction</span>
                <span className="font-medium text-[12px] bg-[#d4d4d49f] dark:bg-[#3434349f] py-1 px-2 rounded-lg text-[#828282] dark:text-[#bbbbbb] font-inter cursor-pointer">{transaction?.reference}</span></div>
        </div>
        <pre className="bg-[#282C34] text-[#CCCCCC] text-[14px] p-4 rounded-[5px] overflow-x-auto" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
            <code>
                {JSON.stringify(transaction, null, 2)}
            </code>
        </pre>
        </>
    );
}


const useTransaction = ({ref} = {}) => {
    const { get } = useAPI();
    const fetch = async () => {
        try {
            const response = await get(ref ? `/api/p/transaction/fetch?reference=${ref}` : "/api/p/customer/all", []);
        
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