import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const properties = await prisma.property.findMany({
            take: 6,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                images: {
                    orderBy: {
                        sortOrder: "asc",
                    },
                },
            },
        });

        return NextResponse.json(properties);
    } catch (error) {
        console.error("Error fetching recent properties:", error);
        return NextResponse.json(
            { error: "Failed to fetch recent properties" },
            { status: 500 }
        );
    }
}
