/* eslint-disable no-unused-vars */
import { BiEnvelope, BiErrorCircle, BiLock } from "react-icons/bi";
import { DarkModeToggle } from "../../../components/dark-toggle";
import useAPI from "../../../hooks/useApi"
import { BsEyeSlash } from "react-icons/bs";
import { isEmptyString, isValidEmail } from "../../../utils/functions";
import { CookieData, createCookieDate, GWCookies } from "../../../utils/storage/cookies";
import { useState } from "react";
import classNames from "classnames";

export default function Login(){
    const { post } = useAPI();
    const [ loginError, setLoginError ] = useState("");

    const handleLogin = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData.entries());
        
        if (isValidEmail(email) && !isEmptyString(password)) {

            const gwCookies = new GWCookies(document);
            formData.set("email", email.toLowerCase()); // convert email to lowercase
            const deviceId = await gwCookies.getCookie('device_id');
            if(!deviceId) setLoginError("Please reload and try again");
            formData.set("device_id", deviceId);

            try {
                const responseData = await post('/login', formData, false);
                if(responseData["success"]){

                    const data = responseData;

                    const authCookie = new CookieData('authToken', data["token"], createCookieDate(365*24*60*60));

                    gwCookies.saveCookies( [authCookie] );

                    window.location = window.location.origin; // reload the page

                } else {
                    setLoginError(responseData["error"]);
                }
            } catch (error) {
                setLoginError("An error occured while trying to log in.");
                console.error(error);
            }
        }
        else {
            setLoginError("Invalid email or password")
        }

    }


    return (
        <div className="min-h-screen w-full h-full">
                <div className="absolute right-0"><DarkModeToggle showToggle={true} /></div>
                <div className="h-full w-full flex items-center justify-center">
                    <form className="font-futura flex flex-col gap-4 sm:w-[40%] md:w-[30%] lg:w-[20%]" onSubmit={handleLogin}>
                        <div className="font-inter">
                            <div className={classNames("w-full px-3 py-2.5 bg-[#af1414] mb-0 rounded-lg flex text-white gap-3", {
                                'hidden': isEmptyString(loginError)
                            })}>
                                <div className="text-[20px]">
                                    <BiErrorCircle />
                                </div>
                                <div className="space-y-0 text-[12px] font-dmsans font-medium text-start first-letter:capitalize">
                                    {loginError}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-[14px]">
                            <div className="">Email</div>
                            <div className="group relative flex items-center border-[1.5px] border-black dark:border-white rounded-[5px] p-[3px] focus-within:border-[#25b09b] transition-all duration-200 ">
                                <span className="p-1"><BiEnvelope className="dark:text-white text-gray-700 group-focus-within:text-[#25b09b] transition-all duration-200" size={15} /></span>
                                <input type="email" className="relative w-full bg-transparent text-[12.5px] font-Lato px-2 outline-none dark:text-white" placeholder="Enter your email" autoComplete="false" name="email" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-[14px]">
                            <div className="">Password</div>
                            <div className="group relative flex items-center border-[1.5px] border-black dark:border-white rounded-[5px] p-[3px] focus-within:border-[#25b09b] transition-all duration-200">
                                <span className="p-1"><BiLock className="dark:text-white text-gray-700 group-focus-within:text-[#25b09b] transition-all duration-200" size={15} /></span>
                                <input type="password" className="relative w-full bg-transparent text-[12.5px] font-Lato px-2 dark:text-white outline-none" placeholder="Enter your email" autoComplete="false"  name="password" />
                                <span className="p-1 cursor-pointer"><BsEyeSlash className="dark:text-white text-gray-800" size={14}/></span>
                            </div>
                        </div>
                        <div className="text-[13px] font-futura ml-auto text-[#105147] dark:text-[#25b09b] font-semibold">Forgot password?</div>
                        <div className="w-full text-[14px] font-futura font-semibold">
                            <button type="submit" className="w-full p-2 text-white bg-[#25b09b] rounded-[5px]" >Sign In</button>
                        </div>
                    </form>
                </div>
        </div>
    );
}