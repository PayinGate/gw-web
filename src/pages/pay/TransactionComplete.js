import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckMark from "../../components/checkmark";
import { TbExternalLink } from "react-icons/tb";

function TransactionCompleteUI(props) { 
    const transactionData = useSelector((state) => state.transaction.transaction);
    const steps = useSelector((state) => state.transaction.steps);

    const [callbackCountdown, setCallbackCountdown] = useState(10);

    const { chain, amount_to_pay, coin, currency, exchange_rate, amount } = transactionData;


    //callback_url = null, 

    const transactionDetails = [
        {
            title: "Deposit Address",
            key: "deposit_address",
            external_link: true,
            link: "https://explorer.solana.com/address/"
        },
        {
            title: "Transaction hash",
            key: "onchain_transaction_hash",
            external_link: true,
            link: "https://explorer.solana.com/tx/"   
        },
        {
            title: "Status",
            key: "onchain_status",
        },
        {
            title: "Deposit received",
            key: "deposit_received_at",
            isDate: true
        }

    ];

    useEffect(()=>{
        const interval =  setInterval(()=>{
            if(callbackCountdown > 0){
                setCallbackCountdown(callbackCountdown - 1);
            }
            else {
                clearInterval(interval);
                // window.location = transactionData["callback_url"];
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [callbackCountdown])

    // send iframe message

    useEffect(()=>{
        if(window.self !== window.top) {
            setTimeout(()=>{
                window.parent.postMessage(
                    {
                        type: 'transaction.completed',
                        data: transactionData
                    }, "*"
                )
            }, 2000);
        }
    }, [transactionData]);


    return <div className="p-4 w-full h-full flex flex-col items-center space-y-6">
                <div className="">
                    <div className="font-CircularStd font-medium text-[24px] text-[#585858] dark:text-[#b7b7b7]">Payment for <span className="uppercase">{currency}</span> {amount.thousandSeperator()} Completed</div>
                </div>
                <div className="">
                    <CheckMark width={150} height={150} />
                </div>
                <div className="w-full px-12 py-5 flex gap-6 flex-row-reverse">
                    <div className="min-w-[280px] w-[380px] h-fit border-[2px] rounded-md px-3 py-2 dark:border-[#363b3d]">
                        <div className="w-full h-full flex flex-col space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col space-y-[-2px]">
                                    <div className="font-futura text-[12px] font-bold text-[#656565] dark:text-[#bebebe]">Amount (Currency)</div>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-[16px] font-CircularStd font-bold uppercase">{currency} {amount}</div>
                                    </div>
                                </div>

                                <div className="switch-rate !w-[20px]"></div>
                                

                                <div className="flex flex-col space-y-[-2px] text-right">
                                    <div className="font-futura text-[12px] font-bold text-[#656565] dark:text-[#bebebe]">Amount (Coin)</div>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-[16px] font-CircularStd font-bold uppercase">{amount_to_pay} {coin}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-[-2px]">
                                <div className="font-futura text-[12px] font-bold text-[#656565] dark:text-[#bebebe]">Coin</div>
                                <div className="text-[16px] font-CircularStd uppercase">{coin}</div>
                            </div>
                            <div className="flex flex-col space-y-[-2px]">
                                <div className="font-futura text-[12px] font-bold text-[#656565] dark:text-[#bebebe]">Chain</div>
                                <div className="text-[16px] font-CircularStd capitalize">{chain}</div>
                            </div>
                            <div className="flex flex-col space-y-[-2px]">
                                <div className="font-futura text-[12px] font-bold text-[#656565] dark:text-[#bebebe]">Rate</div>
                                <div className="text-[13px] font-CircularStd text-[#4f4f4f] dark:text-[#bebebe] uppercase">1 {currency} = {exchange_rate} {coin}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full overflow-hidden break-words h-full border-[2px] rounded-md px-3 py-2 dark:border-[#363b3d] flex flex-col space-y-4">
                        {transactionDetails.map((detail, key) => {
                            const detailValue = transactionData[detail.key] || "";
                            return (
                                <div className="flex flex-col space-y-[-1px]" key={key}>
                                    <div className="font-futura text-[14px] font-bold text-[#656565] dark:text-[#bebebe]">{detail.title}</div>
                                    
                                    <div className="text-[13px] font-CircularStd flex items-center gap-0">
                                        <span>{ detail.isDate ? dateTime(detailValue) : ( detailValue.length > 25 ? clipText(detailValue, 12) : detailValue )}</span>
                                        {detail.external_link && 
                                            <a href={`${detail.link}${detailValue}?cluster=devnet`} target="_blank" rel="noreferrer" className="p-2">
                                                <span><TbExternalLink /></span>
                                            </a>
                                        }
                                    </div> 
                                </div>
                            );
                        })}
                    </div>
                </div>
                {steps.length > 0 &&  <div className="font-Inter text-[13px]">
                    Returning to client in {callbackCountdown}s
                </div>}
        </div>
}


export default TransactionCompleteUI;

function dateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

function clipText(text, clipAt){
    return text.substr(0, clipAt) + '...' + text.substr(-clipAt)
}