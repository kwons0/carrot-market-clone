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
            <form action={action} onSubmit={() => setComment("")} className="my-2 flex items-center *:text-sm">
                <input type="hidden" name="tweetId" value={tweetId} />
                <input name="comment" type="text" required placeholder="답글 게시하기" 
                    className="bg-[#E1E1C5] w-full py-1 px-4 rounded-2xl mr-2 placeholder:text-[--brown3] focus:outline-[--main]"
                    onChange={(e) => setComment(e.target.value)} 
                    value={comment}
                />
                <button 
                        disabled={!isCommentValid || pending}
                        className="bg-[--main] text-white px-3 py-1 rounded-2xl
                            disabled:bg-[--main2] whitespace-nowrap
                        "
                    >
                        {pending ? '로딩 중' : '답글'}
                    </button>
            </form>
        </>
    )
}