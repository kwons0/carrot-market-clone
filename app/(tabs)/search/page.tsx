import SearchTweet from "@/components/search-tweet";
import { Prisma } from "@prisma/client";
import {getSearchTweets, getStore } from "./actions";


export type searchTweets = Prisma.PromiseReturnType<typeof getSearchTweets>;

export default async function Search(){

    const searchTweets = await getSearchTweets();

    return (
        <div className="">
            <SearchTweet result={searchTweets}/>
        </div>
    )
}