/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import useAPI from "../../hooks/useApi";

export default function Tokens(){

    const { fetch, generatePrivate, generatePublic } = useTokens();
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

    return <div className="p-2 flex flex-col gap-3">
        <div className="flex items-center gap-2">
            <div className="font-Archivo text-[22px] font-bold">Tokens</div>
            <div className="font-semibold font-dmsans text-[13px]  bg-[#27AE601A] text-[#27ae60] rounded-md py-[2px] px-[8px]">Test</div>
        </div>
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

    }

    const revokePublic = async (id) => {

    }

    const revokePrivate = async (id) => {

    }

    return { fetch, generatePrivate, generatePublic, revokePrivate, revokePublic };
}


const reduceToken = (text) => {
    return text?.substring(0, 15) + "..." + text?.substring(text.length - 15) || null;
}