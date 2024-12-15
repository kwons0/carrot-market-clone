import Backbutton from "@/components/backbutton";
import EditPage from "@/components/edit";
import { getUser } from "./actions";

export default async function Edit(){
    const user = await getUser();

    return(
        <div className="p-[1rem] pb-20">
            <Backbutton/>
            <EditPage 
                avatar={user?.avatar} 
                username={user!.username} 
                email= {user!.email}
                bio={user?.bio}
            />
        </div>
    )
}
