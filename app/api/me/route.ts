import { getUserByToken } from "@/app/services/users";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { headers } = req;
  const rawToken = headers.get("authorization");

  if (!rawToken || !rawToken.startsWith("Bearer ")) {
    return NextResponse.json({ error: "token missing" }, { status: 401 });
  }

  const token = rawToken.slice(7);

  try {
    const user = await getUserByToken(token);

    if (!user) {
      return NextResponse.json({ error: "invalid token" }, { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
};
