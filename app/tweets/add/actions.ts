"use server"

import db from "@/lib/db";
import fs from "fs/promises"
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod"

const tweetSchema = z.object({
    tweet: z.string({ required_error: "true"}),
    photo: z.string()
})

export async function uploadTweet(_: unknown, formData: FormData){
    const data = {
        tweet: formData.get("tweet"),
        photo: formData.get("photo"),
    }
    if( data.photo instanceof File ) {
        const photoData = await data.photo.arrayBuffer();
        await fs.appendFile(`./public/img/tweet/${data.photo.name}`, Buffer.from(photoData));
        data.photo = `/img/tweet/${data.photo.name}`
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
                    photo: result.data.photo,
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