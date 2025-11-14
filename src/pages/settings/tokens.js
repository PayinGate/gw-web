/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import useAPI from "../../hooks/useApi";
import classNames from "classnames";



const TOkEN_LINKS = [
    {
        title: "Private",
        path: "private"
    },
    {
        title: "Public",
        path: "public"
    }
];


const TABLE_FIELDS = [
    {
        heading: "Token",
        key: "token",
        reduce: true,
        text_format: "lowercase"
    },
    {
        heading: "Status",
        key: "status"
    },
    {
        heading: "Usage Count",
        key: "usage_count"
    },
    {
        heading: "Last Used",
        key: "last_time_used",
        is_date: true
    },
    {
        heading: "Created At",
        key:"created_at",
        is_date: true
    }
];

export default function APISettings(){

    const { fetch, generatePrivate, generatePublic, revokePrivate, revokePublic } = useTokens();
    const [ currentPath, setPath ] = useState("private");
    const [tokens, setTokens] = useState({});

    useEffect(()=>{
        fetchTokens();        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchTokens = () => {
        fetch()
            .then((tokens)=>{
                setTokens(tokens);
            })
            .catch((error)=>{
                
            })
    }

    const generatePublicToken = ()=>{
        generatePublic().then((token)=>{
            fetchTokens();
        })
    }
    
    const generatePrivateToken = ()=>{
        generatePrivate().then((token)=>{
            fetchTokens();
        })
    }
    const revokePublicToken = ()=>{
        revokePublic().then((token)=>{
            fetchTokens();
        })
    }
    const revokePrivateToken = ()=>{
        revokePrivate().then((token)=>{
            fetchTokens();
        })
    }


    return <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="font-Archivo text-[22px] font-bold">Tokens</div>
                    <div className="font-semibold font-dmsans text-[10px]  bg-[#27AE601A] text-[#27ae60] rounded-md py-[2px] px-[8px]">Test</div>
                </div>
                <div className="font-medium text-[13px] text-[#474747] dark:text-[#cecece] font-inter">
                    API tokens allow your application to securely access the Payment API. Keep them secret.
                </div>
            </div>

        </div>
        <div className="h-[0.8px] w-full bg-[#dadada] font-inter"></div>
        <div className="flex gap-5 justify-between">
            <div className="flex flex-col gap-1 w-full max-w-[49%] overflow-hidden">
                <div className="font-medium font-dmsans text-[14px]">Private Key</div>
                <div className="w-full rounded-lg text-[12px] border-[1px] bg-[#fff] dark:bg-[#313131] p-2 flex items-center gap-4 justify-between">
                    <div className="text-[#525252] dark:text-white overflow-hidden whitespace-nowrap">{(tokens?.private?.find((token)=>token.status == "active")?.token) || <span>No API token present</span>}</div>
                    <button className="dark:bg-[#313131] bg-white border-[1px] border-[#525252] font-semibold cursor-pointer py-1 px-2 rounded-lg">
                    Copy
                    </button>
                </div>
                <div className="flex items-center gap-4 py-1">
                    <button className="text-[12px] bg-[#025e02] rounded-md px-3 py-2 text-white font-semibold font-dmsans" onClick={generatePrivateToken}>Generate new private key</button>
                    <button className="text-[12px] bg-[#b50101] rounded-md px-3 py-2 text-white font-semibold font-dmsans" onClick={revokePrivateToken}>Revoke</button>
                </div>
            </div>

            <div className="flex flex-col gap-1 w-full  max-w-[49%] overflow-hidden">
                <div className="font-medium font-dmsans text-[14px]">Public Key</div>
                <div className="rounded-lg text-[12px] border-[1px] bg-[#fff] dark:bg-[#313131] p-2 flex items-center gap-4 justify-between">
                    <div className="dark:text-white text-[#525252] overflow-hidden  whitespace-nowrap">{tokens?.public?.find((token)=>token.status == "active")?.token || <span>No API token present</span>}</div>
                    <button className="dark:bg-[#313131] bg-white border-[1px] border-[#525252] font-semibold cursor-pointer py-1 px-2 rounded-lg">
                    Copy
                    </button>
                </div>
                <div className="flex items-center gap-4 py-1">
                    <button className="text-[12px] bg-[#025e02] rounded-md px-3 py-2 text-white font-semibold font-dmsans" onClick={generatePublicToken}>Generate new public key</button>
                    <button className="text-[12px] bg-[#b50101] rounded-md px-3 py-2 text-white font-semibold font-dmsans" onClick={revokePublicToken}>Revoke</button>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col gap-3">
            <div className="font-bold text-[16px]">Token List Table</div>
            <div className="">
                <div className="flex items-center gap-4 whitespace-nowrap overflow-x-auto">
                    {TOkEN_LINKS.map((link, key)=> {
                        return <div className={classNames("cursor-pointer text-[13px] py-1 font-inter font-semibold relative w-fit transition-all "+
                                        "after:h-[2px] rounded-lg after:w-0 after:left-0 text-[#66676a] dark:text-[#dcdcdc] after:bg-[#26d28c] after:absolute after:bottom-0 after:transition-all", 
                                        {"!text-[#26d28c] after:!w-full font-semibold ": currentPath == link.path})} key={key} onClick={()=>setPath(link.path)}>
                            {link.title}
                        </div>
                    })}
                </div>
                <table className="w-full table-auto border-collapse">
                <thead className="border-t-[2px] w-full border-t-[#66676a2e] font-dmsans font-medium text-[12px] uppercase text-[#76777a] dark:text-[#e6e6e6]">
                    <tr className="">
                        {TABLE_FIELDS.map((field, key)=> <th className="py-2 text-start" key={key}>{field.heading}</th>)}
                    </tr>
                    </thead>
                    <tbody className="">
                        {(currentPath == "private" ? tokens?.private : tokens?.public)?.map((tokenDetails, key)=>{
                            return <tr key={key} className="text-start font-semibold font-dmsans text-[12.5px] border-t-[1px] border-t-[#66676a2e] cursor-pointer hover:bg-[#e5e5e538] dark:hover:bg-[#39393938] text-[#212121de] dark:text-[#c1c1c1]">
                                        {
                                            (TABLE_FIELDS).map((field, key) => {
                                                let fieldValue = tokenDetails[field.key] ?? "N/A" ;
                                                if(field.reduce) fieldValue = reduceToken(fieldValue)
                                                if(field.is_date) fieldValue = new Date(fieldValue).toDateString();
                                                if(field.key === "status") fieldValue = <div className={classNames('tr_status', { 'completed': fieldValue == 'active', 'cancelled': fieldValue == 'revoked' })}>{fieldValue}</div>

                                                return <td className={`py-[10px] ${field.text_format || "capitalize"}`} key={key}>
                                                    {fieldValue}
                                                </td>
                                            })
                                        }
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>



{/* 
        <div className="flex flex-col gap-3">
            <div className="flex items-center ]ustify-between">
                <div className="flex items-center gap-5">
                    <div className="">Private</div>
                    <div className="">{reduceToken(tokens?.private?.find((token)=>token.status == "active")?.token) || <span>No API token present</span>}</div>
                </div>
            </div>
            <div className="">
                <div className="flex items-center gap-5">
                    <div className="">Public</div>
                    <div className="">{reduceToken(tokens?.public?.find((token)=>token.status == "active")?.token) || <span>No API token present</span>}</div>
                    <button onClick={generatePublicToken}>Generate</button>
                </div>
            </div>
            <div className="">
                // revoked
            </div>
        </div> */}
    </div>;
}


const useTokens = () => {
    const { get, post: genPub, post: genPriv } = useAPI();
    const fetch = async () => {
        try {
            const response = await get('/settings/tokens/fetch', []);
            if(response['success'] === true) {
                return response["data"];
            }
            else {
                throw new Error("An error occured while fetching tokens");
            }
        }
        catch (error) {
            throw new Error("An error occured while fetching tokens");
        }
    }

    const generatePublic = async () => {
        try {
            const response = await genPub('/settings/tokens/generate-token/public', []);
            if(response['success'] === true) {
                return response.data.token;
            }
            else {
                throw new Error("An error occured while fetching tokens");
            }
        }
        catch (error) {
            throw new Error("An error occured while fetching tokens");
        }
    }

    const generatePrivate = async() => {
        try {
            const response = await genPriv('/settings/tokens/generate-token/private', []);
            if(response['success'] === true) {
                return response.data.token;
            }
            else {
                throw new Error("An error occured while fetching tokens");
            }
        }
        catch (error) {
            throw new Error("An error occured while fetching tokens");
        }
    }

    const revokePublic = async (id) => {

    }

    const revokePrivate = async (id) => {

    }

    return { fetch, generatePrivate, generatePublic, revokePrivate, revokePublic };
}


const reduceToken = (text) => {
    return text?.substring(0, 7) + "..." + text?.substring(text.length - 15) || null;
}