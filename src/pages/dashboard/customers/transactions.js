import { Outlet, useParams } from "react-router-dom";
import { TRANSACTION_LINKS, } from "../transactions/transactions";
import { CustomNavLinks } from "./customers";

export function CustomersTransactions(){
    // const { fetch } = useTransaction();

    // const [ transactions, setTransactions ] = useState([]);

     const params = useParams();

    // useEffect(()=>{
    //     if(params.id){
    //         fetch({from_user: params.id}).then(({data})=>{
    //             setTransactions(data);
    //         })
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [params.id]);

    return (
        <div className="p-2 flex flex-col gap-3">
            <div className="font-Archivo text-[22px] font-bold">Transactions</div>
            <div className="flex flex-col gap-0">
                <CustomNavLinks links={TRANSACTION_LINKS} />
                <div className="">
                    <Outlet context={{from_customer: params.id}} />
                </div>
            </div>
        </div>
    );
}