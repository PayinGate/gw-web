/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import useAPI from "../../hooks/useApi";
import { Table } from "../../components/table";
import { PlusCircle } from "lucide-react";

const CREATE_WEBHOOK_FIELDS = [
    {
        title: "URL",
        type: "text",
        name: "url"
    },
    {
        title: "Name",
        type: "text",
        name: "name" 
    }
]

const TABLE_FIELDS = [
    {
        heading: "URL",
        key: "url",
        reduce: false,
        text_format: "lowercase"
    },
    {
        heading: "Status",
        key: "status",
        text_format: "lowercase"
    },
    {
        heading: "Events",
        key: "events",
        text_format: "lowercase",
        list: true
    },
    {
        heading: "Sectret Key",
        key:"secret",
        reduce: true,
        text_format: "lowercase",
        copy: true
    }
];

export default function WebHookSettings() {

    const { fetchWebhooks, createWebhook, updateWebhook, deleteWebhook } = useWebhooks();
    const [ webhooks, setWebhooks ] = useState([]);

    const fetch = useCallback(()=>{
        fetchWebhooks()
        .then((webhooks)=> setWebhooks(webhooks))
        .catch((error)=> console.log(error) /** handle error */ )
    }, [fetchWebhooks]);

    useEffect(()=>{
        fetch();
    }, []);

    const doAndRefresh = (fn, ...args) => {
        fn(...args)
        .then(fetch)
        .catch((error)=>console.log(error));
    };

    const fnCreateWebhook = (url, events) => doAndRefresh(createWebhook, url, events);
    const fnUpdateWebhook = (id, url, events, status) => doAndRefresh(updateWebhook, id, url, events, status);
    const fnDeleteWebhook = (id) => doAndRefresh(deleteWebhook, id);



    return <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="font-Archivo text-[22px] font-bold">Webhook</div>
                    <div className="font-semibold font-dmsans text-[10px]  bg-[#27AE601A] text-[#27ae60] rounded-md py-[2px] px-[8px]">Test</div>
                </div>
                <div className="font-medium text-[13px] text-[#474747] dark:text-[#cecece] font-inter">
                    Configure webhook endpoints for event notifications.
                </div>
            </div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-[#25b19c] text-[#f7fdfc] hover:bg-[#25b19c]/90 h-10 px-4 py-2">
                <PlusCircle size={14} />
                <span>Create New Key</span>
            </button>
        </div>
        <div className="flex flex-col gap-5 w-full">
            {/* <div className="w-full">
                <div className="flex flex-col gap-2 font-inter">
                    <div className="font-bold text-[16px]">Add Webhook Endpoint</div>
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-3 w-full">
                            {CREATE_WEBHOOK_FIELDS.map((field, key)=> {
                                return (
                                <div className="flex flex-col gap-1 w-full  overflow-hidden" key={key}>
                                    <div className="font-medium font-dmsans text-[14px]">{field.title}</div>
                                    <div className="rounded-lg text-[12px] border-[1px] bg-[#fff] dark:bg-[#313131] p-2 flex items-center gap-4 justify-between">
                                        <input className="dark:text-white bg-transparent outline-none text-[#525252] overflow-hidden  whitespace-nowrap w-full" placeholder={field.title} />
                                    </div>
                                </div>
                                );
                            }) 
                            }
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="w-full">
                <Table fields={TABLE_FIELDS} data={webhooks} />
                {/* {JSON.stringify(webhooks)} */}
            </div>
        </div>
        
        {/* <div className="flex flex-col gap-3">
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
        </div> */}
    </div>;
}


const useWebhooks = () => {
    const { post, get, patch, del } = useAPI();
    const fetchWebhooks = useCallback(async ()=>{
        try {
            const response = await get('/settings/webhook/fetch', []);
            if(response['success'] === true) {
                return response["data"];
            }
            else {
                throw new Error("An error occured while fetching webhooks");
            }
        }
        catch (error) {
            throw new Error("An error occured while fetching webhooks");
        }
    }, [get]) 

    const createWebhook = useCallback(async (url, events)=> {
        try {
            const data = {
                url,
                events
            }
            const response = await post('/settings/webhook/create', data);
            if(response['success'] === true) {
                return response.data;
            }
            else {
                throw new Error("An error occured while creating webhook");
            }
        }
        catch (error) {
            throw new Error("An error occured while creating webhook");
        }
    }, [post])

    const updateWebhook = useCallback(async (id, url = null, events = null, status = null)=> {
        if(!url && !events && !status) throw new Error("Invalid update request");
        try {
            const data = {
                url: url,
                events: events,
                status: status
            }
            const response = await patch(`/settings/webhook/update/${id}`, data);
            if(response['success'] === true) {
                return response.data;
            }
            else {
                throw new Error("An error occured while creating webhook");
            }
        }
        catch (error) {
            throw new Error("An error occured while creating webhook");
        }
    }, [patch]);


    const deleteWebhook = useCallback(async (id)=>{
        try {
            const response = await del(`/settings/webhook/delete/${id}`, []);
            if(response['success'] === true) {
                return response.data;
            }
            else {
                throw new Error("An error occured while creating webhook");
            }
        }
        catch (error) {
            throw new Error("An error occured while creating webhook");
        }  
    }, [del]);
    
    return { fetchWebhooks, createWebhook, updateWebhook, deleteWebhook };
}