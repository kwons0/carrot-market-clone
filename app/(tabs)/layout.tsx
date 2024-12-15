import TabBar from "@/components/tab-bar"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
      template: "%s | 거래해요! 동뮬의 숲",
      default: "거래해요! 동뮬의 숲 마켓"
    },
    description: "Sell and buy all the things",
  };
  

export default function TabLayout({children}: {
    children: React.ReactNode
}){
    return(
        <div className="mb-11">
            {children}
            <TabBar />
        </div>
    )
}