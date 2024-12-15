"use client"

import { SEARCH_ICON } from "@/components/svg";
import React, { useState } from "react";
import { searchTweets } from "@/app/(tabs)/search/page";
import ListTweet from "./list-tweet";


interface SearchTweetsProps {
    result: searchTweets;    
}

export default function SearchTweet({result}: SearchTweetsProps){

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTweets, setFilteredTweets] = useState<searchTweets>([]);
    const [isFocused, setIsFocused] = useState(false);
    

    const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term) {
            const filtered = result.filter((tweet) =>
                tweet.tweet.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredTweets(filtered);
        } else {
            setFilteredTweets([]);
        }
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      if (!searchTerm) {
        setIsFocused(false);
      }
    };


    return(
        <>
            <div className="flex items-center px-5 py-2 m-[1rem] bg-[#E1E1C5] rounded-full">
                <SEARCH_ICON classname="w-5 fill-[--brown3]"/>
                <input type="text" name="search" placeholder="무엇을 찾고있나요?"
                    value={searchTerm}
                    onChange={searchChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="bg-transparent placeholder:text-[--brown3] text-[--brown1] w-full px-2 focus:outline-none focus:ring-0"
                />
            </div>
            {!isFocused && (
            <div>
                <ul className="w-full border-b-[1px] border-[--brown4] mb-4 px-[1rem] flex">
                    <li className="border-b-[1px] border-[--brown1] w-fit px-2 py-2 text-sm font-medium">
                    실시간 트렌드
                    </li>
                </ul>
                <img src="/img/asset/visual_slide_bg.png" />
                <ul className="px-[1rem] py-4">
                    <li className="py-3 border-b-[1px] border-[--brown4]">
                    <p className="leading-tight text-sm font-medium">#눈이다</p>
                    <span className="text-[12px] text-[--brown3]">게시물 28개</span>
                    </li>
                    <li className="py-3 border-b-[1px] border-[--brown4]">
                    <p className="leading-tight text-sm font-medium">#첫눈</p>
                    <span className="text-[12px] text-[--brown3]">게시물 15개</span>
                    </li>
                    <li className="py-3">
                    <p className="leading-tight text-sm font-medium">#눈사람</p>
                    <span className="text-[12px] text-[--brown3]">게시물 8개</span>
                    </li>
                </ul>
                </div>
            )}
            {isFocused && (
            <div>
                <ul className="w-full border-b-[1px] border-[--brown4] px-[1rem] flex">
                    <li className="border-b-[1px] border-[--brown1] w-fit px-2 py-2 text-sm font-medium">게시물</li>
                    <li className="w-fit px-2 py-2 text-sm font-medium text-[--brown3]">상점</li>
                </ul>
                <div className="px-[1rem] py-4">
                    {filteredTweets.map((tweet) => (
                    <ListTweet key={tweet.id} {...tweet}/>
                    ))}
                </div>
                
            </div>
            )}
        </>
    )
}