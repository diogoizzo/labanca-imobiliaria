import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const realtor = await prisma.realtor.findUnique({
            where: { id },
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
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const realtor = await prisma.realtor.findUnique({
            where: { id },
        });

        if (!realtor) {
            return NextResponse.json(
                { error: "Realtor not found" },
                { status: 404 }
            );
        }

        const body = await request.json();
        const updatedRealtor = await prisma.realtor.update({
            where: { id },
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
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const realtor = await prisma.realtor.findUnique({
            where: { id },
        });

        if (!realtor) {
            return NextResponse.json(
                { error: "Realtor not found" },
                { status: 404 }
            );
        }

        await prisma.realtor.delete({
            where: { id },
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

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    try {
        const realtor = await prisma.realtor.findUnique({
            where: { id },
        });

        if (!realtor) {
            return NextResponse.json(
                { success: false, message: "Realtor not found" },
                { status: 404 }
            );
        }

        const { oldPassword, newPassword } = await request.json();

        // Verificar se as senhas foram fornecidas
        if (!oldPassword || !newPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Old password and new password are required",
                },
                { status: 400 }
            );
        }

        // Comparar senha antiga
        const isOldPasswordValid = await bcrypt.compare(
            oldPassword,
            realtor.password
        );
        if (!isOldPasswordValid) {
            return NextResponse.json(
                { success: false, message: "Old password is incorrect" },
                { status: 400 }
            );
        }

        // Validar nova senha
        if (newPassword.length < 8) {
            return NextResponse.json(
                {
                    success: false,
                    message: "New password must be at least 8 characters long",
                },
                { status: 400 }
            );
        }

        if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "New password must contain letters and numbers",
                },
                { status: 400 }
            );
        }

        // Gerar novo hash
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Atualizar senha no banco
        await prisma.realtor.update({
            where: { id },
            data: { password: hashedPassword },
        });

        return NextResponse.json(
            { success: true, message: "Password updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to update password" },
            { status: 500 }
        );
    }
}
