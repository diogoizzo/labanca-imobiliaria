import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const realtor = await prisma.realtor.findUnique({
            where: { id: params.id },
        });

        if (!realtor) {
            return NextResponse.json(
                { error: "Realtor not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(realtor);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch realtor" },
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
        const realtor = await prisma.realtor.findUnique({
            where: { id: params.id },
        });

        if (!realtor) {
            return NextResponse.json(
                { error: "Realtor not found" },
                { status: 404 }
            );
        }

        const body = await request.json();
        const updatedRealtor = await prisma.realtor.update({
            where: { id: params.id },
            data: body,
        });

        return NextResponse.json(updatedRealtor);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update realtor" },
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
        const realtor = await prisma.realtor.findUnique({
            where: { id: params.id },
        });

        if (!realtor) {
            return NextResponse.json(
                { error: "Realtor not found" },
                { status: 404 }
            );
        }

        await prisma.realtor.delete({
            where: { id: params.id },
        });

        return NextResponse.json(
            { message: "Realtor deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete realtor" },
            { status: 500 }
        );
    }
}
