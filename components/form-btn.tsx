"use client"

import { useFormStatus } from "react-dom";

interface IFormBtnProps {
    text: string;
}

export default function FormBtn({text}: IFormBtnProps){
    const { pending } = useFormStatus();
    return(
        <button
            disabled={pending}
            className={`
                w-full h-14  rounded-full transition
                ${pending ? 'bg-gray-300 text-gray-400 ' : 'bg-gray-100 text-gray-600 '}
                hover:bg-gray-200
            `}>
            {pending? 'Loading...' : text}
        </button>
    )
}