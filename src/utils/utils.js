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