import db from "@/lib/db";
import Image from "next/image";
import * as SVG from "./svg";
import getSession from "@/lib/session";
import AddCommentForm from "./add-comment-form";

interface UserProps {
    tweetUser: string;
    tweetId: number;
}

async function getUser(){
    const session = await getSession();
    if( session.id ){
        const user = await db.user.findUnique({
            where: { id: session.id },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
            }
        })
        if( user ) return user;
    }
}

export default async function AddComment({ tweetUser, tweetId }: UserProps){
    const user = await getUser();

    return(
        <div className="fixed bottom-14 left-0 border-t w-full py-2 px-4 bg-white">
            <ul className="flex items-center">
                <li className="relative flex-none size-7 rounded-md overflow-hidden mr-2">
                    {
                        user?.avatar
                        ? <Image fill src={user.avatar} alt={user.username} className="object-cover"/>
                        : <SVG.PROFILE_ICON classname=""/>
                    }
                </li>
                
                <li className="flex-1 *:leading-tight">
                    <div className="flex items-center">
                        <p className="pr-1 text-sm">{user?.username}</p>
                        <span className="pr-3 text-gray-400 text-[12px]">{user?.email}</span>
                    </div>
                    <div className="text-xs text-gray-400"><span className="text-[--main] text-xs">@{tweetUser}</span> 님에게 보내는 답글</div>
                </li>
            </ul>
            <AddCommentForm tweetId={tweetId}/>
        </div>
    )
}