import db from "@/lib/db";
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation";



async function getUser(){
    const session = await getSession();
    if( session.id ){
        const user = await db.user.findUnique({
            where: { id: session.id }
        })
        if( user ) return user;
    }
    notFound();
}

export default async function Profile(){

    const user = await getUser();
    const logout = async () => {
        "use server"
        const session = await getSession();
        await session.destroy();
        redirect('/')
    }

    return(
        <div className="py-11">
            <h2 className="leading-tight text-xl mb-5">안녕하세요,<br/>{user?.username}님</h2>
            <form action={logout}>
                <button className="underline text-gray-500 text-sm">로그아웃</button>
            </form>
        </div>
    )
}