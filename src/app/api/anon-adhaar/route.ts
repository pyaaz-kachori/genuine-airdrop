import { prisma } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, anonAadhaarId } = body;

    // Validate required fields
    if (!username || !anonAadhaarId) {
      return NextResponse.json(
        { error: "Username and anonAadhaarId are required" },
        { status: 400 }
      );
    }

    // Create new AnonAadhaar mapping
    const anonAadhaar = await prisma.anonAadhaar.create({
      data: {
        username,
        anonAadhaarId,
      },
    });

    return NextResponse.json(anonAadhaar, { status: 201 });
  } catch (error) {
    console.error("Error creating AnonAadhaar mapping:", error);
    return NextResponse.json(
      { error: "Failed to create AnonAadhaar mapping" },
      { status: 500 }
    );
  }
}
