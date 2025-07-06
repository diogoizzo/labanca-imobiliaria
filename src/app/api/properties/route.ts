import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Build filter object from query parameters
    const filters = {
        status: searchParams.get("status") || undefined,
        type: searchParams.get("type") || undefined,
        price: {
            gte: searchParams.get("minPrice")
                ? Number(searchParams.get("minPrice"))
                : undefined,
            lte: searchParams.get("maxPrice")
                ? Number(searchParams.get("maxPrice"))
                : undefined,
        },
        bedrooms: searchParams.get("bedrooms")
            ? Number(searchParams.get("bedrooms"))
            : undefined,
        bathrooms: searchParams.get("bathrooms")
            ? Number(searchParams.get("bathrooms"))
            : undefined,
        city: searchParams.get("city") || undefined,
        state: searchParams.get("state") || undefined,
    };

    try {
        const properties = await prisma.property.findMany({
            where: filters,
        });
        return NextResponse.json(properties);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch properties" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const property = await prisma.property.create({
            data: {
                ...body,
                realtorId: session.user.id,
            },
        });
        return NextResponse.json(property, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create property" },
            { status: 500 }
        );
    }
}
