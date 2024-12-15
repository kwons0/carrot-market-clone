"use server"

import db from "@/lib/db";
import { notFound } from "next/navigation";

export async function getUser(username: string){
    const user = await db.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            email: true,
            bio: true,
            avatar: true,
            _count: {
                select: {
                    tweets: true,
                    response: true,
                    likes: true,
                }
            }
        }
    })
    if( user ) return user;
    notFound();
}

export async function getTweetsByUserId(userId: number){
    const tweets = await db.tweet.findMany({
        where: { userId },
        select: {
            id: true,
            tweet: true,
            photo: true,
            created_at: true,
            _count: {
                select: {
                    likes: true,
                    response: true,
                }
            }
        },
        orderBy: {
            created_at: "desc"
        }

    })
    if( tweets ) return tweets;

}