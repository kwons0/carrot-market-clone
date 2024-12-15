import { PLUS_ICON } from "@/components/svg";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialTweet(){
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
    take: 5,
    orderBy: {
      created_at: "desc"
    }
  })
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweet>;

export default async function Home() {
  const initialTweets = await getInitialTweet();

  return (
    <div className="p-[1rem]">
      <TweetList initialTweets={initialTweets} />
      <Link href="/tweets/add"
        className="bg-[--main] flex items-center justify-center rounded-full 
          fixed bottom-20 right-8 text-white transition-colors py-2 px-4 hover:bg-[--main2]">
        <PLUS_ICON classname="size-4"/><span className="text-sm">글쓰기</span>
      </Link>
    </div>
  );
}
