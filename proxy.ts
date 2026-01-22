import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ROLE_ROUTES: Record<string, string[]> = {
  admin: ["/dashboard/admin", "/api/admin"],
  mentor: ["/dashboard/mentor" , "/api/mentor"],
  student: ["/dashboard/student", "/api/student"],
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;


  // 1️⃣ Always allow Next internals & static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts")
  ) {
    return NextResponse.next();
  }
  // 2️⃣ Logged-in users should not see login/register
  if (token && (pathname === "/" || pathname.startsWith("/register"))) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as { role: string };

      const url = req.nextUrl.clone();
      url.pathname = `/dashboard/${decoded.role}`;
      return NextResponse.redirect(url);
    } catch {
      return NextResponse.next();
    }
  }

  // 2️⃣ Public routes (NO auth required)
  if (pathname === "/" || pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/user")) {
    return NextResponse.next();
  }

  if (!token) {
    return redirectToLogin(req);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { role: string };

    const allowedRoutes = ROLE_ROUTES[decoded.role];

    if (!allowedRoutes) {
      return redirectToLogin(req);
    }

    const hasAccess = allowedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!hasAccess) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  } catch {
    return redirectToLogin(req);
  }
}

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}
