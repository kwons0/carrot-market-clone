"use client"

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { uploadTweet } from "./actions"
import { InputHTMLAttributes, useState } from "react";
import { ADD_PHOTO_ICON } from "@/components/svg";
import TabBar from "@/components/tab-bar";

interface TweetProps {
    errors?: string[];
    name: string;
    onInputChange: (value: string) => void;
}

export function TweetBox({
    name, errors = [], onInputChange, ...rest
}: TweetProps & InputHTMLAttributes<HTMLTextAreaElement> ){
    return(
        <>
            <textarea
                name={name} 
                onChange={(e) => onInputChange(e.target.value)} 
                className="w-full mt-6 focus:outline-none bg-[--background] min-h-[80vh] placeholder:text-[--brown3]"
                {...rest}
            />
        </>
    )
}

export default function AddTweet(){
    
    const { pending } = useFormStatus();

    const [tweet, setTweet] = useState("");
    const isTweetValid = tweet.trim().length > 0;

    const [preview, setPreview] = useState("");
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event;
        if( !files ) return;
        const file = files[0];
        const url = URL.createObjectURL(file)
        setPreview(url)
    }
    const [state, action] = useFormState(uploadTweet, null);

    return(
        <div className="p-[1rem]">
            <form action={action}>
                <div className="flex justify-between items-center mt-2">
                    <Link href="/">취소</Link>
                    <div className="flex items-center justify-end">
                        <label
                            htmlFor="photo"
                            className="py-1 px-3 bg-[--brown1] rounded-full"
                        >
                            <ADD_PHOTO_ICON classname="w-5"/>
                        </label>
                        <input onChange={onImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden"/>
                        <button 
                            disabled={!isTweetValid || pending}
                            className="bg-[--main] text-white px-3 py-1 text-sm rounded-2xl
                                disabled:bg-[--main2] ml-2
                            "
                        >
                            { pending ? "게시중.." : "게시하기"}
                        </button>
                    </div>
                </div>
                {
                    preview !== ""
                    ? <img src={preview} alt="preview" className="mt-6 max-h-52"/> 
                    : null
                }
                    <TweetBox name="tweet" type="text" required 
                        placeholder="무슨 일이 일어나고 있나요?"
                        onInputChange={setTweet}
                        errors={state?.fieldErrors.tweet}
                    />
            </form>
        </div>
    )
}