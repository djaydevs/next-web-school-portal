// export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { withAuth, NextRequestWithAuth  } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req: NextRequestWithAuth) {
    // const token = await getToken({ req })

    // if (!token) {
    //   return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    // }
    // console.log("token: ", req.nextauth.token);

    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN")
      return NextResponse.rewrite(
        new URL("api/auth/signin?message=You Are Not Authorized!", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/faculty") && req.nextauth.token?.role !== "FACULTY")
      return NextResponse.rewrite(
        new URL("api/auth/signin?message=You Are Not Authorized!", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/student") && req.nextauth.token?.role !== "STUDENT")
      return NextResponse.rewrite(
        new URL("api/auth/signin?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/faculty/:path*", "/student/:path*"],
};