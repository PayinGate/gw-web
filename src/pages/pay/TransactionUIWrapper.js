import { DarkModeToggle } from "../../components/dark-toggle";

export function TransactionUIWrapper(props) {
    return <div className="w-full h-full flex flex-col space-y-3">
        <div className="flex justify-between items-center px-1 select-none">
            <div className="ml-auto">
                <DarkModeToggle />
            </div>
        </div>
        <div className=" w-full h-full bg-white rounded-xl transition ease-in delay-50 dark:bg-[#181a1b] relative flex flex-col px-2 py-4 overflow-hidden">
            {props.children}
        </div>
    </div>;
}
