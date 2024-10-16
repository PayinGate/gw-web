import { Outlet } from "react-router-dom";
import { DarkModeToggle } from "../../components/dark-toggle";
import SideBar from "../../components/main/sidebar";
import TopBar from "../../components/main/topbar";

export default function AppMain(){
    
    return <div className="min-h-screen w-full h-full">
            <DarkModeToggle showToggle={false} />
            <TopBar />
            <div className="flex h-full">
                <SideBar />
                <div className="md:h-full top-[52px] flex-1 relative flex-grow min-w-0 overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
}