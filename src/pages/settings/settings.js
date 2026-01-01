import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";
import Toggle from "../../components/toggle";
import { Bell, Building, Code, CreditCard, Shield, User, Webhook } from "lucide-react";

const SETTINGS_LINKS = [
    {
        title: "Account",
        path: "",
        icon: <User size={16} />
    },
    {
        title: "Business",
        path: "business",
        icon: <Building size={16} />
    },
    {
        title: "API",
        path: "api",
        icon: <Code size={16} />
    },
    {
        title: "Webhooks",
        path: "webhook",
        icon: <Webhook size={16} />

    },
    {
        title: "Security",
        path: "security",
        icon: <Shield size={16} />
    },
    {
        title: "Payment",
        path: "payment",
        icon: "" //setting preferrened payment coins
    },
    {
        title: "Settlement",
        path: "settlement",
        icon: <CreditCard size={16} />
    },
    {
        title: "Notifications",
        path: "notifications",
        icon: <Bell size={16} />
    },
    
]

export function Settings() {
    const toggleChange = (e) => {
        //setTestMode(e.target.checked);
    }
    return <div className="flex flex-col gap-4">
        <div className="space-y-1 font-inter">
            <div className="text-xl font-bold">Settings</div>
            <div className="text-[#737373] text-[14px]">Manage your account, business, and security settings.</div>
        </div>
        <div className="w-full flex items-center justify-between">
            <div className="w-fit flex bg-[#f7f7f7] dark:bg-[#1a1a1a] px-2 py-1 rounded-lg items-center gap-4 text-[#323232] font-inter text-[13px]">
                {
                    SETTINGS_LINKS.map((link, key)=>{
                        return <NavLink end to={link.path} 
                        className={({isActive}) => classNames("dark:hover:bg-[black] hover:bg-[#c9c8c8] py-2 px-3 rounded-lg transition-all dark:text-[#c5c5c5] text-[#232323] flex items-center gap-2",
                                                {"dark:!bg-[#3a3a3a] !bg-[#fff] font-medium text-black dark:text-white": isActive}
                                            )} key={key}>{link.icon} <span>{link.title}</span></NavLink>;
                    })
                }
            </div>
            <div className="flex items-center gap-2 select-none">
                <Toggle id={"test_mode"} toggleChange={toggleChange} />
                <label htmlFor="test_mode" className="pb-1">
                    <span className="font-inter text-[12px] dark:text-[#eaeaea] font-medium w-fit">
                        Test Mode
                    </span>
                </label>
            </div>
        </div>
        <div className="py-4 px-2">
            <Outlet />
        </div>
        <div className="h-[60px]" />
    </div>
}