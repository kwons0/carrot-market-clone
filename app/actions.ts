"use server"

import db from "@/lib/db"

export async function getMoreTweets(page: number){
    const totalTweets = await db.tweet.count();
    const tweets = await db.tweet.findMany({
        select: {
            id: true,
            tweet: true,
            created_at: true,
            user: true,
        },
        skip: page * 5,
        take: 5,
        orderBy: {
            created_at: "desc"
        }
    })
    return {tweets, totalTweets};
}