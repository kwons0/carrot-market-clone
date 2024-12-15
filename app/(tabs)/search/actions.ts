import db from "@/lib/db";

export async function getSearchTweets(query: string = ""){

    const tweets = await db.tweet.findMany({
        where: {
            tweet: {
                contains: query,
                // mode: "insensitive",
            }
        },
        select: {
            id: true,
            tweet: true,
            created_at: true,
            user: true,
            photo: true,
            _count: {
                select: {
                  response: true,
                  likes: true,
                }
              }
        },
        orderBy: {
            created_at: "desc"
        }
    })
    return tweets;
}
export async function getStore(query: string = ""){

    const tweets = await db.user.findMany({
        where: {
            username: {
                contains: query,
                // mode: "insensitive",
            }
        },
        select: {
            id: true,
            username: true,
            avatar: true,
        },
        orderBy: {
            created_at: "desc"
        }
    })
    return tweets;
}
