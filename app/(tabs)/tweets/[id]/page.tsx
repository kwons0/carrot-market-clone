import db from "@/lib/db"
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as SVG from "../../../../components/svg";
import Link from "next/link";
import Comments from "@/components/comments";
import AddComment from "@/components/add-comment";
import LikeButton from "@/components/like-button";
import getSession from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";
import Backbutton from "@/components/backbutton";
import { getLikeStatus, getTweet } from "./actions";


function getCachedLikeStatus(tweetId: number){
    const cachedOperation = nextCache(getLikeStatus, ["proudct-like-status"], {
        tags: [`like-status-${tweetId}`]
    })
    return cachedOperation(tweetId)
}


export default async function TweetDetail(
    {params}: {params: {id: string}}
){
    const id = Number(params.id);
    if( isNaN(id) ) return notFound();

    const tweet = await getTweet(id);
    if( !tweet ) return notFound();

    const {likeCount, isLiked} = await getCachedLikeStatus(id);

    return (
        <div className="p-[1rem]">
            <Backbutton/>
            <div>
                <div className="flex justify-between items-center">
                    <ul className="*:leading-tight w-full flex">
                        <li className="relative flex-none size-10 rounded-md overflow-hidden mr-2">
                            <Link href={`/users/${tweet.user.username}`}>
                                {
                                    tweet.user.avatar
                                    ? <Image fill src={tweet.user.avatar} alt={tweet.user.username} className="object-cover"/>
                                    : <SVG.PROFILE_ICON classname=""/>
                                }
                            </Link>
                        </li>
                        <li className="flex-1
                        ">
                            <p className="pr-2 font-semibold">{tweet.user.username}</p>
                            <span className="pr-3 text-[--brown3] text-[13px]
                                relative after:block; after:content-[''] 
                                after:size-[2px] after:rounded-full after:absolute after:right-1 after:top-[50%] after:translate-y-[-50%] after:bg-[--brown3]
                            ">
                            {tweet.user.email}</span>
                            <span className="text-[--brown3] text-[13px]">{formatToTimeAgo(tweet.created_at.toString())}</span>
                        </li>
                    </ul>
                    <Link href={`/users/${tweet.user.username}`}
                        className="flex items-center justify-center bg-[--main] px-3 h-fit py-1 rounded-full
                        hover:bg-[--main2] duration-200 transition ease-in
                        "
                    ><SVG.PLANT_ICON classname="w-4 mr-1"/><span className="text-white text-[11px] whitespace-nowrap">상점 구경가기</span></Link>
                </div>
                <div className="pt-6 pb-5">
                    <div className="text-sm whitespace-pre-wrap">{tweet.tweet}</div>
                    <div>
                        {
                            tweet?.photo
                            ? <img src={tweet?.photo} alt={tweet.tweet} className="w-full h-32 object-cover mt-4 rounded-md"/>
                            : null
                        }
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <p className="flex items-center mr-3">
                        <SVG.COMMENT_ICON classname="size-5 mr-1"/>
                        <span className="text-xs text-[--brown3]">
                            {tweet._count.response}
                        </span>
                    </p>
                    <p><LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id}/></p>
                </div>
            </div>
            <div><Comments tweetId={id}/></div>
            <div>
                <AddComment tweetId={id} tweetUser={tweet.user.username}/>
            </div>
        </div>
    )
}