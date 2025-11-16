import { Link } from "react-router-dom";
import { DarkModeToggle } from "../../components/dark-toggle";
import { HiExternalLink } from "react-icons/hi";

export function TransactionUIWrapper(props) {
    return <div className="w-full h-full flex flex-col space-y-3">
        <div className="flex justify-between items-center px-1 select-none">
            <div className="ml-auto flex items-center gap-4">
                {
                window.self !== window.top &&
                    <Link to={""} target="_blank" className="flex items-center font-inter font-medium text-[13px] gap-1">
                        <span>Complete on Gateway</span> <HiExternalLink />
                    </Link> 
                }
                <DarkModeToggle />
            </div>
        </div>
        <div className=" w-full h-full bg-white rounded-xl transition ease-in delay-50 dark:bg-[#181a1b] relative flex flex-col px-2 py-4 overflow-hidden">
            {props.children}
        </div>
    </div>;
}
