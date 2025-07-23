import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

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
        console.log("Received data:", body);
        // Validação básica dos campos obrigatórios
        if (!body.fullName || !body.email || !body.password) {
            return NextResponse.json(
                { error: "Nome completo, email e senha são obrigatórios" },
                { status: 400 }
            );
        }

        // Verifica se o email já existe
        const existingRealtor = await prisma.realtor.findUnique({
            where: { email: body.email },
        });

        if (existingRealtor) {
            return NextResponse.json(
                { error: "Email já cadastrado" },
                { status: 409 }
            );
        }

        // Hasheia a senha antes de salvar
        const hashedPassword = await bcrypt.hash(body.password, 12);

        const { confirmPassword, ...userData } = body;

        // Cria o corretor com a senha hasheada
        const realtor = await prisma.realtor.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });

        // Remove a senha da resposta
        const { password, ...realtorWithoutPassword } = realtor;

        return NextResponse.json(realtorWithoutPassword, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar corretor:", error);
        return NextResponse.json(
            { error: "Falha ao criar corretor" },
            { status: 500 }
        );
    }
}
