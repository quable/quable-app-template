import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export const config = {
  matcher: [
    // Match all routes except specific static assets and paths
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

export const proxy = async (request: NextRequest) => {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname + (nextUrl.search || "");

  let response: NextResponse;
  if (pathname.match(/^\/[a-zA-Z0-9-]+\/.+$/)) {
    const sessionId = pathname.split("/")[1];
    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.redirect(new URL("/error", request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-session-id", sessionId);

    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.cookies.set("locale", session.interfaceLocale);
    response.cookies.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  } else {
    response = NextResponse.next();
  }

  return response;
};
