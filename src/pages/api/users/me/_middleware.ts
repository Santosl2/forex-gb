import jwtDecode from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { headers } = req;
  const authHeader = headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json("Unauthorized");
  }

  const [, token] = authHeader.split(" ");

  try {
    jwtDecode(token);

    return NextResponse.next();
  } catch {
    return NextResponse.json("Unauthorized");
  }
}
