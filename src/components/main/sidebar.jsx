import classNames from "classnames"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { NavLink } from "react-router-dom"

export default function SideBar(){
    const SIDEBAR_LINKS = [
        {
            title: "Home",
            path: "/home",
            icon: <MdOutlineSpaceDashboard />
        }
    ]
    return <div className="dark:bg-[#292b2d] bg-[#f5f5f5] relative top-[52px] bottom-0 z-40 flex flex-col md:w-[14rem] transition-all md:border-r dark:border-[#3e3e3e] p-4 border-[#cacaca]"
                style={{height: "calc(100% - 52px)"}}>
        <div className="flex flex-col gap-3">
            {SIDEBAR_LINKS.map((value, key)=>{
                return <NavLink to={value.path} className={({isActive}) => classNames("w-full dark:hover:bg-[black] py-2 px-2 rounded-lg transition-all",
                    {"dark:bg-[#3a3a3a] bg-[#c3c3c3]": isActive}
                )}
                children={(isActive)=>{
                    return (
                        <div className="flex w-full items-center gap-2 ">
                            <span className="text-[24px] dark:text-[#c5c5c5] text-[#232323]">{value.icon}</span>
                            <span className="text-[15px] font-dmsans font-bold dark:text-[#c5c5c5] text-[#232323]">{value.title}</span>
                        </div>
                    );
                }}
                >
                    
                </NavLink>
            })}
        </div>
    </div>
}