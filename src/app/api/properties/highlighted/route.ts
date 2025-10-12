import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");

    if (!propertyId) {
        return NextResponse.json(
            { error: "propertyId query parameter is required" },
            { status: 400 }
        );
    }

    try {
        const baseProperty = await prisma.property.findUnique({
            where: { id: propertyId },
            select: {
                id: true,
                status: true,
                city: true,
                state: true,
                neighborhood: true,
            },
        });

        if (!baseProperty) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        const filters: Prisma.PropertyWhereInput = {
            status: baseProperty.status,
            id: { not: propertyId },
        };

        if (baseProperty.state) {
            filters.state = baseProperty.state;
        }

        if (baseProperty.city) {
            filters.city = baseProperty.city;
        }

        if (baseProperty.neighborhood) {
            filters.neighborhood = baseProperty.neighborhood;
        }

        const highlightedProperties = await prisma.property.findMany({
            where: filters,
            include: {
                images: {
                    orderBy: {
                        sortOrder: "asc",
                    },
                    take: 1,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 4,
        });

        return NextResponse.json(highlightedProperties);
    } catch (error) {
        console.error("Error fetching highlighted properties:", error);
        return NextResponse.json(
            { error: "Failed to fetch highlighted properties" },
            { status: 500 }
        );
    }
}
