import { Outlet, useNavigate, useParams } from "react-router-dom";
import { TRANSACTION_LINKS, } from "../transactions/transactions";
import { CustomNavLinks } from "./customers";

export function CustomersTransactions(){
    // const { fetch } = useTransaction();

    // const [ transactions, setTransactions ] = useState([]);

     const params = useParams();
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(params.id){
    //         fetch({from_user: params.id}).then(({data})=>{
    //             setTransactions(data);
    //         })
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [params.id]);

    const handleBackClick = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors h-9 rounded-md px-3 cursor-pointer" onClick={handleBackClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2 h-4 w-4"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                    <span>Back</span>
                </div>
            </div>
        <div className="p-2 flex flex-col gap-3">
            <div className="font-Archivo text-[16px] font-bold">Transactions {}</div>
            <div className="flex flex-col gap-0">
                <CustomNavLinks links={TRANSACTION_LINKS} />
                <div className="">
                    <Outlet context={{from_customer: params.id}} />
                </div>
            </div>
        </div>
    </>
    );
}