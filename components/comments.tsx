import db from "@/lib/db"
import * as SVG from "./svg";
import Image from "next/image";
import { formatToTimeAgo } from "@/lib/utils";

async function getCommnet(tweetId: number){
    const comments = await db.response.findMany({
        where: {tweetId},
        select: {
            id: true,
            comment: true,
            created_at: true, 
            user: {
                select: {
                    avatar: true,
                    username: true,
                    email: true,
                }
            }
        }
    })
    return comments;
}

interface CommentsProps {
    tweetId: number
}

export default async function Comments({tweetId}: CommentsProps){
    const comments = await getCommnet(tweetId);
    return(
        <ul className="pb-32">
            { comments.map( (comment) => (
                <li key={comment.id} className="*:leading-tight w-full flex
                border-t border-gray-200 py-2
                ">
                    <div className="relative flex-none size-7 rounded-md overflow-hidden mr-2">
                        {
                            comment.user.avatar
                            ? <Image fill src={comment.user.avatar} alt={comment.user.username} className="object-cover"/>
                            : <SVG.PROFILE_ICON classname=""/>
                        }
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center">
                            <p className="pr-1 font-semibold text-sm">{comment.user.username}</p>
                            <span className="pr-3 text-gray-400 text-[12px]
                                relative after:block; after:content-[''] 
                                after:size-[2px] after:rounded-full after:absolute after:right-1 after:top-[50%] after:translate-y-[-50%] after:bg-gray-400
                            ">{comment.user.email}</span>
                            <span className="text-gray-400 text-[12px]">{formatToTimeAgo(comment.created_at.toString())}</span>
                        </div>
                        <div className="text-sm py-1
                        ">{comment.comment}</div>
                    </div>
                </li>
            ))}
        </ul>
    )
}