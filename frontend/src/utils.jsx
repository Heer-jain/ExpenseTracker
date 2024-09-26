import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: "top-right",
        className: "w-20 h-20 text-red-500 fixed right-2 top-2 "
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: "top-right",
        className: "w-20 h-20 text-red-500 fixed right-2 top-2 "
    })
}