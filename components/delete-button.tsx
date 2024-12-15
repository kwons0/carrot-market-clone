"use client"

import { useState } from "react";
import { DELETE_ICON } from "./svg";

export default function DeleteButton({id}: {id: number}){

    const [visible, setVisible] = useState(false);
    const toggleBtn = () => {
        setVisible( (prev) => !prev)
    }
    return (
        <div className="">
            <div className="flex items-center justify-center gap-[2px]
                absolute right-0 top-[50%] translate-y-[-50%] py-3 cursor-pointer
                *:w-[3px] *:h-[3px] *:bg-[--brown3] *:rounded-full"
                onClick={toggleBtn}
            ><span></span><span></span><span></span></div> 
            {
                visible ? 
                <div className="flex items-center justify-center gap-1 px-2 py-[2px] border-[1.5px] border-[#FF528D]
                    absolute right-[8%] top-[50%] translate-y-[-50%] bg-[--background]
                    group hover:bg-[#FF528D] cursor-pointer transition duration-150 ease-in
                ">
                    <DELETE_ICON classname="w-4 fill-[#FF528D] group-hover:fill-white"/><span className="text-[#FF528D] text-[13px] group-hover:text-white">삭제하기</span>
                </div>
                : null
            }
            
        </div>
    )
}