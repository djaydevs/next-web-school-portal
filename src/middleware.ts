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

    // redirect to not found page if already verified
    if (req.nextUrl.pathname.startsWith("/verify") && req.nextauth.token?.isVerified)
      return NextResponse.rewrite(
        new URL("/not-found", req.url)
      );

    // protect routes for not verified users
    if (req.nextUrl.pathname.startsWith("/admin") && !req.nextauth.token?.isVerified)
      return NextResponse.rewrite(
        new URL("/not-found", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/faculty") && !req.nextauth.token?.isVerified)
      return NextResponse.rewrite(
        new URL("/not-found", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/student") && !req.nextauth.token?.isVerified)
      return NextResponse.rewrite(
        new URL("/not-found", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/api") && !req.nextauth.token?.isVerified)
      return NextResponse.rewrite(
        new URL("/not-found", req.url)
      );

    // redirect to dashboard if already logged in
    if (req.nextUrl.pathname.startsWith("/signin") && req.nextauth.token?.role === "admin")
      return NextResponse.rewrite(
        new URL("/admin", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/signin") && req.nextauth.token?.role === "faculty")
      return NextResponse.rewrite(
        new URL("/faculty", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/signin") && req.nextauth.token?.role === "student")
      return NextResponse.rewrite(
        new URL("/student", req.url)
      );

    //protect routes per role
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
      return NextResponse.rewrite(
        new URL("/not-found", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/faculty") && req.nextauth.token?.role !== "faculty")
      return NextResponse.rewrite(
        new URL("/not-found", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/student") && req.nextauth.token?.role !== "student")
      return NextResponse.rewrite(
        new URL("/not-found", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    secret: process.env.SECRET,
  }
);

export const config = {
  matcher: ["/signin/:path*", "/verify/:path*", "/admin/:path*", "/faculty/:path*", "/student/:path*"],
};