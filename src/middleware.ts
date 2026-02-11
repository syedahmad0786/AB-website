import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Vercel provides geo data via headers automatically
  const country = request.headers.get("x-vercel-ip-country") || "unknown";
  const city = request.headers.get("x-vercel-ip-city") || "unknown";
  const region = request.headers.get("x-vercel-ip-country-region") || "unknown";

  response.headers.set("x-visitor-country", country);
  response.headers.set("x-visitor-city", decodeURIComponent(city));
  response.headers.set("x-visitor-region", region);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|images/).*)"],
};
