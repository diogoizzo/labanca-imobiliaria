export const PROPERTY_TYPES = [
    "APARTMENT",
    "HOUSE",
    "STUDIO",
    "KITNET",
    "COMMERCIAL",
    "OFFICE",
    "WAREHOUSE",
    "LAND",
    "OTHER",
] as const;

export const PROPERTY_TYPE_LABELS = {
    APARTMENT: "Apartamento",
    HOUSE: "Casa",
    STUDIO: "Studio",
    KITNET: "Kitnet",
    COMMERCIAL: "Comercial",
    OFFICE: "Escritório",
    WAREHOUSE: "Galpão",
    LAND: "Terreno",
    OTHER: "Outro",
} as const;

export type PropertyTypeLabel =
    (typeof PROPERTY_TYPE_LABELS)[keyof typeof PROPERTY_TYPE_LABELS];

export const PRIVATE_AMENITIES = [
    "Varanda",
    "Área de serviço",
    "Piso porcelanato",
    "Piso laminado",
    "Aquecimento a gás",
    "Ar condicionado",
    "Armários embutidos",
    "Closet",
    "Cozinha planejada",
    "Conceito aberto",
    "Infra de ar cond.",
] as const;

export const COMMON_AMENITIES = [
    "Piscina",
    "Piscina infantil",
    "Salão de festas",
    "Salão de jogos",
    "Churrasqueira",
    "Espaço gourmet",
    "Academia",
    "Brinquedoteca",
    "Playground",
    "Quadra de esporte",
    "Coworking",
    "Bicicletário",
    "Lavanderia compartilhada",
    "Portaria 24h",
    "Portão eletrônico",
    "Interfone",
    "Elevador",
    "Elevador de serviço",
    "Jardim",
    "Hall decorado",
    "Acesso PNE",
    "Sistema de câmeras",
    "Pet place",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type PrivateAmenity = (typeof PRIVATE_AMENITIES)[number];
export type CommonAmenity = (typeof COMMON_AMENITIES)[number];
