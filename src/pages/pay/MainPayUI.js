/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./../../assets/styles/loader.css";
import { DarkModeToggle } from "../../components/dark-toggle";
import classNames from "classnames";
import { QRCode } from "react-qrcode-logo";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../../utils/thousand_seperator";
import TransactionCompleteUI from "./TransactionComplete";
import { TransactionUIWrapper } from "./TransactionUIWrapper";
import CreateAddressUI from "./CreateAddressUI";
import { TRANSACTION_STATES } from "./outlet";
import CheckMark from "../../components/checkmark";


const copyToClipboard = (content) => {

    const isDarkMode =  JSON.parse(localStorage.getItem("darkMode")) ?? (window.matchMedia('(prefers-color-scheme: dark)').matches || false);

    navigator.clipboard.writeText(content);
    toast('Copied!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "dark",
        closeButton: true
        });
}

function MainPayUI(props) {

    const transactionData = useSelector((state) => state.transaction.transaction);

    const { 
        //id = null, 
        //type = null, 
        amount = null, 
        currency = null, 
        //reference = null, 
        //created_at = null, 
        //completed_at = null, 
        //cancelled_at = null, 
        status = null, 
        //callback_url = null, 
        chain = null, 
        deposit_address = null, 
        coin = null, 
        exchange_rate = null, 
        //onchain_transaction_hash = null, 
        //onchain_status = null, 
        //coin_price_usd = null,
        //currency_price_usd = null,
        amount_to_pay = null,
        //deposit_received_at = null,
        address_generated_at = 0,
        coin_contract_address = null
     } = useSelector((state) => state.transaction.transaction);

    const [ copyClicked, setCopyClicked ] = useState(false);

    const [ remainingTime, setRemainingTime ] = useState({
        second: 0,
        minute: 0,
        hour: 0
    });
    const [ endDate, setEndDate ] = useState(0);


    useEffect(()=>{
        const generatedDate = new Date(address_generated_at);
        const _endDate = new Date();
        _endDate.setHours(generatedDate.getHours() + 3);

        setEndDate(_endDate);

    }, [address_generated_at])




    useEffect(()=>{
        
        function updateCountdown(){
    
    
            const now = new Date();
            const timeRemaining = endDate - now;
    
            if (timeRemaining > 0) {
                const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                setRemainingTime({
                    second: seconds,
                    minute: minutes,
                    hour: hours
                });
            } else {
                clearInterval(interval);
                setRemainingTime({
                    second: 0,
                    minute: 0,
                    hour: 0
                });
            }
        }


        const interval = setInterval(updateCountdown, 1000);

        return ()=>clearInterval(interval);

    });


    const copy = (content)=> {
        setCopyClicked(true);
        copyToClipboard(content);
        setTimeout(()=>{
            setCopyClicked(false);
        }, 2000)
    }

    useEffect(()=>{
        console.log(status);
    }, [status])

    switch(status) {
        case "initialized":
            return <TransactionUIWrapper>
                        <CreateAddressUI />
                    </TransactionUIWrapper>
        case "completed":
            return  <TransactionUIWrapper>
                        <TransactionCompleteUI />
                    </TransactionUIWrapper>
        case "cancelled":
            return <>cancelled</>
        default:
            return (
                <div className="w-full h-full flex flex-col space-y-3">
                    <div className="flex justify-between items-center px-1 select-none">
                        <div className="p-1 " title="Time remaining">
                            <span className="text-[13px] text-[#363636] dark:text-white font-Inter font-medium">Time remaining: </span> 
                            <span className="text-[16px] text-[#ff7950]  font-Bebas">{formatTime(remainingTime)}</span>
                        </div>
                        <div>
                            <DarkModeToggle />
                        </div>
                    </div>
                    <div className=" w-full h-full bg-white rounded-xl transition ease-in delay-50 dark:bg-[#181a1b] relative flex flex-col px-2 py-4">
                        <div className="w-full flex flex-col items-center space-y-12 my-auto">
                            <div className="flex flex-col items-center">
                                <div className="font-CircularStd font-medium text-[24px] text-[#585858] dark:text-[#b7b7b7]">Complete payment for <span className="uppercase">{currency}</span> {amount}</div>
                                <div className="flex items-center w-fit text-[13px] font-inter hover:border-b-[1px] py-[0.4px] cursor-pointer">
                                    <div className="currency_from uppercase">{amount} {currency}</div>
                                    <div className="switch-rate"></div>
                                    <div className="currency_to uppercase">{amount_to_pay} {coin}</div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center space-y-4">
                                <div className="flex space-x-5">
                                    <>
                                        <QRCode value={deposit_address || ""} logoImage="https://solana.com/src/img/branding/solanaLogoMark.svg" removeQrCodeBehindLogo={true} />
                                    </>
                                    <div className="h-full w-[280px] border-[2px] rounded-md px-3 py-2 dark:border-[#363b3d]">
                                        <div className="w-full h-full flex flex-col space-y-2">
                                            <div className="flex flex-col space-y-[-5px]">
                                                <div className="font-futura text-[12px] font-bold text-[#656565] dark:text-[#bebebe]">Amount</div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-[24px] font-CircularStd font-bold uppercase">{amount_to_pay} {coin}</div>
                                                    <div className="">
                                                        <button className="hover:scale-[0.9] active:scale-[1.1] transition-all ease-in-out duration-300 z-[2]"
                                                                onClick={()=>copyToClipboard(amount_to_pay)}
                                                                title="Copy amount"
                                                                >
                                                            <IoCopyOutline  />
                                                        </button>
                                                    </div>
                                                </div>
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
                                </div>
                                <div className>
                                    <div className={classNames(
                                        {"address-border border-[2px] rounded-md px-3 py-2 dark:border-[#363b3d] relative": true},
                                        {"border-animate": copyClicked }
                                        )}>
                                        <div className="w-full flex items-center space-x-3">
                                            <div className="font-medium font-Manrope text-[15px] tracking-wider">{deposit_address}</div>
                                            <button className="hover:scale-[0.9] active:scale-[1.1] transition-all ease-in-out duration-300 z-[2]"
                                                    onClick={()=>copy(deposit_address)}>
                                                <IoCopyOutline color={copyClicked ? "#60daaa" : "inherit"} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="disclamer-warning font-inter text-[12px] font-medium text-[#656565] dark:text-[#bebebe]">Deposit <span className="uppercase font-bold">{amount_to_pay} {coin}</span> to the above address to complete transaction.</div>
                                {coin_contract_address ? <div className="disclamer-warning font-inter text-[13px] text-[#656565] dark:text-[#bebebe] font-bold">CA: <span className="">{coin_contract_address}</span> </div> : <></> }
                            </div>
                        </div>
                        <div className="mt-auto w-full flex justify-between items-end">
                            <div className=" font-CircularStd text-[13px]">
                                <span className="font-Bebas tracking-wider">client:</span> \Client{}\
                            </div>
                            <StatusUI />
                        </div>
                    </div>
                </div>
            );
    }
}


function StatusUI(props) {

    const { 
        status = null, 
     } = useSelector((state) => state.transaction.transaction);

    const [ currentState, setCS ] = useState("");
    //const [ currentStateIndex, setCSI ] = useState(0);

    useEffect(()=>{
        setCS(status);
        //setCSI(prevIndex => (prevIndex + 1) % TRANSACTION_STATES.length);
    }, [status])
    
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCS(TRANSACTION_STATES[currentStateIndex].key);
    //         setCSI(prevIndex => (prevIndex + 1) % TRANSACTION_STATES.length);
    //     }, 3000);
        
    //     return () => clearInterval(interval);
    // }, [currentStateIndex]);

    return (
        <div className="w-[180px] flex flex-col space-y-2 text-[14px] pt-2 font-futura">
            {
                TRANSACTION_STATES.map((state, key) => {
                    return <TransactionStateUI state={state} key={key} currentState={currentState} />
                })
            }
        </div>
    );
}


function TransactionStateUI({currentState, state}) {

    const { running, completed } = useStatus({
        currentState: currentState,
        key: state.key
    });


    return (
        <div className={classNames({
            "flex items-center space-x-3 p-1 select-none transition-all relative right-0 visible": true,
            "overflow-hidden p-0 h-0 w-0 right-[-1000px]": !running && !completed
        })}>
            { !running && !completed ? 
                <div className="h-[18px] w-[18px] border-[2px] rounded-full"></div>
                : (
                    running && !completed ? <div className="state-spinner"></div> :
                                             <CheckMark />
                )
             }
            <div className={classNames({"text-[#25b09b] font-medium transition-all": running || completed})}>{state.value}</div>
        </div>
    );
}


const useStatus = ({currentState, key}) => {
    const [running, setRunning] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(()=>{
        const stateKeys = TRANSACTION_STATES.map((state)=> state.key);
        const keyIndex = stateKeys.indexOf(key);
        const currentStateIndex = stateKeys.indexOf(currentState);

        if(currentStateIndex < keyIndex) {
            setRunning(false);
            setCompleted(false)
        }
        else if(keyIndex === currentStateIndex) {
            setRunning(true);
            setCompleted(false);
            if(currentState === "completed") { // completed
                setRunning(false);
                setCompleted(true);
            }
        }
        else {
            setRunning(false);
            setCompleted(true);
        }


    }, [key, currentState])
    
    return { running, completed }
}


function formatTime(time){
    const hourTime = time.hour < 9 ? `0${time.hour}` : time.hour;
    const minuteTime = time.minute < 9 ? `0${time.minute}` : time.minute;
    const secondsTime = time.second < 9 ? `0${time.second}` : time.second;
    const newTime = `${hourTime}:${minuteTime}:${secondsTime}`;
    return newTime;
}


export default MainPayUI;