import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

type Props = {
    message?: string | null
}

const FormError = ({message} : Props) => {
    if(!message) return null
    return (
        <div className="bg-destructive/20 flex items-center gap-x-2 p-3 text-sm text-destructive rounded-md">
            <ExclamationTriangleIcon className="w-4 h-4 font-bold" />
            <p>{message}</p>
        </div>
    )
}

export default FormError