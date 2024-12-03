"use client"

import { InitialTweets } from "@/app/(tabs)/page"
import { useEffect, useRef, useState } from "react"
import ListTweet from "./list-tweet"
import { getMoreTweets } from "@/app/actions"

interface TweetListProps {
  initialTweets: InitialTweets
}


export default function TweetList(
    {initialTweets}: TweetListProps
){
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);


  const onLoadPage = async(role: "prev" | "next") => {

    if ( isLoading ) return;
    
    setIsLoading(true);

    const control = role === "next" ? page + 1 : page - 1 
    const { tweets: newTweets, firstTweet, lastTweet } 
        = await getMoreTweets( control );

    if (newTweets.length !== 0) {

      setPage( control  );
      setTweets([...newTweets]);
      
      setIsFirstPage(lastTweet?.id === newTweets[0]?.id);
      setIsLastPage(firstTweet?.id === newTweets[newTweets.length - 1]?.id);
    }
  
    setIsLoading(false)
  }


  return (
    <div>
      {
        tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet}/>
        ))
      }
      <div className="flex items-center justify-center mt-4 mb-24 w-full *:text-sm">
        <button onClick={() => onLoadPage("prev")} disabled={isFirstPage}
          className="disabled:text-gray-400 mx-2"
        >
          이전
        </button>
        <button onClick={() => onLoadPage("next")} disabled={isLastPage}
          className="disabled:text-gray-400 mx-2"
        >
          다음
        </button>
      </div>
    </div>
  )
}