import { useEffect, useState } from "react";

export default function FontsDisplay(){
    const [ ff, setFF ] = useState([]);

      useEffect(()=>{

        if(window.location.host.includes('vercel')){
          window.location = "https://github.com/PayinGate/gateway";
          return;
        }

        const fontFamily = {
            Bebas: 'Bebas Neue',
            Manrope: 'Manrope',
            dmsans: 'DM Sans',
            inter: 'inter',
            Archivo: 'Archivo',
            Rubik: 'Rubik',
            CircularStd: 'CircularStd',
            Poppins: 'Poppins',
            Lato: 'Lato',
            satoshi: 'satoshi',
            ClashDisplay: 'ClashDisplay',
            outfit: 'Outfit',
            futura: 'Futura',
            Neurial: 'NeurialGrotesk'
          };
          
        setFF(Object.keys(fontFamily));
      }, [])
    const data = "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz";
    return <div className="flex flex-col space-y-5">
    { ff.map((v,k)=> <div className={`font-${v} whitespace-break-spaces p-3 leading-[2]`} key={k}>{data} ({v})</div>)}
    </div>
}