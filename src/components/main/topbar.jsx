import { HiOutlineUser } from "react-icons/hi";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { DarkModeButtonOnly } from "../dark-toggle";

export default function TopBar(){
    //const { isTestMode, setTestMode } = useState(true);



    return <div className="ml-[14rem] flex items-center py-[10px] px-6 dark:bg-[#1a1a1a] border-b-[1px] dark:border-[#3e3e3e] bg-[white] border-[#e6e6e68a] fixed z-50"
                style={{ width: "calc(100% - 14rem)" }}>
        <div className="w-[20rem] py-1 rounded-2xl  flex gap-2 items-center">
            <span><IoSearch className="text-[18px] text-[#4f4f4f]" /></span>
            <input className="w-full bg-transparent font-dmsans placeholder:font-normal outline-none text-[14px]" placeholder="Search transactions, customers..."/>
        </div>

        <div className="flex items-center gap-5 select-none ml-auto">
            <div className="flex items-center">
                <DarkModeButtonOnly />
            </div>
            
            <div>
                <Link to={"/settings"}><IoSettingsOutline /></Link>
            </div>
            <div className="">
                <Link to={"/profile"}><HiOutlineUser /></Link>
            </div>
        </div>
   </div>
}