"use client"

import { useFormStatus } from "react-dom";

interface ButtonProps {
    text: string;
}

export default function Button({text}: ButtonProps){
    const { pending } = useFormStatus();
    return(
        <button 
            disabled={pending}
            className={`
                h-11  w-[100%] block rounded-md
                ${pending ? 'bg-gray-300 text-gray-400 ' : 'bg-[--main] text-white '}
            `}
        >{pending? 'Loading...' : text}</button>
    )
}