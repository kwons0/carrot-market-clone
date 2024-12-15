"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const commentSchema = z.object({
  comment: z.string(),
  tweetId: z.preprocess((value) => Number(value),
    z.number().int().positive("Invalid tweetId")
  ),
});

export async function getTweet(id: number){
  const tweet = await db.tweet.findUnique({
      where: { id },
      include: {
          user: {
              select: {
                  id: true,
                  created_at: true,
                  updated_at: true,
                  username: true,
                  password: true,
                  email: true,
                  bio: true,
                  avatar: true,
              }
          },
          _count:{
              select: {
                  response: true,
              }
          }
      }
  })
  return tweet;
}


export async function getLikeStatus(tweetId: number){
  const session = await getSession()
  const isLiked = await db.like.findFirst({
      where: {
          tweetId,
          userId: session.id!,
      }
  })
  const likeCount = await db.like.count({
      where: {
          tweetId
      }
  })
  return {
      likeCount, 
      isLiked: Boolean(isLiked)
  }
}

export async function getCommnet(tweetId: number){
  const comments = await db.response.findMany({
      where: {tweetId},
      select: {
          id: true,
          comment: true,
          created_at: true, 
          user: {
              select: {
                  id: true,
                  avatar: true,
                  username: true,
                  email: true,
              }
          }
      }
  })
  return comments;
}




export async function uploadComment(_: unknown, formData: FormData) {
  const data = {
    comment: formData.get("comment"),
    tweetId: formData.get("tweetId"),
  };

  const result = commentSchema.safeParse(data);
  if (!result.success) {
    return { error: "error" };
  }

  const { comment, tweetId } = result.data;

  const session = await getSession();
  if (!session?.id) {
    throw new Error("error");
  }

  const tweet = await db.tweet.findUnique({
    where: { id: tweetId },
  });
  if (!tweet) { 
    throw new Error("error");
  }

  const newComment = await db.response.create({
    data: {
      comment,
      user: { connect: { id: session.id } },
      tweet: { connect: { id: tweetId } },
    },
  });

  redirect(`/tweets/${tweetId}`)
  return newComment;
}


export async function likePost(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}
export async function dislikePost(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        tweetId_userId: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}