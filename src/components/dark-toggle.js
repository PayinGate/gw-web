import { useEffect, useState } from "react";
import { IoMoonSharp } from "react-icons/io5";
import { TbSunFilled } from "react-icons/tb";
import { CONSTANTS as cst } from "../constants/constants";


function darkModeHandler(){
    const darkIsStored = JSON.parse(localStorage.getItem("darkMode"));

    if(darkIsStored == null){
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        darkModeMediaQuery
        .addEventListener("change", function (e) {
          if (e.matches) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        });
        if(darkModeMediaQuery.matches) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
      }
      else {
        if(darkIsStored){
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
      }
}

export function DarkModeToggle({showToggle = true}) {

    const [ darkMode, setDarkMode ] = useState(() => JSON.parse(localStorage.getItem("darkMode")) ?? (window.matchMedia('(prefers-color-scheme: dark)').matches || false));

    const toggleMode = () => {
        setDarkMode(()=>{
            const isDarkMode = JSON.parse(localStorage.getItem("darkMode")) ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
            localStorage.setItem("darkMode", !isDarkMode);
            return !isDarkMode;  
        })
    }


    useEffect(() => {
        darkModeHandler();
        const handleStorageChange = () => {
          setDarkMode(JSON.parse(localStorage.getItem('darkMode')) || false);
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };

      }, [darkMode]);
      


    return (
      showToggle && <div className='mode-toggle p-1'>
             <button onClick={toggleMode}>
                {
                    darkMode ? <TbSunFilled fontSize={15} title={cst.lightMode} />
                            :  <IoMoonSharp fontSize={15} title={cst.darkMode} />
                }
            </button> 
        </div> 
    );
}


export function DarkModeButtonOnly(){
  const [ darkMode, setDarkMode ] = useState(() => JSON.parse(localStorage.getItem("darkMode")) ?? (window.matchMedia('(prefers-color-scheme: dark)').matches || false));

    const toggleMode = () => {
        setDarkMode(()=>{
            const isDarkMode = JSON.parse(localStorage.getItem("darkMode")) ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
            localStorage.setItem("darkMode", !isDarkMode);
            return !isDarkMode;  
        })
    }

    useEffect(() => {
      darkModeHandler();
    }, [darkMode]);

    useEffect(()=>{
      window.addEventListener('keyup', keyListener);

      return ()=>window.removeEventListener('keyup', keyListener)
    });

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    const keyListener = (e) => {
      if(e.code === 'KeyD' && !e.target.value) {
        toggleMode();
      }
    }

  return (
     <button onClick={toggleMode}>
              {
                  darkMode ? <TbSunFilled fontSize={15} title={cst.lightMode} />
                          :  <IoMoonSharp fontSize={15} title={cst.darkMode} />
              }
      </button> 
      
  );
}