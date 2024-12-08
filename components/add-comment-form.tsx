"use client"

import { uploadComment } from "@/app/(tabs)/tweets/[id]/actions";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface AddCommentFormProps{
    tweetId: number
}

export default function AddCommentForm({tweetId} : AddCommentFormProps){
    const [comment, setComment] = useState("");
    const isCommentValid = comment.trim().length > 0;
    
    const { pending } = useFormStatus();

    const [state, action] = useFormState(uploadComment, null);

    return(
        <>
            <form action={action} className="my-2 flex items-center *:text-sm">
                <input type="hidden" name="tweetId" value={tweetId} />
                <input name="comment" type="text" required placeholder="답글 게시하기" 
                    className="bg-gray-100 w-full py-1 px-3 rounded-2xl mr-2"
                    onChange={(e) => setComment(e.target.value)} 
                />
                <button 
                        disabled={!isCommentValid || pending}
                        className="bg-[--main] text-white px-3 py-1 rounded-2xl
                            disabled:bg-[#ff6f0f5e] whitespace-nowrap
                        "
                    >
                        {pending ? '로딩 중' : '답글'}
                    </button>
            </form>
        </>
    )
}