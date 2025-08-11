// src/schemas/propertySchema.ts
import { z } from "zod";
import {
    PROPERTY_TYPES,
    PRIVATE_AMENITIES,
    COMMON_AMENITIES,
} from "@/constants/propertyConstants";

/** Imagem de propriedade */
const imageSchema = z.object({
    id: z.string().optional(),
    url: z.string(),
    width: z.coerce.number().nullable().optional(),
    height: z.coerce.number().nullable().optional(),
    sortOrder: z.coerce.number().int().default(0).optional(),
});

/** Lista de imagens opcional */
const imagesSchema = z.array(imageSchema).optional().default([]);

/** Campos de string que podem vir null/undefined do BD */
const nullishStr = z
    .string()
    .nullish()
    .transform((v) => v ?? "");

/** Schema principal */
export const propertySchema = z.object({
    id: z.string().optional(),

    // Dados Gerais
    title: z.string().min(1, "Título é obrigatório"),
    status: z.enum(["FOR_RENT", "FOR_SALE"], {
        message: "Status é obrigatório",
    }),
    type: z.enum(PROPERTY_TYPES, { message: "Tipo de imóvel é obrigatório" }),
    price: z.coerce.number().min(0, "Preço deve ser maior ou igual a zero"),

    description: nullishStr,
    referenceCode: nullishStr,

    // Localização
    street: nullishStr,
    number: nullishStr,
    neighborhood: nullishStr,
    city: nullishStr,
    state: nullishStr,
    zipCode: nullishStr,
    latitude: nullishStr,
    longitude: nullishStr,

    // Características (coagir números; vazio -> 0)
    bedrooms: z.coerce.number().int().min(0).optional(),
    suites: z.coerce.number().int().min(0).optional(),
    bathrooms: z.coerce.number().int().min(0).optional(),
    parkingSpaces: z.coerce.number().int().min(0).optional(),
    rooms: z.coerce.number().int().min(0).optional(),
    floor: z.coerce.number().int().min(0).optional(),
    yearBuilt: z.coerce.number().int().min(0).optional(),

    // age é string no backend/BD
    age: nullishStr,

    usableArea: z.coerce.number().min(0).optional(),
    totalArea: z.coerce.number().min(0).optional(),
    condoFee: z.coerce.number().min(0).optional(),
    iptu: z.coerce.number().min(0).optional(),

    // Amenidades & Fotos
    privateAmenities: z.array(z.enum(PRIVATE_AMENITIES)).default([]),
    commonAmenities: z.array(z.enum(COMMON_AMENITIES)).default([]),
    petsAllowed: z.boolean().default(false),
    furnished: z.boolean().default(false),
    images: imagesSchema,
});

// Types
export type PropertyFormValues = z.infer<typeof propertySchema>;
export type PropertyFormInput = z.input<typeof propertySchema>;
