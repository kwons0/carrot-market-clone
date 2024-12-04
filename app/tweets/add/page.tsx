"use client"

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { uploadTweet } from "./actions"
import { InputHTMLAttributes, useState } from "react";

interface TweetProps {
    errors?: string[];
    name: string;
    onInputChange: (value: string) => void;
}

export function TweetBox({
    name, errors = [], onInputChange, ...rest
}: TweetProps & InputHTMLAttributes<HTMLInputElement> ){
    return(
        <>
            <input
                name={name} 
                onChange={(e) => onInputChange(e.target.value)} 
                className="w-full mt-6 focus:outline-none"
                {...rest}
            />
        </>
    )
}

export default function AddTweet(){
    const [state, action] = useFormState(uploadTweet, null);
    const [tweet, setTweet] = useState("");
    const isTweetValid = tweet.trim().length > 0;
    
    const { pending } = useFormStatus();

    return(
        <div>
            <form action={action}>
            <div className="flex justify-between items-center mt-2">
                <Link href="/">취소</Link>
                <button 
                    disabled={!isTweetValid || pending}
                    className="bg-[--main] text-white px-3 py-1 text-sm rounded-2xl
                        disabled:bg-[#ff6f0f5e]
                    "
                >
                    { pending ? "게시중.." : "게시하기"}
                </button>
            </div>
                <TweetBox name="tweet" type="text" required 
                    placeholder="무슨 일이 일어나고 있나요?"
                    onInputChange={setTweet}
                    errors={state?.fieldErrors.tweet}
                />
            </form>
        </div>
    )
}