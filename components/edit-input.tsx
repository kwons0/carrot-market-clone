"use client"

import clsx from "clsx";

interface IEditInputProps {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    errors?: string[];
}

export default function EditInput(
    {name, type, required, defaultValue, errors=[]} : IEditInputProps
){

    return(
        <>
            <input
                name={name}
                type={type}
                required={required}
                defaultValue={defaultValue}
                className={clsx(
                    `w-full rounded-md px-4 h-11 ring-[1.5px] box-border bg-transparent ring-[--brown4] text-sm
                    focus:outline-none focus:ring-[--main]`,
                    errors.length > 0 ? "ring-[#BB6901] focus:ring-[#BB6901]" : "ring-[--brown4]"
                )}
            />
            {
                errors.map( (err, idx) => (
                    <div key={idx} className="text-xs text-[#BB6901] pt-1">{err}</div>
                ))
            }
        </>
    )
}