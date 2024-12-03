import db from "@/lib/db"
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as SVG from "../../../../components/svg";

async function getTweet(id: number){
    const tweet = await db.tweet.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    created_at: true,
                    updated_at: true,
                    username: true,
                    password: true,
                    email: true,
                    bio: true,
                    avatar: true,
                }
            }
        }
    })
    return tweet
}

export default async function TweetDetail(
    {params}: {params: {id: string}}
){
    const id = Number(params.id);
    if( isNaN(id) ) return notFound();

    const tweet = await getTweet(id);
    if( !tweet ) return notFound();


    return (
        <div className="">
            <ul className="*:leading-tight w-full flex">
                <li className="relative flex-none size-10 rounded-md overflow-hidden mr-2">
                    {
                        tweet.user.avatar
                        ? <Image fill src={tweet.user.avatar} alt={tweet.user.username} className="object-cover"/>
                        : <SVG.PROFILE_ICON classname=""/>
                    }
                </li>
                <li className="*:text-sm flex-1
                ">
                    <p className="pr-2 font-semibold">{tweet.user.username}</p>
                    <span className="pr-3 text-gray-400
                        relative after:block; after:content-[''] 
                        after:size-[2px] after:rounded-full after:absolute after:right-1 after:top-[50%] after:translate-y-[-50%] after:bg-gray-400
                    ">
                    {tweet.user.email}</span>
                </li>
            </ul>
            <div className="text-sm py-6">{tweet.tweet}</div>
            <div className="text-gray-400 text-xs">{formatToTimeAgo(tweet.created_at.toString())}</div>
            <div className="flex items-center my-3">
                <p className="flex items-center mr-3"><SVG.COMMENT_ICON classname="size-4 mr-1"/><span className="text-xs text-gray-500">2</span></p>
                <p className="flex items-center"><SVG.HEART_STOKE_ICON classname="size-4 mr-1"/><span className="text-xs text-gray-500">5</span></p>
            </div>
        </div>
    )
}