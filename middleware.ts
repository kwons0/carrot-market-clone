import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";


interface Routes {
    [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
    "/log-in": true,
    "/create-account": true,
    "/browse": true,
}

export async function middleware(request: NextRequest){
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname];
    if (!session.id) {
        if (!exists) {
            return NextResponse.redirect(new URL("/browse", request.url));
        }
    }
}
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|img).*)"],
};
