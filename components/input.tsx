import React, { ReactNode } from "react";
import clsx from "clsx";

interface IInputProps {
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
    errors?: string[];
    icon: ReactNode;
}

export default function Input(
    {name, type, placeholder, required, errors = [], icon} :IInputProps
){
    return(
        <div>
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#604328"
                    className="size-5 mr-3 absolute left-4 top-[50%] translate-y-[-50%]"
                >
                    {icon}
                </svg>
                <input
                    name={name}
                    className={clsx(
                        `w-full rounded-md px-12 h-11 ring-[1.5px] box-border bg-[#EFEFDC] ring-[--brown4]
                        placeholder:text-[--brown3]
                        focus:outline-none focus:ring-[--main]`,
                        errors.length > 0 ? "ring-[#BB6901] focus:ring-[#BB6901]" : "ring-[--brown4]"
                    )}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                />
            </div>
            {
                errors.map( (error, idx) => (
                    <span key={idx} className="text-[#BB6901] text-xs block first-of-type:mt-3">{error}</span>
                ))
            }
        </div>   
    )
}

