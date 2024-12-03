import Link from "next/link";
import * as SVG from "./svg";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";


interface ListTweetProps {
    id: number;
    user: {
        id: number;
        created_at: Date;
        updated_at: Date;
        username: string;
        password: string;
        email: string;
        bio: string | null;
        avatar: string | null;
    };
    created_at: Date;
    tweet: string;
}

export default function ListTweet(
    {id, user, created_at, tweet}: ListTweetProps
){
    return (
        <Link href={`/tweets/${id}`}
            className="flex gap-3 border-b border-b-gray-200 mb-2 py-2"
        >
            <p className="relative flex-none size-10 rounded-md overflow-hidden">
                {
                    user.avatar
                    ? <Image fill src={user.avatar} alt={user.username} className="object-cover"/>
                    : <SVG.PROFILE_ICON classname=""/>
                }
            </p>
            <ul className="*:leading-tight flex-1 w-full">
                <li className="flex flex-wrap *:text-sm
                ">
                    <p className="pr-2 font-semibold">{user.username}</p>
                    <span className="pr-3 text-gray-400
                        relative after:block; after:content-[''] 
                        after:size-[2px] after:rounded-full after:absolute after:right-1 after:top-[50%] after:translate-y-[-50%] after:bg-gray-400
                    ">
                    {user.email}</span>
                    <span className="text-gray-400">{formatToTimeAgo(created_at.toString())}</span>
                </li>
                <li className="text-sm py-1">
                    {tweet}
                </li>
                <li className="flex items-center my-1">
                    <p className="flex items-center mr-3"><SVG.COMMENT_ICON classname="size-4 mr-1"/><span className="text-xs text-gray-500">2</span></p>
                    <p className="flex items-center"><SVG.HEART_STOKE_ICON classname="size-4 mr-1"/><span className="text-xs text-gray-500">5</span></p>
                </li>
            </ul>
        </Link>
    )
}