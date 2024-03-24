
// import { NextRequest, NextResponse } from "next/server";

// const sessionStatus = false;
// const protectedRoutes = ["/cart"];

// export default function middleware(req){
//     if(!sessionStatus && protectedRoutes.includes(req.nextUrl.pathname)){
//         const absoluteURL = new URL("/", req.nextUrl.origin);
//         return NextResponse.redirect(absoluteURL.toString());
//     }
// }




// import { ReactElement } from "react";
// import { Navigate, Outlet } from "react-router-dom";


// const ProtectedRoute = ({
//   isAuthenticated,
//   children,
//   adminOnly,
//   admin,
//   redirect = "/",
// }) => {
//   if (!isAuthenticated) return <Navigate to={redirect} />;

//   if (adminOnly && !admin) return <Navigate to={redirect} />;

//   return children ? children : <Outlet />;
// };

// export default ProtectedRoute;