import React from "react";
import { PropertyWithImages } from "@/services/propertyService";
import { PROPERTY_TYPE_LABELS } from "@/constants/propertyConstants";
import GridProperty from "./grid-property";

interface GridPropertyOneProps {
    border: any;
    properties: PropertyWithImages[];
}

// Função auxiliar para transformar PropertyWithImages para o formato esperado pelo GridProperty
function formatCount(
    value: number | null | undefined,
    singular: string,
    plural: string
) {
    const count = value ?? 0;
    const label = count === 1 ? singular : plural;
    return `${count} ${label}`;
}

function capitalizeFirst(value: string | null | undefined) {
    const normalized = (value || "").toLowerCase();
    return normalized
        ? normalized.charAt(0).toUpperCase() + normalized.slice(1)
        : "";
}

function transformPropertyData(property: PropertyWithImages) {
    const imageUrls = property.images?.map((img) => img.url) || [];
    const location = `${property.street || ""} ${
        property.streetNumber || ""
    }, ${property.neighborhood || ""}, ${property.city || ""}, ${
        property.state || ""
    }`
        .replace(/^,?\s*,?\s*/, "")
        .trim();

    const typeLabel =
        PROPERTY_TYPE_LABELS[
            property.type as keyof typeof PROPERTY_TYPE_LABELS
        ] || property.type;
    const formattedType = capitalizeFirst(typeLabel);

    const hasPrice =
        typeof property.price === "number" && !Number.isNaN(property.price);
    const formattedPrice = hasPrice
        ? property.price!.toLocaleString("pt-BR")
        : null;

    return {
        id: property.id,
        image: imageUrls,
        tag: [], // pode ser preenchido conforme necessidade
        tag2: property.status,
        type: formattedType,
        name: property.title,
        loction: location || "Localização não informada",
        bathrooms: formatCount(property.bathrooms, "banheiro", "banheiros"),
        bedrooms: formatCount(property.bedrooms, "quarto", "quartos"),
        area: `${property.usableArea || 0} m²`,
        value: hasPrice
            ? property.status === "FOR_RENT"
                ? `R$ ${formattedPrice}/mês`
                : `R$ ${formattedPrice}`
            : "a combinar",
    };
}

export default function GridPropertyOne({
    border,
    properties,
}: GridPropertyOneProps) {
    const transformedProperties = properties.map(transformPropertyData);

    return (
        <div className="row justify-content-center g-4">
            {transformedProperties.map((item, index: number) => {
                return (
                    <div
                        className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
                        key={index}
                    >
                        <GridProperty item={item} border={border} />
                    </div>
                );
            })}
        </div>
    );
}
