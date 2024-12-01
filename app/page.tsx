import Button from "@/components/button";
import { LOGO } from "@/components/svg";
import Link from "next/link";

export default function Home() {

  return (
    <div className="relative h-screen *:text-center">
      <article className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-center size-32"><LOGO classname="w-[100%] h-[100%]"/></h1>
        <div className="mt-5 mb-2 text-xl font-bold">당신 근처의 당근마켓</div>
        <p className="text-sm leading-tight">중고 거래부터 동네 정보까지,<br/>지금 내 동네를 선택하고 시작해보세요!</p>
      </article>
      
      <div className="absolute left-[50%] bottom-10 translate-x-[-50%] w-[100%]">
        <Link href="/create-account" className=""><Button text="시작하기" /></Link>
        <div className="mt-3">
          <span className="text-gray-400 text-sm">이미 계정이 있나요?</span>
          <Link href="/log-in" className="text-[--main] underline ml-1 text-sm">로그인</Link>
        </div>
      </div>
    </div>
  );
}
