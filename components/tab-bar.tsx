"use client"

import Link from "next/link"
import  * as SVG from "./svg"
import { usePathname } from "next/navigation"

export default function TabBar(){
    const pathname = usePathname();
    return(
        <div className="flex items-center justify-between fixed bottom-0 left-0 w-full border-t-[1px] border-gray-200 bg-white">
            <Link href="/"
                className="flex flex-col gap-1 justify-center items-center w-1/2 py-2 relative
                    after:content-[''] after:block after:w-[1px] after:h-6 after:absolute after:right-0 after:top-[50%] after:translate-y-[-50%] after:bg-gray-200
                "
            >
                { pathname === "/" || pathname.includes('/tweets')
                    ? <SVG.HOME_FILL_ICON classname="size-6"/>
                    : <SVG.HOME_STROKE_ICON classname="size-6"/> }
                <span className="text-xs">홈</span>
            </Link>
            <Link href="/profile"
                className="flex flex-col gap-1 justify-center items-center w-1/2 py-2"
            >
                { pathname === "/profile"
                ? <SVG.PERSON_FILL_ICON classname="size-6"/>
                : <SVG.PERSON_STOKE_ICON classname="size-6"/> }
                <span className="text-xs">나의 당근</span>
            </Link>
        </div>
    )
}