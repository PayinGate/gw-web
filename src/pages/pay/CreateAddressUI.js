import { useDispatch, useSelector } from "react-redux";
import useAPI from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CustomSelect } from "../../components/customSelect";
import { IoMdRefresh } from "react-icons/io";
import { store } from "../../context/slice";

function CreateAddressUI() {
    const transactionData = useSelector((state) => state.transaction.transaction);

    const { get } = useAPI();
    const { loading: loadingRates, error: errorRates, get : getRatesApi } = useAPI();
    // eslint-disable-next-line no-unused-vars
    const { post: postGenAddy, loading: loadingGenAddy, error: errorGenAddy } = useAPI();
    const dispatch = useDispatch();

    const { id, reference } = transactionData;

    const [ chainOptions, setChainOptions ] = useState([]);
    const [ coinOptions, setCoinOptions ] = useState([]);
    const [ selectedChain, setSelectedChain ] = useState(null);
    const [ selectedCoin, setSelectedCoin ] = useState(null);
    const [ rates, setRates ] = useState(null);
    const [ chainsInfo, storeChainsInfo ] = useState([]);

    const [ useDefaultRateDisplay, setRateDisplay ] = useState(true);


    const [ refreshCount, setRefreshCount ] = useState(10);


    const createChainOptions = (list)=>{
        return list.map((value) => {
            return {key: value.chain, name: value.chain}
        })
    }

    const createCoinOptions = (selectedChain) => {
        setSelectedCoin(null);
        setRates(null);

        const coinOptions = [{key: "0", name: "Select Coin"}]
        const options = chainsInfo.find((chains)=>{
            return chains.chain === selectedChain

        })?.coins?.map((value) => {
             return {key: value.coin, name: value.coin}
        }) || {}

        if(options.length >= 1) {
            setCoinOptions(coinOptions.concat(options));
        } // select chain stands as one
        else {
            setCoinOptions([]);
        }
    }


    const onSelectChain = (selectedIndex) => {

        setCoinOptions([]);

        if(chainOptions[selectedIndex].key !== "0") {
            setSelectedChain(chainOptions[selectedIndex].key);
            createCoinOptions(chainOptions[selectedIndex].key);
        }
        else {
            setRates(null);
        }
    }

    const onSelectCoin = (selectedIndex) => {

        if(coinOptions[selectedIndex].key !== "0") {
            setSelectedCoin(coinOptions[selectedIndex].key)
            fetchRate(coinOptions[selectedIndex].key);
        }
        else {
            setRates(null);
            setSelectedCoin(null);
        }
    }


    const fetchChains = async () => {
        try {
            const response = await get('/api/coins');
            const chains_coins = Object.values(response.data);
            storeChainsInfo(chains_coins);

            const chainOptions = [{key: "0", name: "Select Chain"}]
            setChainOptions(chainOptions.concat(createChainOptions(chains_coins)), );

        }
        catch(error) {
            console.error('Error: ', error);
        }
    }

    const fetchRate = async (coin = selectedCoin) => {
        try {
            const response = await getRatesApi(`/api/rate/${transactionData.currency}/${coin}`, { amount: transactionData.amount });
            setRates(response.data);
        }
        catch(error) {
            console.error('Error: ', error);
            toast('Error fetching rates', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                closeButton: true,
                type: "error",
                });
        }
    }

    const generateAddress = async () => {
        if(id && reference && selectedChain && selectedCoin && rates) {
            const postParams = {
                transaction_id: id, 
                reference: reference, 
                chain: selectedChain, 
                coin: selectedCoin,
                rates: rates
            }
            try {
                const response = await postGenAddy('/api/p/transaction/generate-address', postParams);
                if(response["success"] === true){
                    dispatch(store(response));
                }
            }
            catch(error) {
                console.error('Error: ', error);
                let message;
                if(errorGenAddy.message){
                    message = errorGenAddy.message;
                }
                else {
                    message = "Error fetching rate. Check internet connection";
                }
                console.log(message);
                toast(message, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    closeButton: true,
                    type: "error",
                    });
            }
        }
    }
    

    useEffect(()=>{
        const refreshTimer = setInterval(()=>{
            if(selectedCoin){
                setRefreshCount(prevCount => {
                    const newCount = prevCount === 0 ? 10 : prevCount - 1;
                    if (newCount === 0) {
                        fetchRate();
                    }
                    return newCount;
                });
            }
        }, 1000)

        return () => {
            setRefreshCount(10);
            clearInterval(refreshTimer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCoin])

    useEffect(()=>{

        
        fetchChains();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return <div className="w-full h-full flex flex-col items-center p-5 space-y-12">
        <div className="">
            <div className="font-CircularStd font-medium text-[24px] text-[#585858] dark:text-[#b7b7b7]">Create Deposit Address</div>
        </div>
        <div className="w-[380px] flex flex-col space-y-4">
            <div>
                <CustomSelect background="#F5F5F5" border="0px" pOptions={chainOptions} callbackTrigger={onSelectChain} />
            </div>
            <div>
                <CustomSelect background="#F5F5F5" border="0px" pOptions={coinOptions} callbackTrigger={onSelectCoin} />
            </div>


            <div  className="flex flex-col gap-6">
                <div className="empty:hidden">
                    {
                        loadingRates ? <div className="flex items-center space-x-2 font-futura text-[13px]">
                            <div className="trans_loader"></div>
                            <span>Fetching rates</span>
                        </div> : <></>
                    }
                    {
                        errorRates && !loadingRates ? <div className="flex items-center space-x-2 font-futura text-[13px] text-red-500">
                            <span>Error fetching rates</span>
                        </div> : <></>
                    }
                </div>
                
                {rates && !loadingRates && !errorRates &&
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col space-y-[-2px]">
                            <div className="font-futura text-[12px] font-bold text-[#656565] dark:text-[#bebebe]">Rate</div>
                            <div className="flex items-center text-[13px] font-CircularStd text-[#4f4f4f] dark:text-[#bebebe] uppercase hover:border-b-[0.5px] py-[0.4px] w-fit cursor-pointer select-none" 
                                onClick={()=>setRateDisplay(!useDefaultRateDisplay)}>
                                    <div className="currency_from uppercase">1 { useDefaultRateDisplay ? rates.convert_from : rates.convert_to}</div>
                                    <div className="switch-rate"></div>
                                    <div className="currency_to uppercase">{useDefaultRateDisplay ? rates.rate : (1/rates.rate)} {useDefaultRateDisplay ? rates.convert_to : rates.convert_from}</div>
                                </div>
                        </div>
                        <div className="flex flex-col space-y-[-2px]">
                            <div className="font-futura text-[12px] font-bold text-[#656565] dark:text-[#bebebe]">Pay Amount</div>
                            <div className="text-[13px] font-CircularStd text-[#4f4f4f] dark:text-[#bebebe] uppercase">{rates.new_amount} {rates.convert_to}</div>
                        </div>
                        <div className="flex items-center gap-1">
                            <span><IoMdRefresh className="text-[15px]" /></span>
                            <span className="font-futura text-[13px]">{refreshCount}s</span>
                        </div>
                    </div>
                }
                {
                    rates &&
                    <div className="flex items-center w-full gap-4">
                    <button disabled={loadingRates || errorRates} className="disabled:bg-gray-300 w-full bg-[#25b09b] hover:bg-[#0c907c] text-white font-bold py-2 px-4 rounded font-inter" onClick={generateAddress}>
                        Pay
                    </button>
                    <button disabled={loadingRates || errorRates} className="disabled:bg-gray-300 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded font-inter">
                        Cancel
                    </button>
                </div>
                }
                </div>
        </div>
    </div>
}


export default CreateAddressUI;