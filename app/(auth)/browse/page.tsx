import Button from "@/components/button";
import { MOUNTAIN_FLAG_ICON, RIGHT_ARROW_ICON } from "@/components/svg";
import Image from "next/image";
import Link from "next/link";

export default function Browse() {

  return (
    <div className="relative min-h-screen *:text-center
      bg-[url('/img/asset/login-bg1.jpg')] bg-cover
    ">
      <article className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-center mt-32"><Image src="/img/asset/logo_2x.png" alt="logo" width={250} height={250}/></h1>
        <div className="w-full flex flex-col items-center ">
          <div className="relative mt-32">
            <Link href="/create-account" className="w-[73vw] bg-[#F5F5ED]
              py-2 border-[7px] border-[#FFC602] rounded-full text-lg font-semibold
              flex items-center justify-center
              drop-shadow-[2px_7px_0_#E2B004] max-w-96
            ">
              <MOUNTAIN_FLAG_ICON classname="w-7 mr-2"/><span>시작하기</span><RIGHT_ARROW_ICON classname="w-7"/>
            </Link>
            <img src="https://www.nintendo.co.kr/switch/acbaa/assets/images/top/slowlife_chara01__pc.png"
                className="absolute right-[-13%] bottom-[-55%] w-[90px] shadow-none"
              />
          </div>
          <div className="mt-6 font-medium">
            <span className="text-sm">이미 계정이 있나요?</span>
            <Link href="/log-in" className="text-[--main] underline ml-1 text-sm">로그인</Link>
          </div>
        </div>
      </article>
      
      
    </div>
  );
}
