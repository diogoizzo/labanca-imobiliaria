import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const realtors = await prisma.realtor.findMany();
        return NextResponse.json(realtors);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch realtors" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    if (process.env.ALLOW_REALTOR_REGISTRATION_WITHOUT_AUTH !== "true") {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
    }

    try {
        const body = await request.json();
        const realtor = await prisma.realtor.create({
            data: body,
        });
        return NextResponse.json(realtor, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create realtor" },
            { status: 500 }
        );
    }
}
