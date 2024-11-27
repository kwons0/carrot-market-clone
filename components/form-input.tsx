import React, { ReactNode } from "react";
import clsx from "clsx";

interface IFormInputProps {
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
    errors?: string[];
    icon: ReactNode;
}

export default function FormInput(
    {name, type, placeholder, required, errors = [], icon} :IFormInputProps
){
    return(
        <div>
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#595959"
                    className="size-5 mr-3 absolute left-6 top-[50%] translate-y-[-50%]"
                >
                    {icon}
                </svg>
                <input
                    name={name}
                    className={clsx(
                        "w-full rounded-full px-14 py-3 ring-2 box-border bg-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-4 border-gray-200 ",
                        errors.length > 0 ? "ring-red-500 focus:ring-red-500" : "ring-gray-200"
                    )}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                />
            </div>
            {
                errors.map( (error, idx) => (
                    <span key={idx} className="text-red-500 text-sm block first-of-type:mt-3">{error}</span>
                ))
            }
        </div>   
    )
}

