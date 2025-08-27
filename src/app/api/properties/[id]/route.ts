import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { diskStorage } from "multer";
import { join, extname } from "path";
import { promises as fs } from "fs";
import crypto from "crypto";
import sharp from "sharp";

// (Mantido - não é utilizado diretamente aqui, mas deixei para preservar estrutura/compat)
const storage = diskStorage({
    destination: async (req: any, file: any, cb: any) => {
        const { id } = await req.params;
        const dir = join(process.cwd(), "public/uploads/properties", id);
        await fs.mkdir(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req: any, file: any, cb: any) => {
        const ext = extname(file.originalname);
        const name = `${Date.now()}-${crypto.randomUUID()}${ext}`;
        cb(null, name);
    },
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                images: {
                    orderBy: { sortOrder: "asc" },
                },
                realtor: true,
            },
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
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const property = await prisma.property.findUnique({
            where: { id },
            select: { id: true, realtorId: true },
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

        // ------- Parse do FormData -------
        const formData = await request.formData();
        const propertyData: Record<string, any> = {};

        for (const [key, value] of formData.entries()) {
            // Tudo que não for arquivo vira string (ou "")
            if (key !== "images" && key !== "removedImages") {
                propertyData[key] = typeof value === "string" ? value : "";
            }
        }

        // Arrays vindos como JSON (do seu front)
        const privateAmenities = propertyData.privateAmenities
            ? JSON.parse(propertyData.privateAmenities)
            : [];
        const commonAmenities = propertyData.commonAmenities
            ? JSON.parse(propertyData.commonAmenities)
            : [];

        // Remoções (IDs)
        const removedImages = formData.getAll("removedImages") as string[];

        // Arquivos novos
        const files = formData.getAll("images") as unknown as File[];

        // ------- Atualiza campos primários -------
        const updatedProperty = await prisma.property.update({
            where: { id },
            data: {
                title: propertyData.title,
                status: propertyData.status,
                type: propertyData.type,

                price: propertyData.price ? parseFloat(propertyData.price) : 0,
                description: propertyData.description || null,
                referenceCode: propertyData.referenceCode || null,

                street: propertyData.street || null,
                streetNumber: propertyData.number || null,
                neighborhood: propertyData.neighborhood || null,
                city: propertyData.city || null,
                state: propertyData.state || null,
                zipCode: propertyData.zipCode || null,

                latitude:
                    propertyData.latitude && propertyData.latitude.trim() !== ""
                        ? parseFloat(propertyData.latitude)
                        : null,
                longitude:
                    propertyData.longitude &&
                    propertyData.longitude.trim() !== ""
                        ? parseFloat(propertyData.longitude)
                        : null,

                bedrooms:
                    propertyData.bedrooms && propertyData.bedrooms !== ""
                        ? parseInt(propertyData.bedrooms, 10)
                        : 0,
                suites:
                    propertyData.suites && propertyData.suites !== ""
                        ? parseInt(propertyData.suites, 10)
                        : 0,
                bathrooms:
                    propertyData.bathrooms && propertyData.bathrooms !== ""
                        ? parseInt(propertyData.bathrooms, 10)
                        : 0,
                parkingSpaces:
                    propertyData.parkingSpaces &&
                    propertyData.parkingSpaces !== ""
                        ? parseInt(propertyData.parkingSpaces, 10)
                        : 0,
                rooms:
                    propertyData.rooms && propertyData.rooms !== ""
                        ? parseInt(propertyData.rooms, 10)
                        : 0,
                floor:
                    propertyData.floor && propertyData.floor !== ""
                        ? parseInt(propertyData.floor, 10)
                        : 0,
                yearBuilt:
                    propertyData.yearBuilt && propertyData.yearBuilt !== ""
                        ? parseInt(propertyData.yearBuilt, 10)
                        : 0,

                // age é STRING no seu banco -> não parsear
                age:
                    typeof propertyData.age === "string" &&
                    propertyData.age.trim() !== ""
                        ? propertyData.age
                        : null,

                usableArea:
                    propertyData.usableArea && propertyData.usableArea !== ""
                        ? parseFloat(propertyData.usableArea)
                        : 0,
                totalArea:
                    propertyData.totalArea && propertyData.totalArea !== ""
                        ? parseFloat(propertyData.totalArea)
                        : 0,
                condoFee:
                    propertyData.condoFee && propertyData.condoFee !== ""
                        ? parseFloat(propertyData.condoFee)
                        : 0,
                iptu:
                    propertyData.iptu && propertyData.iptu !== ""
                        ? parseFloat(propertyData.iptu)
                        : 0,

                privateAmenities,
                commonAmenities,
                petsAllowed: propertyData.petsAllowed === "true",
                furnished: propertyData.furnished === "true",
            },
        });

        // ------- Remover imagens solicitadas -------
        if (removedImages.length > 0) {
            // Buscar URLs para excluir os arquivos do disco
            const imgsToDelete = await prisma.propertyImage.findMany({
                where: { id: { in: removedImages }, propertyId: id },
                select: { id: true, url: true },
            });

            // Deleta do banco primeiro (consistente com seu DELETE)
            await prisma.propertyImage.deleteMany({
                where: { id: { in: removedImages }, propertyId: id },
            });

            // Tenta remover arquivos do disco
            for (const img of imgsToDelete) {
                try {
                    if (!img.url.includes("..") && !img.url.includes("\\")) {
                        const filePath = join(process.cwd(), "public", img.url);
                        // Verifica se existe e tem permissão de escrita
                        await fs.access(filePath);
                        await fs.unlink(filePath);
                    }
                } catch (e) {
                    // Se falhar, apenas loga (não queremos quebrar a atualização inteira)
                    console.warn(
                        "Falha ao remover arquivo de imagem:",
                        img.url,
                        e
                    );
                }
            }
        }

        // ------- Salvar novas imagens (se houver) -------
        if (files && files.length > 0) {
            const propertyDir = join(
                process.cwd(),
                "public/uploads/properties",
                id
            );
            await fs.mkdir(propertyDir, { recursive: true });

            // Qual o próximo sortOrder? (para não resetar)
            const lastOrder = await prisma.propertyImage.findFirst({
                where: { propertyId: id },
                orderBy: { sortOrder: "desc" },
                select: { sortOrder: true },
            });
            let nextOrder = lastOrder?.sortOrder ?? -1;

            const imagePromises = files.map(async (file) => {
                const buffer = Buffer.from(await file.arrayBuffer());
                const metadata = await sharp(buffer).metadata();
                const ext = metadata.format ? `.${metadata.format}` : ".jpg";
                const filename = `${Date.now()}-${crypto.randomUUID()}${ext}`;
                const filepath = join(propertyDir, filename);

                await sharp(buffer).toFile(filepath);

                nextOrder += 1;

                await prisma.propertyImage.create({
                    data: {
                        propertyId: id,
                        url: `/uploads/properties/${id}/${filename}`,
                        width: metadata.width ?? null,
                        height: metadata.height ?? null,
                        sortOrder: nextOrder,
                    },
                });
            });

            await Promise.all(imagePromises);
        }

        return NextResponse.json(updatedProperty);
    } catch (error) {
        console.error("Error updating property:", error);
        return NextResponse.json(
            { error: "Failed to update property" },
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
        // Validar permissão do usuário ANTES de iniciar a transação
        const property = await prisma.property.findUnique({
            where: { id },
            select: { id: true, realtorId: true },
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

        // Obter todas as imagens antes da exclusão
        const images = await prisma.propertyImage.findMany({
            where: { propertyId: id },
            select: { url: true },
        });

        // Validar e normalizar caminhos das imagens
        const imagePaths = images.map((image) => {
            if (image.url.includes("..") || image.url.includes("\\")) {
                throw new Error(
                    `Caminho de arquivo inválido detectado: ${image.url}`
                );
            }
            return join(process.cwd(), "public", image.url);
        });

        // Verificar existência/permissões do diretório da propriedade
        const propertyDir = join(
            process.cwd(),
            "public/uploads/properties",
            id
        );
        try {
            await fs.access(propertyDir);
        } catch (error) {
            // Diretório já pode ter sido excluído ou não existe
            console.log(
                `Diretório da propriedade ${id} não encontrado ou sem acesso:`,
                error
            );
        }

        // Executar transação atômica para exclusão do banco de dados
        await prisma.$transaction(async (prismaTx) => {
            await prismaTx.propertyImage.deleteMany({
                where: { propertyId: id },
            });
            await prismaTx.property.delete({ where: { id } });
        });

        // Tentar excluir fisicamente as imagens do sistema de arquivos
        const failedDeletions: string[] = [];

        for (const imagePath of imagePaths) {
            try {
                await fs.access(imagePath, fs.constants.W_OK);
                await fs.unlink(imagePath);
            } catch (error) {
                console.error(`Falha ao excluir imagem ${imagePath}:`, error);
                failedDeletions.push(imagePath);
            }
        }

        // Tentar excluir o diretório da propriedade
        try {
            const dirStats = await fs.stat(propertyDir);
            if (dirStats.isDirectory()) {
                await fs.access(propertyDir, fs.constants.W_OK);
                await fs.rm(propertyDir, { recursive: true });
            }
        } catch (error: any) {
            if (error?.code !== "ENOENT") {
                console.error(
                    `Erro ao excluir diretório da propriedade ${propertyDir}:`,
                    error
                );
                if (error?.code !== "EPERM") {
                    console.warn(
                        `Diretório ${propertyDir} precisa de limpeza posterior.`
                    );
                }
            }
        }

        return NextResponse.json(
            {
                message: "Property deleted successfully",
                failedDeletions: failedDeletions.length,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Erro na exclusão do imóvel:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Failed to delete property", details: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Failed to delete property" },
            { status: 500 }
        );
    }
}
