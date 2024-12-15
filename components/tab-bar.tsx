import db from "@/lib/db";
import TabContents from "./tab-contents";
import getSession from "@/lib/session";

export async function getUser(){
    const session = await getSession();
    const user = await db.user.findUnique({
        where: { id: session.id },
        select: {
            username: true,
        }
    })
    return user;
}

export default async function TabBar(){

    const user = await getUser();
    
    return(
        <div className="flex items-center justify-between fixed bottom-0 left-[50%] translate-x-[-50%] w-full max-w-screen-sm mx-auto border-t-[1px] border-[--brown4] bg-[--background]">
            <TabContents username={user?.username}/>
        </div>
    )
}