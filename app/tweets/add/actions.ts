"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod"

const tweetSchema = z.object({
    tweet: z.string({
        required_error: "true"
    })
})

export async function uploadTweet(_: unknown, formData: FormData){
    const data = {
        tweet: formData.get("tweet"),
    }
    const result = tweetSchema.safeParse(data);
    if( !result.success ){
        return result.error.flatten();
    } else {
        const session = await getSession();
        if (session.id){
            const tweet = await db.tweet.create({
                data: {
                    tweet: result.data.tweet,
                    user: {
                        connect: {
                            id: session.id
                        }
                    }
                },
                select: {
                    id: true,
                }
            })
            redirect(`/tweets/${tweet.id}`)
        }
    }
}