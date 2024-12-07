import { NextResponse } from "next/server"

export default function middleware(req) {


    // let verifyCookie = req.cookies.get("loggedInCookie");
    // // console.log(verifyCookie)
    // let url = req.url

    // if(!verifyCookie && (url.includes('/page1') || url.includes('/page2') || url.includes('/page3')) ){
    //     return NextResponse.redirect(
    //         new URL('/log-in', req.url)
    //     )
    // }

    // if(verifyCookie && (url.includes('/log-in') || url.includes('/sign-up')) ){
    //     return NextResponse.redirect(
    //         new URL('/', req.url)
    //     )
    // }
}

// export const config = {
//     matcher: ['/' , "/page1", "/page2"]
// }