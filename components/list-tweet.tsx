import Link from "next/link";
import * as SVG from "./svg";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";


interface ListTweetProps {
    id: number;
    created_at: Date;
    tweet: string;
    photo: string | null;
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
    _count: {
        response: number,
        likes: number,
    }
}

export default function ListTweet(
    {id, user, created_at, tweet, _count, photo}: ListTweetProps
){
    return (
        <Link href={`/tweets/${id}`}
            className="flex gap-3 border-b border-[--brown4] mb-2 py-2"
        >
            <p className="relative flex-none size-10 rounded-md overflow-hidden">
                {
                    user.avatar
                    ? <Image fill src={user.avatar} alt={user.username} className="object-cover"/>
                    : <SVG.PROFILE_ICON classname=""/>
                }
            </p>
            <ul className="flex-1 w-full">
                <li className="flex flex-wrap *:leading-tight items-center
                ">
                    <p className="pr-2 font-semibold text-[14px]">{user.username}</p>
                    <span className="pr-3 text-[--brown3] text-[12px]
                        relative after:block; after:content-[''] 
                        after:size-[2px] after:rounded-full after:absolute after:right-1 after:top-[50%] after:translate-y-[-50%] after:bg-[--brown3]
                    ">
                    {user.email}</span>
                    <span className="text-[--brown3] text-[12px]">{formatToTimeAgo(created_at.toString())}</span>
                </li>
                <li className="py-2">
                    <div className="text-sm leading-snug">{tweet}</div>
                    <div>
                        {
                            photo
                            ? <img src={photo} alt={tweet} className="w-full h-32 object-cover rounded-md mt-2"/>
                            : null
                        }
                    </div>
                </li>
                <li className="flex items-center my-1">
                    <p className="flex items-center mr-3">
                        <SVG.COMMENT_ICON classname="size-4 mr-1"/>
                        <span className="text-xs text-[--brown3]">{_count.response}</span>
                    </p>
                    <p className="flex items-center">
                        { _count.likes !== 0 
                            ? <SVG.HEART_FILL_ICON classname="size-4 mr-1"/>
                            : <SVG.HEART_STOKE_ICON classname="size-4 mr-1"/>
                        }
                        <span className="text-xs text-[--brown3]">{_count.likes}</span>
                    </p>
                </li>
            </ul>
        </Link>
    )
}