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
    <div>
      <TweetList initialTweets={initialTweets}/>
      <Link href="/tweets/add"
        className="bg-orange-500 flex items-center justify-center rounded-md fixed bottom-20 right-8 text-white transition-colors py-1 px-2 hover:bg-orange-400">
        <PLUS_ICON classname="size-4"/><span className="text-sm">글쓰기</span>
      </Link>
    </div>
  );
}
