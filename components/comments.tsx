import * as SVG from "./svg";
import Image from "next/image";
import { formatToTimeAgo } from "@/lib/utils";
import { getCommnet } from "@/app/(tabs)/tweets/[id]/actions";
import getSession from "@/lib/session";
import DeleteButton from "./delete-button";
import db from "@/lib/db";

interface CommentsProps {
    tweetId: number
}


export async function getIsOwner(
    userId: number
){
    const session = await getSession();
    if( session.id ){
        return session.id === userId
    }
    return false
}

// export async function deleteComment(commentId: number) {
//     await new Promise((r) => setTimeout(r, 10000));
//     try {
//       const session = await getSession();
//       await db.response.delete({
//         where: {
//           id:  commentId,
//         },
//       });
//     } catch (e) {}
//   }

export default async function Comments({tweetId}: CommentsProps){
    const comments = await getCommnet(tweetId);

    return(
        <ul className="pb-32">
            {await Promise.all(comments.map(async (comment) => {
                const isOwner = await getIsOwner(comment.user.id);

                return (
                    <li key={comment.id} className="w-full flex border-t border-[--brown4] py-3">
                        <div className="relative flex-none size-7 rounded-md overflow-hidden mr-2">
                            {
                                comment.user.avatar
                                    ? <Image fill src={comment.user.avatar} alt={comment.user.username} className="object-cover"/>
                                    : <SVG.PROFILE_ICON classname=""/>
                            }
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center relative">
                                <p className="pr-1 font-semibold text-sm">{comment.user.username}</p>
                                <span className="pr-3 text-[--brown3] text-[12px]
                                    relative after:block; after:content-[''] 
                                    after:size-[2px] after:rounded-full after:absolute after:right-1 after:top-[50%] after:translate-y-[-50%] after:bg-[--brown3]
                                ">{comment.user.email}</span>
                                <span className="text-[--brown3] text-[12px]">{formatToTimeAgo(comment.created_at.toString())}</span>
                                { isOwner ? <DeleteButton id={comment.id}/> : null}
                            </div>
                            <div className="text-sm py-1 leading-snug">{comment.comment}</div>
                        </div>
                    </li>
                );
            }))}
        </ul>
    )
}