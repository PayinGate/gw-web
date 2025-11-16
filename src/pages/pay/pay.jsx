/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import useAPI from "../../hooks/useApi";
import { useEffect } from "react";
import { DarkModeToggle } from "../../components/dark-toggle";

export default function Pay(props) {


    // const { loading, error, get } = useAPI('http://127.0.0.1:3000');

    // useEffect(() => {
    //   // Make a GET request when the component mounts
    //   const fetchData = async () => {
    //     try {
    //       const responseData = await get('/p/transaction/fetch', { reference: "gwp_82hpjNSi17dS1iH1YajKC" });
    //       console.log('GET response:', responseData);
    //     } catch (error) {
    //       console.error('Error:', error.message);
    //     }
    //   };
  
    //   fetchData();
  
    //   // Cleanup function
    //   return () => {
    //     // Cleanup code if needed
    //   };
    // }, [get]);




    return (
        <div className="h-full w-full items-center flex flex-col py-16 md:px-20 xl:px-48">
            <Outlet />
        </div>
    );
}