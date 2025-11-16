import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function TransactionCancelledUI (){
    const transactionData = useSelector((state) => state.transaction.transaction);
    useEffect(()=>{
        if(window.self !== window.top) {
            setTimeout(()=>{
                console.log("sending")
                window.parent.postMessage(
                    {
                        type: 'transaction.cancelled',
                        data: transactionData
                    }, "*"
                )
            }, 2000);
        }
    }, [transactionData]);
    return <>cancelled</>
}