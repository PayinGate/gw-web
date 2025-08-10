/* eslint-disable no-unused-vars */
import { BiEnvelope, BiLock } from "react-icons/bi";
import { DarkModeToggle } from "../../../components/dark-toggle";
import useAPI from "../../../hooks/useApi"
import { BsEyeSlash } from "react-icons/bs";

export default function Login(){
    const { post } = useAPI();


    return (
        <div className="min-h-screen w-full h-full">
                <div className="absolute right-0"><DarkModeToggle showToggle={true} /></div>
                <div className="h-full w-full flex items-center justify-center">
                    <div className="font-dmsans flex flex-col gap-4 w-[20%]">
                        <div className="flex flex-col gap-1 text-[14px]">
                            <div className="">Email</div>
                            <div className="group relative flex items-center border-[1.5px] border-black dark:border-white rounded-[5px] p-[3px] focus-within:border-green-600 transition-all duration-200 ">
                                <span className="p-1"><BiEnvelope className="dark:text-white text-gray-700 group-focus-within:text-green-700 transition-all duration-200" size={15} /></span>
                                <input className="relative w-full bg-transparent text-[12.5px] font-Lato px-2 outline-none dark:text-white" placeholder="Enter your email" autoComplete="false" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-[14px]">
                            <div className="">Password</div>
                            <div className="group relative flex items-center border-[1.5px] border-black dark:border-white rounded-[5px] p-[3px] focus-within:border-green-600 transition-all duration-200">
                                <span className="p-1"><BiLock className="dark:text-white text-gray-700 group-focus-within:text-green-700 transition-all duration-200" size={15} /></span>
                                <input className="relative w-full bg-transparent text-[12.5px] font-Lato px-2 dark:text-white outline-none" placeholder="Enter your email" autoComplete="false" />
                                <span className="p-1 cursor-pointer"><BsEyeSlash className="dark:text-white text-gray-800  group-focus-within:text-green-700 transition-all duration-200" size={14}/></span>
                            </div>
                        </div>
                        <div/>
                        <div className="w-full ">
                            <button type="submit" >Sign In</button>
                        </div>

                    </div>
                </div>
        </div>
    );
}