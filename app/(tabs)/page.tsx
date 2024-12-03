import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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
    </div>
  );
}
