import { toast } from "react-toastify";

export function showErrorToast(message){
    return toast(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        closeButton: true,
        type: "error",
    });
}


export function trimDecimalZeros(str) {
    str = String(str)
    if (!str.includes('.')) return str; 
    str = str.replace(/\.?0+$/, '');
    return str;
}
