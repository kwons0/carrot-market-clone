import TabBar from "@/components/tab-bar"

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