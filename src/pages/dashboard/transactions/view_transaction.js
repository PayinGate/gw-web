import { useEffect, useState } from "react";
import useAPI from "../../../hooks/useApi";
import { Link, useNavigate, useParams } from "react-router-dom";
// import classNames from "classnames";
// import toTwoDecimalPlaces from "../../../utils/to2dp";
// import { IoCalendar, IoCalendarOutline } from "react-icons/io5";
import { HiOutlineCalendar } from "react-icons/hi";
import { Ban, Copy } from "lucide-react";


const STATUS_MAPPER = [
    {
        key: "awaiting_payment", 
        value: "Awaiting Payment"
    },
    {
        key: "awaiting_confirmation",
        value: "Awaiting Confirmation"
    },
    {
        key: "initialied",
        value: "Initialized"
    },
    {
        key: "cancelled",
        value: "Cancelled"
    },
    {
        key: "completed",
        value: "Completed"
    }
]

const DETAILS = [
    {
        title: "Amounts",
        style: "text-sm",
        alwaysShow: true,
        details: [
            {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign h-4 w-4 text-[#737373]"><line x1="12" x2="12" y1="2" y2="22"></line><path  d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
                title: "Fiat Amount",
                key: "amount",
                style: "font-bold text-lg",
                before_key: "currency"
            },
            {
                icon:<svg    xmlns="http://www.w3.org/2000/svg"    width="24"    height="24"    viewBox="0 0 24 24"    fill="none"    stroke="currentColor"    strokeWidth="2"    strokeLinecap="round"    strokeLinejoin="round"    className="lucide lucide-hash h-4 w-4 text-[#737373]"  >    <line x1="4" x2="20" y1="9" y2="9"></line>    <line x1="4" x2="20" y1="15" y2="15"></line>    <line x1="10" x2="8" y1="3" y2="21"></line>    <line x1="16" x2="14" y1="3" y2="21"></line>  </svg>,
                title: "Crypto Amount",
                key: "amount_to_pay",
                after_key: "coin",
                alwaysShow: false
            },
            {
                icon: <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="lucide lucide-shuffle h-4 w-4 text-[#737373]">  <path d="m18 14 4 4-4 4"></path>  <path d="m18 2 4 4-4 4"></path>  <path    d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"  ></path>  <path    d="M2 6h1.972a4 4 0 0 1 3.6 2.2"  ></path>  <path    d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"  ></path></svg>,
                title: "Exchange Rate",
                key: "exchange_rate",
                rate: true,
                alwaysShow: false
            },
        ]
    },
    {
        title: "On-Chain Details",
        style: "text-sm truncate max-w-[20ch] sm:max-w-[25ch] md:max-w-[30ch]",
        alwaysShow: false,
        details: [
            {
                icon: <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="lucide lucide-globe h-4 w-4 text-[#737373]">  <circle cx="12" cy="12" r="10"></circle>  <path    d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"  ></path>  <path d="M2 12h20"></path></svg>,
                title: "Chain",
                key: "chain"
            },
            {
                icon: <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="lucide lucide-server h-4 w-4 text-[#737373]">  <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>  <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>  <line x1="6" x2="6.01" y1="6" y2="6"></line>  <line x1="6" x2="6.01" y1="18" y2="18"></line></svg>,
                title: "Deposit Address",
                key: "deposit_address",
                copy: true
            },
            {
                icon: <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="lucide lucide-copy h-3 w-3">  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>  <path    d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"  ></path></svg>,
                title: "Transaction Hash",
                key: "onchain_transaction_hash",
                copy: true
            },
        ]
    },
    {
        title: "Metadata",
        style: "text-sm font-medium",
        alwaysShow: true,
        details: [
            {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4 text-[#737373]"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>,
                title: "Created At",
                key: "created_at",
                date: true,
                alwaysShow: true
            },
            {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big h-4 w-4 text-[#737373]"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>,
                title: "Completed At",
                key: "completed_at",
                date: true
            },
            {
                icon: <Ban size={16} color={'#737373'}/>,
                title: "Cancelled At",
                key: "cancelled_at",
                date: true
            },
            {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hash h-4 w-4 text-[#737373]"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>,
                title: "Status",
                key: "status",
                status: true,
                alwaysShow: true
            },
        ]
    }
]

const TIMELINE = [
    {
        title: "Transaction Created",
        key: "created_at",
        icon: <HiOutlineCalendar /> 
    },
    {
        title: "Deposit Address Generated",
        key: "address_generated_at",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server h-4 w-4 text-secondary-foreground"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect><rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect><line x1="6" x2="6.01" y1="6" y2="6"></line><line x1="6" x2="6.01" y1="18" y2="18"></line></svg>
    },
    {
        title: "Deposit Received",
        key: "deposit_received_at",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign h-4 w-4 text-secondary-foreground"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    },
    {
        title: "Transaction Completed",
        key: "completed_at",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big h-4 w-4 text-secondary-foreground"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
    },
    {
        title: "Transaction Cancelled",
        key: "cancelled_at",
        icon: <Ban size={16} />
    }

];

const PAYMENT = [
    {
        title: "Payment Method",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card h-4 w-4 text-[#737373]"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>,
        key: "payment_method",
        style: "text-sm font-medium capitalize"
    },
    {
        title: "Reference",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hash h-4 w-4 text-[#737373]"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>,
        key: "reference",
        style: "text-sm font-medium"
    },
    {
        title: "Fees Denomination",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign h-4 w-4 text-[#737373]"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
        key: "coin",
        style: "text-sm font-medium uppercase"
    }
]

export default function ViewTransaction(){

    const params = useParams();
    const navigate = useNavigate();
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


    const handleBackClick = () => {
        navigate(-1);
    }




    return (<div>
        <div className="flex items-center justify-between my-4">
            <div class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors h-9 rounded-md px-3 cursor-pointer" onClick={handleBackClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left mr-2 h-4 w-4"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>Back
            </div>
            <div className={`rounded-full  text-sm font-medium text-white   tr1_status ${transaction?.status}  flex items-center gap-2 py-1 px-3`}>
            {mapKeyToValue(transaction?.status)}
            </div>
        </div>
        <div className="flex gap-8 w-full font-inter">
            <div className="w-[65%] flex flex-col gap-8">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="text-xl font-semibold leading-none tracking-tight">Transaction Details</div>
                        <div className="text-sm text-[#737373]">
                          ID: {transaction && transaction.id}
                        </div>
                    </div>
                    <div className="p-6 pt-0 space-y-4">
                        {transaction && DETAILS.map((detail, key)=>{
                            if(transaction.status === "cancelled" && !detail.alwaysShow) return <></>
                            return (
                                <div className="group">
                                <div key={key}>
                                    <div className="text-sm font-medium text-[#737373] mb-2">
                                        {detail.title}
                                    </div>
                                    {detail.details.map((realDetails, key2)=>{
                                        if((realDetails.alwaysShow === false && transaction.status === "cancelled") || transaction[realDetails.key] == null) return <></>
                                        return <div className="flex justify-between py-2" key={key2}>
                                                    <div className="flex items-center gap-3">
                                                        {realDetails.icon}
                                                        <span className="text-sm text-[#737373]">{realDetails.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                <span className={realDetails.style || detail.style} style={{display: "flex", gap: "2px", alignItems: "center"}}>
                                                    <span className="uppercase">{realDetails.before_key && transaction[realDetails.before_key]}</span>
                                                    {
                                                    !realDetails.rate ? <span className="capitalize">{realDetails.date ? formatDate(transaction[realDetails.key]) : (realDetails.status ? mapKeyToValue(transaction[realDetails.key]) : transaction[realDetails.key])}</span>
                                                    : 
                                                    <span className="uppercase">1 {transaction.currency} ≈ {transaction.exchange_rate} {transaction.coin}</span>
                                                    }
                                                    <span className="uppercase">{realDetails.after_key && transaction[realDetails.after_key]}</span>
                                                    
                                                </span>
                                                {realDetails.copy && <span className="cursor-pointer]"><Copy size={16} /></span> }
                                                </div>
                                        </div>
                                    })}

                              </div>
                                <div dataOrientation="horizontal" role="none" class="shrink-0 bg-[#e5e5e5] h-[1px] my-4 w-full group-last:hidden"></div>
                              </div> 
                            );
                        })}
                    </div>
                  
                </div>



                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="text-xl font-semibold leading-none tracking-tight">Transaction Timeline</div></div>
                        <div className="p-6 pt-0">
                            {transaction && TIMELINE.map((timeline, key)=>{
                                if(transaction[timeline.key])
                                return <div className="flex gap-4 group" key={key}>
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f5]">
                                            {timeline.icon}
                                        </div>
                                        <div className="w-px flex-1 bg-[#e5e5e5] group-last:hidden"></div>
                                    </div>
                                    <div className="pb-8">
                                        <div className="font-medium text-base">{timeline.title}</div>
                                        <div className="text-sm text-[#737373]">{formatDate(transaction[timeline.key])}</div>
                                    </div>
                                </div>
                                else return <></>
                            })}
                    </div>
                </div>
            </div>
            <div className="w-[35%] flex flex-col gap-8">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="text-xl font-semibold leading-none tracking-tight">Customer</div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="flex justify-between py-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-[#737373]">Email</span>
                            </div>
                            <span className="text-sm font-medium">{transaction?.customer_email}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store h-4 w-4 text-[#737373]"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path></svg>
                                    <span className="text-sm text-[#737373]">Merchant</span>
                                </div>
                                <span className="text-sm font-medium">{transaction?.merchant.name}</span>
                                </div><div className="pt-2">
                                    {(transaction && transaction.customer_id) ? <Link className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full" to={`/customers/${transaction?.customer_id}`}>View Customer</Link> : <></> }
                                </div>
                            </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <div className="text-xl font-semibold leading-none tracking-tight">
                        Payment Details
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                        {transaction && PAYMENT.map((payment, key)=>{
                            if(!transaction[payment.key]) return <></>;
                            return  <div className="flex justify-between py-2" key={key}>
                                <div className="flex items-center gap-2">
                                  {payment.icon}
                                  <span className="text-sm text-[#737373]">{payment.title}</span>
                                </div>
                                <span className={payment.style}>{transaction[payment.key]}</span>
                              </div>
                        })}
                    </div>
                </div>
            </div>
        </div>    
        <div className="h-20"></div>

        {/* <div className="p-2 flex flex-col gap-5">
            <div className="flex items-center gap-2">
                <span className={classNames(`h-[8px] w-[8px] rounded-full tr1_status ${transaction?.status}`)}></span>
                <span className="font-Archivo text-[18px] font-bold">Transaction</span>
                <span className="font-medium text-[12px] bg-[#d4d4d49f] dark:bg-[#3434349f] py-1 px-2 rounded-lg text-[#828282] dark:text-[#bbbbbb] font-inter cursor-pointer">{transaction?.reference}</span>
            </div>
            <div className="flex w-full gap-20">
                <div className="w-[45%] flex flex-col gap-6">
                    <div className="w-full">
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
                <div className="w-full flex flex-col gap-5 rounded-lg p-3">
                    <div className="w-full h-full shadow-sm">
                        chain
                    </div>
                    <div className="bg-[#282C34]  text-[14px] p-4 rounded-[5px] mb-24" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
                        <div className="">Logs</div>
                        <div className="font-dmsans font-medium flex flex-col gap-1 text-[#CCCCCC]">
                            {Array.from({length: 20}).map(()=> 
                            <div><span className="">{">"}</span> <span className="text-[12px]">09/10/2024 10:54 AM:</span> <span className="text-white">initialized transaction</span></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="h-72" />
        <pre className="bg-[#282C34] text-[#CCCCCC] text-[14px] p-4 rounded-[5px] overflow-x-auto mb-24" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}>
            <code>
                {JSON.stringify(transaction, null, 2)}
            </code>
        </pre> */}
        </div>
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
            const response = await get(ref ? `/transaction/fetch` : "/transaction/all", params);
        
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

function formatDate(rawDate){
    const date = new Date(rawDate);
    return date.toLocaleString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });
}

export function mapKeyToValue(key) {
    return STATUS_MAPPER.find((v)=>v.key === key)?.value || key;
}