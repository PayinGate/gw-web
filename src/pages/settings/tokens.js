/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import useAPI from "../../hooks/useApi";
import classNames from "classnames";
import { Table } from "../../components/table";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/dialog";
import { Button } from "../../components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/select";
import { isEmpty } from "../../utils/functions";



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
        heading: "Name",
        key: "name"
    },
    {
        heading: "Key",
        key: "token",
        reduce: true,
        text_format: "lowercase",
        copy: true
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
    const [tokens, setTokens] = useState(null);
    const [ tokenType, setType ] = useState("");
    const [ tokenName, setTokenName ] = useState("");
    
    const[ selectError, setSelectError ] = useState(false);
    const [ nameError, setNameError ] = useState(false);
    const [ disableGenButton, setDisableButton] = useState(false);

    const [ open, setOpen ] = useState(false);

    const fetchTokens = () => {
        fetch()
        .then((tokens)=>{
            setTokens(tokens);
        })
        .catch((error)=>{
            
        });
    }

    useEffect(()=>{
        fetchTokens();        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const doAndRefresh = (fn, ...args) => {
        fn(...args).then(fetchTokens)
            .catch((error)=>{
                console.log(error);
            })
            .finally(()=>{
                setTokenName("");
                setType("");
                setDisableButton(false);
                setOpen(false);
            });            
    };

    const generatePublicToken = (tokenName) => doAndRefresh(generatePublic, tokenName);
    const generatePrivateToken = (tokenName) => doAndRefresh(generatePrivate, tokenName);
    const revokePublicToken = () => doAndRefresh(revokePublic);
    const revokePrivateToken = () => doAndRefresh(revokePrivate);

    const generateToken = ()=>{
        setNameError(false);
        setSelectError(false);
        if(isEmpty(tokenName) || (tokenType != "private" && tokenType != "public")) {
            if(isEmpty(tokenName)) setNameError(true);
            if(isEmpty(tokenType)) setSelectError(true);

            return;
        }  
        setDisableButton(true);

        if(tokenType == "private") {
            generatePrivateToken(tokenName);
        }
        else {
            generatePublicToken(tokenName);
        }
    };


    return <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="font-Archivo text-[22px] font-bold">API Keys</div>
                    <div className="font-semibold font-dmsans text-[10px]  bg-[#27AE601A] text-[#27ae60] rounded-md py-[2px] px-[8px]">Test</div>
                </div>
                <div className="font-medium text-[13px] text-[#474747] dark:text-[#cecece] font-inter">
                    API tokens allow your application to securely access the Payment API. Keep them secret.
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    Give your new key a name. This will help you identify it
                    later.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="key-name" className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Key Name
                    </label>
                    <input
                      id="key"
                      placeholder="Key name"
                      className={classNames("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm col-span-3",
                        {"border-red-800": nameError}
                      )}
                      onChange={e=>setTokenName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 w-full">
                    <label htmlFor="type" className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Type</label>
                    <div className="col-span-3">
                    <Select onValueChange={val=>setType(val)}>
                      <SelectTrigger error={selectError}>
                        <SelectValue  className="" placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                      </SelectContent>
                    </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <button onClick={generateToken} type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" >Generate Key</button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-[#25b19c] text-[#f7fdfc] hover:bg-[#25b19c]/90 h-10 px-4 py-2"><PlusCircle size={14} /><span>Create New Key</span></button> */}
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
                    <button className="text-[12px] bg-[#25b19c] rounded-md px-3 py-2 text-[#f7fdfc] font-semibold font-dmsans peer-disabled:cursor-not-allowed peer-disabled:opacity-70" disabled={disableGenButton} onClick={generatePrivateToken}>Generate new private key</button>
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
                    <button className="text-[12px] bg-[#25b19c] text-[#f7fdfc] rounded-md px-3 py-2 font-semibold font-dmsans" onClick={generatePublicToken}>Generate new public key</button>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col gap-3">
            {/* <div className="font-bold text-[16px]">Token List Table</div> */}
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
                {tokens && (currentPath == "private" ? <Table fields={TABLE_FIELDS} data={tokens.private } /> : <Table fields={TABLE_FIELDS} data={tokens.public} /> )}
                {/* <table className="w-full table-auto border-collapse">
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
                                                if(field.reduce) fieldValue = reduceString(fieldValue)
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
                </table> */}
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
        </div>
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

    const generatePublic = async (tokenName) => {
        try {
            const response = await genPub('/settings/tokens/generate-token/public', {name: tokenName}, true, false);
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

    const generatePrivate = async(tokenName) => {
        console.log(tokenName);
        try {
            const response = await genPriv('/settings/tokens/generate-token/private', {name: tokenName}, true, false);
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


export const reduceString = (text) => {
    return text?.substring(0, 7) + "..." + text?.substring(text.length - 15) || null;
}

//         <div data-state="open" class="fixed inset-0 z-[1000] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-auto" data-aria-hidden="true" aria-hidden="true"></div>