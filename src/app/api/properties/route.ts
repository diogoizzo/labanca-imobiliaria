import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { diskStorage } from "multer";
import { join, extname, basename } from "path";
import { promises as fs } from "fs";
import crypto from "crypto";
import sharp from "sharp";
import { PropertyType } from "@prisma/client";

export const config = {
    api: {
        bodyParser: false,
        sizeLimit: "25mb",
    },
};

const storage = diskStorage({
    destination: async (req, file, cb) => {
        const id = crypto.randomUUID();
        const dir = join(process.cwd(), "public/uploads/properties", id);
        await fs.mkdir(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        const name = `${Date.now()}-${crypto.randomUUID()}${ext}`;
        cb(null, name);
    },
});

export async function GET(request: Request) {
    try {
        const properties = await prisma.property.findMany({
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
        // Parse form data
        const formData = await request.formData();
        const propertyData: Record<string, any> = {};

        // Process form data entries
        for (const [key, value] of formData.entries()) {
            if (key !== "images") {
                propertyData[key] = typeof value === "string" ? value : "";
            }
        }

        // Get images
        const images = formData.getAll("images");

        console.log(propertyData.type);

        // Create property
        const property = await prisma.property.create({
            data: {
                title: propertyData.title || "",
                status: propertyData.status || "FOR_SALE",
                type: validatePropertyType(propertyData.type) || "APARTMENT",
                price: parseFloat(propertyData.price) || 0,
                description: propertyData.description || "",
                referenceCode: propertyData.referenceCode || "",
                street: propertyData.street || "",
                streetNumber: propertyData.number || "",
                neighborhood: propertyData.neighborhood || "",
                city: propertyData.city || "",
                state: propertyData.state || "",
                zipCode: propertyData.zipCode || "",
                latitude:
                    propertyData.latitude &&
                    !isNaN(parseFloat(propertyData.latitude))
                        ? parseFloat(propertyData.latitude)
                        : null,
                longitude:
                    propertyData.longitude &&
                    !isNaN(parseFloat(propertyData.longitude))
                        ? parseFloat(propertyData.longitude)
                        : null,
                bedrooms: parseInt(propertyData.bedrooms) || 0,
                suites: parseInt(propertyData.suites) || 0,
                bathrooms: parseInt(propertyData.bathrooms) || 0,
                parkingSpaces: parseInt(propertyData.parkingSpaces) || 0,
                rooms: parseInt(propertyData.rooms) || 0,
                floor: parseInt(propertyData.floor) || 0,
                yearBuilt: parseInt(propertyData.yearBuilt) || 0,
                age: propertyData.age
                    ? String(parseInt(propertyData.age))
                    : "0",
                usableArea: parseFloat(propertyData.usableArea) || 0,
                totalArea: parseFloat(propertyData.totalArea) || 0,
                condoFee: parseFloat(propertyData.condoFee) || 0,
                iptu: parseFloat(propertyData.iptu) || 0,
                privateAmenities: propertyData.privateAmenities
                    ? JSON.parse(propertyData.privateAmenities)
                    : [],
                commonAmenities: propertyData.commonAmenities
                    ? JSON.parse(propertyData.commonAmenities)
                    : [],
                petsAllowed: propertyData.petsAllowed === "true",
                furnished: propertyData.furnished === "true",
                realtorId: session.user.id,
            },
        });

        // Process and save images
        if (images.length > 0) {
            const propertyDir = join(
                process.cwd(),
                "public/uploads/properties",
                property.id
            );
            await fs.mkdir(propertyDir, { recursive: true });

            const imagePromises = Array.from(images).map(
                async (image: any, index) => {
                    const buffer = Buffer.from(await image.arrayBuffer());
                    const metadata = await sharp(buffer).metadata();

                    const filename = `${Date.now()}-${crypto.randomUUID()}.${
                        metadata.format
                    }`;
                    const filepath = join(propertyDir, filename);

                    await sharp(buffer).toFile(filepath);

                    // Save image info to database
                    await prisma.propertyImage.create({
                        data: {
                            propertyId: property.id,
                            url: `/uploads/properties/${property.id}/${filename}`,
                            width: metadata.width,
                            height: metadata.height,
                            sortOrder: index,
                        },
                    });
                }
            );

            await Promise.all(imagePromises);
        }

        return NextResponse.json(property, { status: 201 });
    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json(
            { error: "Failed to create property" },
            { status: 500 }
        );
    }
}

function validateStatus(
    status: string | null
): "FOR_SALE" | "FOR_RENT" | undefined {
    if (status === "FOR_SALE" || status === "FOR_RENT") {
        return status;
    }
    return undefined;
}

function validatePropertyType(type: string | null): PropertyType | undefined {
    const validTypes = [
        "APARTMENT",
        "HOUSE",
        "STUDIO",
        "KITNET",
        "COMMERCIAL",
        "OFFICE",
        "WAREHOUSE",
        "LAND",
        "OTHER",
    ];
    return type && validTypes.includes(type)
        ? (type as PropertyType)
        : undefined;
}
