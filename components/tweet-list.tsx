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
  const [isLastPage, setIsLastPage] = useState(false);

  const onLoadPage = async() => {
    setIsLoading(true);
    const { tweets: newTweets, totalTweets } = await getMoreTweets(page + 1);    
    if( newTweets.length !== 0 ){
      setPage( (prev) => prev + 1 );
      setTweets( prev => [...prev, ...newTweets])
    }
    if (tweets.length + newTweets.length >= totalTweets) {
        setIsLastPage(true);
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
      {
        !isLastPage ? (
          <button className="w-full text-center text-sm underline text-[--main] mt-4 mb-24"
            onClick={onLoadPage}
            disabled={isLoading}
          >
                {isLoading ? "로딩 중" : "더 보기"}
          </button>
        ) : null
      }
    </div>
  )
}