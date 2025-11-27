import { useEffect, useRef, useState } from "react";
import reactTriggerChange from "../utils/reactTriggerChange";
import { IoChevronDown } from "react-icons/io5";
import classNames from "classnames";

export function CustomSelect({
    border, borderColor, background, pOptions, callbackTrigger,
    uppercase = false
}){

    const [ showCustomSelectOptions, toggleSelectOptions ] = useState(false);
    const [ options, setOptions ] = useState([]);
    const [ selectedIndex, setSelectedIndex ] = useState(0);

    useEffect(()=>{
        setSelectedIndex(0);
        if(pOptions){
            setOptions(pOptions);
        }
        else {
            setOptions([{ key: "empty", name: "Select" }])
        }
    }, [pOptions]);

    const customSelect = (value, index) =>{
        var selectTag = document.getElementById("custom-select");
        selectTag.value = value;
        reactTriggerChange(selectTag)
        setSelectedIndex(index);
        toggleSelectOptions(false);
        callbackTrigger(index);
        
    }
    
    const selectorRef = useRef();
    const optionsRef = useRef();

    window.addEventListener('click', (event)=>{
        if(optionsRef.current && selectorRef.current){
            if (optionsRef && !optionsRef.current.contains(event.target) && !selectorRef.current.contains(event.target)) {
                toggleSelectOptions(false);
            }
        }
    })

    return <div className="w-full relative select-none">

            {options[selectedIndex] ? 

            <div 
                className={
                    classNames({"group flex items-center w-full custom-select py-[10px] px-3 rounded-lg border-[1px] border-[#CDCFD0] dark:!bg-black": true,
                                "options-showing": showCustomSelectOptions,           
                })}
                style={{...(border ? { borderWidth: border, borderColor: borderColor } : {}),
                ...(background ? { backgroundColor: background } : {})}}

                onClick={()=>  { toggleSelectOptions(!showCustomSelectOptions); } }
                ref={selectorRef}
                >
                    { options[selectedIndex].key === "0" ? <></> : 
                     options[selectedIndex].image && <div 
                        className="rounded-full bg-cover mr-3 h-[30px]">
                                <div 
                                    className="h-[26px] w-[26px] rounded-full border-none border-[#bebebe43]" 
                                    style={{ backgroundImage: options[selectedIndex].image, backgroundRepeat: "no-repeat", backgroundSize: "contain" }} >
                                </div> 
                    </div> 
                    }

                    <div 
                        className={classNames("text-[#212121] text-[13px] font-inter dark:text-[#25b09b] font-medium",
                            {
                                "capitalize": !uppercase,
                                "uppercase": uppercase
                            }
                        )}>
                            {options[selectedIndex] ? options[selectedIndex].name : ""}
                    </div>
                <div 
                    className="ml-auto">
                        <IoChevronDown className=" w-[20px] min-w-[20px] group-[.options-showing]:rotate-180 transition-all text-[#25b09b]" aria-label="icon" />
                </div>
            </div> : <></> }

        {showCustomSelectOptions ? 
        <div className="select-none z-10 absolute top-12 rounded-lg w-full bg-white dark:bg-[#2e2e2e] shadow-lg max-h-52 overflow-auto" ref={optionsRef} style={{ boxShadow: "0px 4px 50px 5px #0000001c" }}>
            <ul>
            {options.map((v,k)=>{
                return <li key={k} onClick={()=>customSelect(v.key, k)} style={k === options.length - 1 ? {} : { borderBottom: "0.75px solid #bebebe7d" }} className="p-2 text-[13px] border-b-[#bebebe] dark:!border-b-[#3d3d3d] cursor-pointer flex items-center w-full">
                    <div className="mr-3">
                        {v.key !== "0" ? 
                        v.image && <div className="h-[26px] w-[26px] rounded-full border-[0.5px] border-[#bebebe]" style={{ backgroundImage: ``, backgroundRepeat: "no-repeat", backgroundSize: "contain" }} ></div>
                        : <></> }
                    </div>
                    <div className={classNames(
                            {
                                "capitalize": !uppercase,
                                "uppercase": uppercase
                            }
                    )}>{v.name}</div>
                </li>
            })}
            </ul>
        </div> : <></>}

        <select className="hidden" id="custom-select" name="">
            {options.map((v, k)=>{
                return <option key={k} value={v.key}>{v.name}</option>
            })}
        </select>
    </div>
}