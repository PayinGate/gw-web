import { BiLogoBitcoin } from "react-icons/bi";
import { HiOutlineUser, HiSearch } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Toggle from "../toggle";
import { DarkModeButtonOnly } from "../dark-toggle";

export default function TopBar(){
    //const { isTestMode, setTestMode } = useState(true);

    const toggleChange = (e) => {
        //setTestMode(e.target.checked);
    }

    return <div className="flex w-full items-center py-[10px] px-6 dark:bg-[#1a1a1a] border-b dark:border-[#3e3e3e] justify-between bg-[#f5f5f5] border-[#cacaca] fixed z-50">
        <div className="flex items-center gap-2">
            <BiLogoBitcoin className=" text-xl" />
            <div className="text-[14px] font-futura font-bold">Gateway</div>
        </div>
        <div className="w-[28rem] border py-1 px-2 rounded-2xl border-[#c4c4c4] dark:border-[#3e3e3e] flex gap-2 items-center">
            <span><HiSearch /></span>
            <input className="w-full bg-transparent font-dmsans placeholder:font-semibold outline-none text-[14px]" placeholder="Search"/>
        </div>

        <div className="flex items-center gap-5 select-none">
            <div className="flex items-center">
                <DarkModeButtonOnly />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="test_mode">
                    <span className="font-inter text-[14px] dark:text-[#eaeaea] font-semibold">
                        Test Mode
                    </span>
                </label>
                <Toggle id={"test_mode"} toggleChange={toggleChange} />
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