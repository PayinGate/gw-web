import { useEffect, useState } from "react";
import useAPI from "../../../hooks/useApi";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import toTwoDecimalPlaces from "../../../utils/to2dp";

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
        <div className="p-2 flex flex-col gap-5">
            <div className="flex items-center gap-2">
                <span className={classNames(`h-[8px] w-[8px] rounded-full tr1_status ${transaction?.status}`)}></span>
                <span className="font-Archivo text-[18px] font-bold">Transaction</span>
                <span className="font-medium text-[12px] bg-[#d4d4d49f] dark:bg-[#3434349f] py-1 px-2 rounded-lg text-[#828282] dark:text-[#bbbbbb] font-inter cursor-pointer">{transaction?.reference}</span>
            </div>
            <div className="flex w-full gap-20">
                <div className="w-full flex flex-col gap-6">
                    <div className="w-[80%]">
                        <div className="w-full rounded-2xl px-4 py-6 border-[1px] shadow-sm flex flex-col gap-3">
                            <div className="space-y-1">
                                <div className="font-inter font-semibold text-[15px] text-[#595959]">Amount</div>
                                <div className="font-inter font-bold text-[22px]">₦{toTwoDecimalPlaces(transaction?.amount)}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="space-y-0 w-full">
                                    <div className="font-inter font-semibold text-[14px] text-[#595959]">Status</div>
                                    <div className="font-inter font-bold text-[13px]">
                                        <span className={`tr_status ${transaction?.status} capitalize`}>{transaction?.status}</span>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="font-inter font-semibold text-[13px] text-[#595959]">Payment Method</div>
                                    <div className="font-inter font-bold text-[14px]">
                                        <span className={`capitalize`}>{transaction?.payment_method}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <div className="w-full h-full">
                        chain
                    </div>
                    <div className="w-full h-full">
                        logs
                    </div>
                </div>
            </div>
        </div>
        <div className="h-72" />
        <pre className="bg-[#282C34] text-[#CCCCCC] text-[14px] p-4 rounded-[5px] overflow-x-auto mb-24" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
            <code>
                {JSON.stringify(transaction, null, 2)}
            </code>
        </pre>
        </>
    );
}


export const useTransaction = ({ref} = {}) => {
    const { get } = useAPI();
    const fetch = async ({ filter, from_customer } = {filter: null, from_customer: null}) => {
        try {
            const params = [];
            if(filter){
                params.push(["status", filter]);
            }
            if(ref){
                params.push(['reference', ref]);
            }
            if(from_customer){
                params.push(['from_customer', from_customer]);
            }
            const response = await get(ref ? `/api/p/transaction/fetch` : "/api/p/transaction/all", params);
        
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