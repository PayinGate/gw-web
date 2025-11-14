import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";
import Toggle from "../../components/toggle";

const SETTINGS_LINKS = [
    {
        title: "Account",
        path: ""
    },
    {
        title: "API & Credentials",
        path: "api"
    },
    {
        title: "Webhook",
        path: "webhook"
    },
    {
        title: "Payment",
        path: "payment"
    },
    {
        title: "Payout",
        path: "payout"
    },
    {
        title: "Notifications",
        path: "notifications"
    },
    {
        title: "Preferences",
        path: "preferences"
    }
]

export function Settings() {
    const toggleChange = (e) => {
        //setTestMode(e.target.checked);
    }
    return <div>
        <div className="w-full flex items-center justify-between">
            <div className="w-fit flex bg-[#f7f7f7] dark:bg-[#1a1a1a] px-2 py-1 rounded-lg items-center gap-4 text-[#323232] font-inter text-[13px]">
                {
                    SETTINGS_LINKS.map((link, key)=>{
                        return <NavLink end to={link.path} 
                        className={({isActive}) => classNames("dark:hover:bg-[black] hover:bg-[#c9c8c8] py-1 px-3 rounded-lg transition-all dark:text-[#c5c5c5] text-[#232323]",
                                                {"dark:!bg-[#3a3a3a] !bg-[#fff] font-medium text-black dark:text-white": isActive}
                                            )} key={key}>{link.title}</NavLink>;
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