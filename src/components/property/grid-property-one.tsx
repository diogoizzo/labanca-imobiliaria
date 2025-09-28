import React from "react";
import { PropertyWithImages } from "@/services/propertyService";
import GridProperty from "./grid-property";

interface GridPropertyOneProps {
    border: any;
    properties: PropertyWithImages[];
}

// Função auxiliar para transformar PropertyWithImages para o formato esperado pelo GridProperty
function transformPropertyData(property: PropertyWithImages) {
    const imageUrls = property.images?.map((img) => img.url) || [];
    const location = `${property.street || ""} ${
        property.streetNumber || ""
    }, ${property.neighborhood || ""}, ${property.city || ""}, ${
        property.state || ""
    }`
        .replace(/^,?\s*,?\s*/, "")
        .trim();

    return {
        id: property.id,
        image: imageUrls,
        tag: [], // pode ser preenchido conforme necessidade
        tag2: property.status === "FOR_SALE" ? "For Sell" : "For Rent",
        type: property.type,
        name: property.title,
        loction: location || "Localização não informada",
        size: `${property.bedrooms || 0} Quartos`,
        beds: `${property.bedrooms || 0} Camas`,
        sqft: `${property.usableArea || 0} m²`,
        value:
            property.status === "FOR_SALE"
                ? `R$ ${property.price?.toLocaleString("pt-BR") || "0"}`
                : `R$ ${property.price?.toLocaleString("pt-BR") || "0"}/mês`,
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
