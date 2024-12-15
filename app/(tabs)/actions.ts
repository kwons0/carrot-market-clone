"use server"

import db from "@/lib/db"

export async function getMoreTweets(page: number){
    const tweets = await db.tweet.findMany({
        select: {
            id: true,
            tweet: true,
            created_at: true,
            user: true,
            photo: true,
            _count: {
                select: {
                  response: true,
                  likes: true,
                }
              }
        },
        skip: page * 5,
        take: 5,
        orderBy: {
            created_at: "desc"
        }
    })
    const firstTweet = await db.tweet.findFirst({
        select: { id: true },
        orderBy: { created_at: "asc" },
    });

    const lastTweet = await db.tweet.findFirst({
        select: { id: true },
        orderBy: { created_at: "desc" },
    });

    return {tweets, firstTweet, lastTweet};
}