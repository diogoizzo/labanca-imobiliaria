import { Property, PropertyImage } from "@prisma/client";

export type PropertyWithImages = {
    id: string;
    title: string;
    status: string;
    type: string;
    price: number;
    description?: string;
    bedrooms?: number;
    bathrooms?: number;
    suites?: number;
    parkingSpaces?: number;
    rooms?: number;
    floor?: number;
    yearBuilt?: number;
    usableArea?: number;
    totalArea?: number;
    condoFee?: number;
    iptu?: number;
    age?: string;
    referenceCode?: string;
    privateAmenities?: any;
    commonAmenities?: any;
    petsAllowed?: boolean;
    furnished?: boolean;
    images: {
        id: string;
        url: string;
        sortOrder?: number;
    }[];
    realtor: {
        id: string;
        fullName: string;
        phone?: string;
        email: string;
    };
    latitude?: number;
    longitude?: number;
    street?: string;
    streetNumber?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
};

// Helper: monta a base URL somente no server (no client continua vazio)
async function getBaseUrl(): Promise<string> {
    if (typeof window !== "undefined") return ""; // client: pode usar caminho relativo
    const { headers } = await import("next/headers");
    const h = await headers();
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (!host) throw new Error("Missing host header to build absolute URL");
    return `${proto}://${host}`;
}

export async function getAllProperties(): Promise<PropertyWithImages[]> {
    const base = await getBaseUrl();
    const response = await fetch(`${base}/api/properties`, {
        cache: "no-store",
        next: { tags: ["properties"] },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch properties");
    }

    return response.json();
}

export async function getProperty(id: string): Promise<PropertyWithImages> {
    const base = await getBaseUrl();
    const response = await fetch(`${base}/api/properties/${id}`, {
        cache: "no-store",
        next: { tags: ["property", id] },
    });

    if (response.status === 404) {
        const err: any = new Error("Not found");
        err.status = 404;
        throw err;
    }
    if (!response.ok) {
        throw new Error("Failed to fetch property");
    }

    return response.json();
}

export async function createProperty(data: FormData): Promise<Property> {
    const base = await getBaseUrl();
    const response = await fetch(`${base}/api/properties`, {
        method: "POST",
        body: data,
    });

    if (!response.ok) {
        throw new Error("Failed to create property");
    }

    return response.json();
}

export async function updateProperty(
    id: string,
    data: FormData
): Promise<Property> {
    const base = await getBaseUrl();
    const response = await fetch(`${base}/api/properties/${id}`, {
        method: "PUT",
        body: data,
    });

    if (!response.ok) {
        throw new Error("Failed to update property");
    }

    return response.json();
}

export async function deleteProperty(id: string): Promise<void> {
    const base = await getBaseUrl();
    const response = await fetch(`${base}/api/properties/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete property");
    }
}
