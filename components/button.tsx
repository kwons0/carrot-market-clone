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
                ${pending ? 'bg-[#B9E6CB] text-[#46AA6B] ' : 'bg-[--main] text-white '}
            `}
        >{pending? '로딩 중...' : text}</button>
    )
}