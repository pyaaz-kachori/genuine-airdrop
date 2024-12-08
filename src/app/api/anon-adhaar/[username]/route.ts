import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    // Validate username
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Find AnonAadhaar mapping by username
    const anonAadhaar = await prisma.anonAadhaar.findFirst({
      where: {
        username: username,
      },
    });

    if (!anonAadhaar) {
      return NextResponse.json(
        { message: "AnonAadhaar mapping not found" },
        { status: 200 }
      );
    }

    return NextResponse.json(anonAadhaar, { status: 200 });
  } catch (error) {
    console.error("Error fetching AnonAadhaar mapping:", error);
    return NextResponse.json(
      { error: "Failed to fetch AnonAadhaar mapping" },
      { status: 500 }
    );
  }
}
