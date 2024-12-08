import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { orgname: string } }
) {
  try {
    console.log(params);
    const { orgname } = params;

    if (!orgname) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const getOrgLeaderboard = async (orgName: string) => {
      const leaderboard = await prisma.githubReviews1.groupBy({
        by: ["username"],
        where: {
          link: {
            contains: `/${orgName}/`,
          },
        },
        _sum: {
          score: true,
        },
        orderBy: {
          _sum: {
            score: "desc",
          },
        },
      });

      return leaderboard.map((entry, index) => ({
        username: entry.username,
        rank: index + 1,
        score: entry._sum.score || 0,
      }));
    };

    const leaderboard = await getOrgLeaderboard(orgname);
    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.error("Leaderboard retrieval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
