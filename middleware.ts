import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách các routes hợp lệ
const validRoutes = ["/", "/multiple", "/flashcard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua các static files và API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    return NextResponse.next();
  }

  // Kiểm tra nếu route không hợp lệ
  if (!validRoutes.includes(pathname)) {
    // Redirect về /multiple nếu route không hợp lệ
    const url = request.nextUrl.clone();
    url.pathname = "/multiple";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Cấu hình middleware chỉ chạy trên các routes cụ thể
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
