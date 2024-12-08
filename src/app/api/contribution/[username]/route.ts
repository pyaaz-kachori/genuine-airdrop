import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    console.log(params);
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const contributions = await prisma.githubReviews.findMany({
      where: {
        username: username,
      },
    });

    if (!contributions) {
      return NextResponse.json(
        { message: "User has no contributions" },
        { status: 200 }
      );
    }

    return NextResponse.json(contributions, { status: 200 });
  } catch (error) {
    console.error("Leaderboard retrieval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
