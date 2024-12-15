"use client"

import { dislikePost, likePost } from "@/app/(tabs)/tweets/[id]/actions";
import { useOptimistic } from "react";
import * as SVG from "./svg";

interface LikeButtonProps {
    isLiked: boolean;
    likeCount: number;
    tweetId: number;
}

export default function LikeButton({isLiked, likeCount, tweetId}: LikeButtonProps){
    const [state, reducerFn] = useOptimistic(
        { isLiked, likeCount },
        (previousState, payload) => ({
          isLiked: !previousState.isLiked,
          likeCount: previousState.isLiked
            ? previousState.likeCount - 1
            : previousState.likeCount + 1,
        })
    );

    const onClick = async () => {
        reducerFn(undefined);
        if (isLiked) {
            await dislikePost(tweetId);
        } else {
            await likePost(tweetId);
        }
    };
    
    return(
        <button onClick={onClick} className="flex items-center">
            {
                isLiked 
                ? <SVG.HEART_FILL_ICON classname="size-5 mr-1"/>
                : <SVG.HEART_STOKE_ICON classname="size-5 mr-1"/>
            }
            <span className="text-xs text-[--brown3]">
                {likeCount}
            </span>
        </button>
    )
}