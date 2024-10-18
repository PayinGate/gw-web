import classNames from "classnames"
import { BiLogoBitcoin } from "react-icons/bi"
import { BsPeople } from "react-icons/bs"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { NavLink } from "react-router-dom"

export default function SideBar(){
    const SIDEBAR_LINKS = [
        {
            title: "Home",
            path: "/home",
            icon: <MdOutlineSpaceDashboard />
        },
        {
            title: "Customers",
            path: "/customers",
            icon: <BsPeople />
        }
    ]
    return <div className="dark:bg-[#292b2d] bg-[#f5f5f5] h-full fixed z-40 md:w-[14rem] transition-all md:border-r-[1px] dark:border-[#3e3e3e] p-4 border-[#e6e6e6] flex flex-col gap-6">
        <div className="flex items-center gap-3 px-2">
            <BiLogoBitcoin className=" text-xl" />
            <div className="text-[14px] font-futura font-bold">Gateway</div>
        </div>
        <div className="flex flex-col ">
            <div className="flex flex-col gap-3">
                {SIDEBAR_LINKS.map((value, key)=>{
                    return <NavLink to={value.path} className={({isActive}) => classNames("w-full dark:hover:bg-[black] py-2 px-2 rounded-lg transition-all dark:text-[#c5c5c5] text-[#232323]",
                        {"dark:bg-[#3a3a3a] bg-[#c3c3c3] ": isActive}
                    )}
                    children={(isActive)=>{
                        return (
                            <div className="flex w-full items-center gap-2 ">
                                <span className="text-[18px]">{value.icon}</span>
                                <span className="text-[14px] font-dmsans font-bold">{value.title}</span>
                            </div>
                        );
                    }}
                    >

                    </NavLink>
                })}
            </div>
        </div>
    </div>
}