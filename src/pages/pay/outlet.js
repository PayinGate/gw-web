import { useEffect, useState } from "react";
import useAPI from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import "./../../assets/styles/loader.css";
import { DarkModeToggle } from "../../components/dark-toggle";
import { store } from "../../context/slice";
import { useSelector, useDispatch } from "react-redux";
import "../../utils/thousand_seperator";
import MainPayUI from "./MainPayUI";


// const isRequestSuccessful = (res) => {
//     try {
//         if(res["success"] === "success"){
//             return true;
//         }
//         return false;
//     }
//     catch {
//         return false;
//     }
// }

const TRANSACTION_STATES = [
    {key: "initialized", value: "Initialized"},
    {key: "awaiting_payment", value: "Awaiting payment"},
    {key: "awaiting_confirmation", value: "Confirming"},
    {key: "completed", value: "Complete"},
    {key: "cancelled", value: "Cancelled"}
]


export { TRANSACTION_STATES };




export default function PayOutlet(){
    const { loading, error, get } = useAPI();
    const { id } = useParams();
    const [ showLoading, setShowLoading ] = useState(true);
    
    const transactionData = useSelector((state) => state.transaction.transaction);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchData = async ( isRecurring = false ) => {
            try {
                if(isRecurring) setShowLoading(false);
                const response = await get('/api/p/transaction/fetch', { reference: id });
                dispatch(store(response.data));
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    
        fetchData();
    
        const interval = setInterval(() => {
            fetchData(true);
        }, 10000); // fetch the data every 10s
    
        return () => clearInterval(interval);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ id ]);
    

    return (
    <div className="w-full h-full overflow-hidden">
        { loading && showLoading ? <PageLoading /> : (Object.keys(transactionData).length === 0  ? <>Error</> :  <MainPayUI /> ) }
    </div>);
}


function PageLoading(){
    return <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="absolute top-4 right-4">
            <DarkModeToggle />
        </div>
        <div className="loader"></div></div>;
}








