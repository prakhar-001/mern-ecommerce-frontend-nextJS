import { NextResponse } from "next/server"

export default function middleware(req) {


    let verifyCookie = req.cookies.get("loggedInCookie");
    // console.log(verifyCookie)
    let url = req.url

    if(!verifyCookie && ( 
        url.includes('/admin') || 
        url.includes('/cart') ||
        url.includes('/orders') ||
        url.includes('/pay') ||
        url.includes('/payNow') ||
        url.includes('/profile') ||
        url.includes('/wishlist')
        // url.includes('/page2') || 
    )){
        return NextResponse.redirect(
            new URL('/logIn-email-pass', req.url)
            // new URL('/', req.url)
        )
    }

    if(verifyCookie && (url.includes('/logIn-email-pass') || url.includes('/signIn-email-pass') || url.includes('/resetPassword')) ){
        return NextResponse.redirect(
            new URL('/', req.url)
        )
    }
}

// export const config = {
//     matcher: ['/' , "/page1", "/page2"]
// }