"use client"

import Link from "next/link"
import  * as SVG from "./svg"
import { usePathname } from "next/navigation"
import Cookies from 'js-cookie';

export default function TabContents({username}: { username : string | undefined }){
    const pathname = usePathname();

    const setCookie = () => {
        Cookies.set('owner', 'tab-click', { expires: 1,});
    };

    return(
        <>
            <Link href="/"
                className="flex flex-col gap-1 justify-center items-center w-1/2 py-2 relative
                    after:content-[''] after:block after:w-[1px] after:h-6 after:absolute after:right-0 after:top-[50%] after:translate-y-[-50%] after:bg-[--brown4]
                "
            >
                { pathname === "/" || pathname.includes('/tweets')
                    ? <SVG.HOME_FILL_ICON classname="size-6"/>
                    : <SVG.HOME_STROKE_ICON classname="size-6"/> }
                <span className="text-xs">홈</span>
            </Link>
            <Link href="/search"
                className="flex flex-col gap-1 justify-center items-center w-1/2 py-2 relative
                after:content-[''] after:block after:w-[1px] after:h-6 after:absolute after:right-0 after:top-[50%] after:translate-y-[-50%] after:bg-[--brown4]"
            >
                { pathname === "/search"
                ? <SVG.SEARCH_FILL_ICON classname="size-6"/>
                : <SVG.SEARCH_STOKE_ICON classname="size-6"/> }
                <span className="text-xs">검색</span>
            </Link>
            <Link href={`/users/${username}`}
                className="flex flex-col gap-1 justify-center items-center w-1/2 py-2"
                onClick={setCookie}
            >
                { pathname.includes("/users/")
                ? <SVG.MYPAGE_FILL_ICON classname="size-6"/>
                : <SVG.MYPAGE_STOKE_ICON classname="size-6"/> }
                <span className="text-xs">나의 마을</span>
            </Link>
        </>
    )
}