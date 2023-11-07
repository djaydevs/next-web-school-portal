import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req: NextRequestWithAuth) {
    // const token = await getToken({ req })

    // if (!token) {
    //   return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    // }
    // console.log("token: ", req.nextauth.token);

    // protect routes for not verified users
    if (req.nextUrl.pathname.startsWith("/not-verified") && req.nextauth.token?.isVerified)
      return NextResponse.rewrite(
        new URL("/signin", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/admin") && !req.nextauth.token?.isVerified)
      return NextResponse.rewrite(
        new URL("/not-verified", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/faculty") && !req.nextauth.token?.isVerified)
      return NextResponse.rewrite(
        new URL("/not-verified", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/student") && !req.nextauth.token?.isVerified)
      return NextResponse.rewrite(
        new URL("/not-verified", req.url)
      );

    //protect api routes
    if (req.nextUrl.pathname.startsWith("/api") && req.nextauth.token?.role === "admin")
      return NextResponse.rewrite(
        new URL("/admin", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/api") && req.nextauth.token?.role === "faculty")
      return NextResponse.rewrite(
        new URL("/faculty", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/api") && req.nextauth.token?.role === "student")
      return NextResponse.rewrite(
        new URL("/student", req.url)
      );

    //protect routes per role
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
      return NextResponse.rewrite(
        new URL("/signin", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/faculty") && req.nextauth.token?.role !== "faculty")
      return NextResponse.rewrite(
        new URL("/signin", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/student") && req.nextauth.token?.role !== "student")
      return NextResponse.rewrite(
        new URL("/signin", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  // REMINDER: add api route to the matcher if you're done testing
  // matcher: ["/api/:path*", "/admin/:path*", "/faculty/:path*", "/student/:path*, "/not-verified/:path*""],
  matcher: ["/admin/:path*", "/faculty/:path*", "/student/:path*", "/not-verified/:path*"],
  secret: process.env.SECRET,
};