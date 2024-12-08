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
            },
            _count:{
                select: {
                    response: true,
                }
            }
        }
    })
    return tweet;
}


async function getLikeStatus(tweetId: number){
    const session = await getSession()
    const isLiked = await db.like.findFirst({
        where: {
            tweetId,
            userId: session.id!,
        }
    })
    const likeCount = await db.like.count({
        where: {
            tweetId
        }
    })
    return {
        likeCount, 
        isLiked: Boolean(isLiked)
    }
}

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
        <div>
            <Link href="/"><SVG.BACK_ICON classname="size-5 mb-5"/></Link>
            <div>
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
                <div className="flex items-center my-4">
                    <p className="flex items-center mr-3">
                        <SVG.COMMENT_ICON classname="size-5 mr-1"/>
                        <span className="text-xs text-gray-500">
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