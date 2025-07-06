import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const property = await prisma.property.findUnique({
            where: { id: params.id },
        });

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(property);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch property" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const property = await prisma.property.findUnique({
            where: { id: params.id },
        });

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        if (property.realtorId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await request.json();
        const updatedProperty = await prisma.property.update({
            where: { id: params.id },
            data: body,
        });

        return NextResponse.json(updatedProperty);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update property" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const property = await prisma.property.findUnique({
            where: { id: params.id },
        });

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        if (property.realtorId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.property.delete({
            where: { id: params.id },
        });

        return NextResponse.json(
            { message: "Property deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete property" },
            { status: 500 }
        );
    }
}
