import Backbutton from "@/components/backbutton";
import * as SVG from "@/components/svg";
import Image from "next/image";
import { getTweetsByUserId, getUser } from "./actions"
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import getSession from "@/lib/session";
import TabBar from "@/components/tab-bar";
import { redirect } from "next/navigation";


async function getIsOwner(
    userId: number
){
    const session = await getSession();
    if( session.id ){
        return session.id === userId
    }
    return false
}


export default async function Users(
    {params}: { params: {username: string}}

){
    const name = decodeURIComponent(params.username)
    const user = await getUser(name)
    
    const tweets = await getTweetsByUserId(user.id);
    const isOwner = await getIsOwner(user.id);

    const logout = async () => {
        "use server"
        const session = await getSession();
        await session.destroy();
        redirect('/')
    }

    return(
        <div className="py-[1rem] mb-10">
            <div className="pl-[1rem]"><Backbutton/></div>
            <div className="px-[1rem]">
                <div className="flex items-center gap-4">
                    {
                        user?.avatar
                        ? <Image src={user?.avatar} width={55} height={55} alt={user.username}
                            className="rounded-full"
                            />
                        : <SVG.PROFILE_ICON classname="w-[65px]"/>
                    }
                    <div className="*:leading-tight">
                        <p><span className="text-[--main]">{user?.username}</span>님의 마을 정보</p>
                        <span className="text-sm text-[--brown3]">{user?.email}</span>
                    </div>
                </div>
                <ul className="flex items-center justify-center *:text-center *:w-1/3 my-6">
                    <li className="relative after:content-[''] after:block after:w-[1px] after:h-6 after:absolute after:right-0 after:top-[50%] after:translate-y-[-50%] after:bg-[--brown3]">
                        <p className="text-[12px] text-[--brown2]">게시글</p>
                        <div className="font-semibold">{user._count.tweets}</div>
                    </li>
                    <li className="relative after:content-[''] after:block after:w-[1px] after:h-6 after:absolute after:right-0 after:top-[50%] after:translate-y-[-50%] after:bg-[--brown3]">
                        <p className="text-[12px] text-[--brown2]">댓글</p>
                        <div className="font-semibold">{user._count.response}</div>
                    </li>
                    <li>
                        <p className="text-[12px] text-[--brown2]">좋아요</p>
                        <div className="font-semibold">{user._count.likes}</div>
                    </li>
                </ul>
                <div className="w-full text-[13px] leading-snug mb-6">{user.bio}</div>
                {
                    
                    isOwner ? (
                        <div className="flex items-center justify-between gap-2 mb-6
                         *:transion *:ease-in *:duration-200
                        ">
                            <Link href={`/users/${user.username}/edit`}
                                className="flex items-center justify-center border-[1px] border-[--main] py-1 px-3 rounded-[5px] gap-1 w-1/2 cursor-pointer
                                group hover:bg-[--main]
                            ">
                                <SVG.SETTING_ICON classname="w-4 fill-[--main] group-hover:fill-white"/>
                                <span className="text-xs text-[--main] group-hover:text-white">정보 수정하기</span>
                            </Link>
                            <form action={logout}
                                className="flex items-center justify-center border-[1px] border-[--brown3] py-1 px-3 rounded-[5px] gap-1 w-1/2 cursor-pointer
                                group hover:bg-[--brown2]
                            ">
                                <SVG.LOGOUT_ICON classname="w-4 fill-[--brown2] group-hover:fill-white"/>
                                <button className="text-xs text-[--brown2] group-hover:text-white">로그아웃</button>
                            </form>
                        </div>
                    ) : null
                }
            </div>
            <div>
                <ul className="w-full border-b border-[--brown4] px-[1rem]">
                    <li className="p-1 border-b-[1.5px] border-[--brown1] w-fit text-[14px] font-medium">게시물</li>
                </ul>
                <div className="px-[1rem]">
                    <ul className="flex items-center *:text-[12px] *:px-3 *:py-1 *:rounded-full *:mr-2 mt-3 mb-1">
                        <li className="bg-[--brown1] text-white">최신순</li>
                        <li className="bg-[--brown4]">인기순</li>
                    </ul>
                    <ul>
                        {
                            tweets?.map((tweet) => (
                                <li key={tweet.id} className="py-6 border-b border-[--brown4]">
                                    <Link href={`/tweets/${tweet.id}`}>
                                        <div className="text-sm leading-snug">{tweet.tweet}</div>
                                        {
                                            tweet?.photo
                                            ? <img src={tweet?.photo} alt={tweet.tweet} className="w-full h-32 object-cover mt-4 rounded-md"/>
                                            : null
                                        }
                                    </Link>
                                    <div className="flex items-center justify-between mt-4">
                                        <ul className="flex items-center">
                                            <li className="flex items-center mr-3">
                                                <SVG.COMMENT_ICON classname="size-4 mr-1"/>
                                                <span className="text-xs text-[--brown3]">{tweet._count.response}</span>
                                            </li>
                                            <li className="flex items-center">
                                                { tweet._count.likes !== 0 
                                                    ? <SVG.HEART_FILL_ICON classname="size-4 mr-1"/>
                                                    : <SVG.HEART_STOKE_ICON classname="size-4 mr-1"/>
                                                }
                                                <span className="text-xs text-[--brown3]">{tweet._count.likes}</span>
                                            </li>
                                        </ul>
                                        <p className="text-xs text-[--brown3]">{formatToTimeAgo(tweet.created_at.toString())}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            { isOwner ? <TabBar/> : null }
        </div>
    )
}