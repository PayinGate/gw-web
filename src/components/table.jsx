import classNames from "classnames";
import { reduceString } from "../pages/settings/tokens";
import { Copy } from "lucide-react";

function Table({
    fields,
    data,
    fn
}){
    return (
        <table className="w-full table-auto border-none">
            <thead className="w-full border-t-[#66676a2e] font-dmsans font-medium text-[12px] uppercase text-[#76777a] dark:text-[#e6e6e6]">
                <tr className="">
                    {fields.map((field, key)=> <th className="py-2 text-start" key={key}>{field.heading}</th>)}
                </tr>
                </thead>
                <tbody className="">
                    {data.map((details, key)=>{
                        return <tr key={key} className="text-start font-semibold font-dmsans text-[12.5px] border-t-[1px] border-t-[#66676a2e] cursor-pointer hover:bg-[#f3f0f038] dark:hover:bg-[#39393938] text-[#212121de] dark:text-[#c1c1c1]">
                                    {
                                        (fields).map((field, key) => {
                                            if(field.function){ // use only for 
                                                return <td className={`py-[10px] ${field.text_format}`} key={key} onClick={()=>fn(...field.fnArgKeys.map((key)=>details[key]))}>
                                                   {field.value}
                                                </td>
                                            }
                                            else {
                                                let fieldValue = details[field.key] ?? "N/A" ;
                                                if(field.reduce) fieldValue = reduceString(fieldValue)
                                                if(field.is_date) fieldValue = new Date(fieldValue).toDateString();
                                                if(field.list) fieldValue = <div className="w-fit grid grid-cols-3 gap-1">{fieldValue.map((f, k)=><span key={k} className="border-[1px] px-2 rounded-lg w-fit">{f}</span>)}</div>;
                                                if(field.key === "status") fieldValue = <div className={classNames('tr_status', { 'completed': fieldValue === 'active', 'cancelled': fieldValue === 'revoked' })}>{fieldValue}</div>
                                                if(field.copy) fieldValue = <div className="flex items-center gap-2"><span>{fieldValue}</span><Copy size={16} /></div> 
                                                return <td className={`py-[10px] ${field.text_format || "capitalize"}`} key={key}>
                                                    {fieldValue}
                                                </td>
                                            }
                                        })
                                    }
                        </tr>
                    })}
            </tbody>
        </table>
    );   
}


export { Table };