"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { compareNormalized } from "@/lib/textUtils";

import SideFilter from "../side-filter";
import PropertySelect from "./property-select";
import GridProperty from "./grid-property";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

import { useProperties } from "@/hooks/propertyHooks";
import { PropertyWithImages } from "@/services/propertyService";
import {
    PROPERTY_TYPES,
    PROPERTY_TYPE_LABELS,
} from "@/constants/propertyConstants";

const formatCount = (
    value: number | null | undefined,
    singular: string,
    plural: string
) => {
    const count = value ?? 0;
    const label = count === 1 ? singular : plural;
    return `${count} ${label}`;
};

const capitalizeFirst = (value: string | null | undefined) => {
    const normalized = (value || "").toLowerCase();
    return normalized
        ? normalized.charAt(0).toUpperCase() + normalized.slice(1)
        : "";
};

interface GridOneProps {
    initialFilters?: {
        minPrice?: string;
        maxPrice?: string;
        propertyType?: string;
        status?: string;
        bedrooms?: string;
        location?: string;
    };
}

export default function GridOne({ initialFilters }: GridOneProps) {
    const [show, setShow] = useState<boolean>(false);

    // Filter states
    const [locationFilter, setLocationFilter] = useState<string>(
        initialFilters?.location || ""
    );
    const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>(
        initialFilters?.propertyType || ""
    );
    const [statusFilter, setStatusFilter] = useState<string>(
        initialFilters?.status || ""
    );
    const [bedroomsFilter, setBedroomsFilter] = useState<string>(
        initialFilters?.bedrooms || ""
    );
    const [minPrice, setMinPrice] = useState<number | "">(
        initialFilters?.minPrice ? Number(initialFilters.minPrice) : ""
    );
    const [maxPrice, setMaxPrice] = useState<number | "">(
        initialFilters?.maxPrice ? Number(initialFilters.maxPrice) : ""
    );
    const [searchText, setSearchText] = useState<string>("");
    const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(
        new Set()
    );

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const { data: properties, isLoading, error } = useProperties();

    // Transform database data to component format
    const transformedProperties = useMemo(() => {
        if (!properties) return [];

        return properties.map((property: PropertyWithImages) => {
            const address = `${property.street || ""} ${
                property.streetNumber || ""
            }, ${property.neighborhood || ""}, ${property.city || ""}, ${
                property.state || ""
            }`
                .replace(/,\s*,/g, ",")
                .replace(/^,|,$/g, "");

            const imageUrls = property.images?.map((img) => img.url) || [];

            const tag2 = property.status;

            const typeMap = PROPERTY_TYPE_LABELS;
            const typeLabel =
                typeMap[property.type as keyof typeof PROPERTY_TYPE_LABELS] ||
                property.type;
            const formattedType = capitalizeFirst(typeLabel);

            const hasPrice =
                typeof property.price === "number" &&
                !Number.isNaN(property.price);
            const formattedPrice = hasPrice
                ? property.price!.toLocaleString("pt-BR")
                : null;

            return {
                id: property.id,
                image: imageUrls,
                tag: [], // Can be enhanced later with verification status
                tag2,
                type: formattedType,
                name: property.title,
                loction: address,
                bathrooms: formatCount(
                    property.bathrooms,
                    "banheiro",
                    "banheiros"
                ),
                bedrooms: formatCount(
                    property.bedrooms,
                    "quarto",
                    "quartos"
                ),
                area: `${property.usableArea || 0} m²`,
                value: hasPrice
                    ? property.status === "FOR_RENT"
                        ? `R$ ${formattedPrice}/mês`
                        : `R$ ${formattedPrice}`
                    : "a combinar",
            };
        });
    }, [properties]);

    // Apply filters
    const filteredProperties = useMemo(() => {
        let filtered = transformedProperties;

        if (searchText) {
            filtered = filtered.filter(
                (item) =>
                    item.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    item.loction
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
            );
        }

        if (locationFilter) {
            filtered = filtered.filter((item) => {
                const property = properties?.find((p) => p.id === item.id);
                return compareNormalized(property?.city || "", locationFilter);
            });
        }

        if (propertyTypeFilter) {
            const typeMapReverse = Object.fromEntries(
                Object.entries(PROPERTY_TYPE_LABELS).map(([key, value]) => [
                    value,
                    key,
                ])
            );
            const dbType = typeMapReverse[propertyTypeFilter];
            if (dbType) {
                filtered = filtered.filter((item) => {
                    const property = properties?.find((p) => p.id === item.id);
                    return property?.type === dbType;
                });
            }
        }

        if (statusFilter) {
            const dbStatus = statusFilter === "venda" ? "FOR_SALE" : "FOR_RENT";
            filtered = filtered.filter((item) => {
                const property = properties?.find((p) => p.id === item.id);
                return property?.status === dbStatus;
            });
        }

        if (bedroomsFilter) {
            const bedroomsNum =
                bedroomsFilter === "06+"
                    ? 6
                    : parseInt(bedroomsFilter.replace(" Quartos", ""));
            filtered = filtered.filter((item) => {
                const property = properties?.find((p) => p.id === item.id);
                return (
                    property &&
                    property.bedrooms &&
                    property.bedrooms >= bedroomsNum
                );
            });
        }

        if (minPrice !== "" || maxPrice !== "") {
            filtered = filtered.filter((item) => {
                const property = properties?.find((p) => p.id === item.id);
                if (!property?.price) return false;

                const price = property.price;
                const min = minPrice === "" ? 0 : Number(minPrice);
                const max = maxPrice === "" ? 999999 : Number(maxPrice);

                return price >= min && price <= max;
            });
        }

        if (selectedAmenities.size > 0) {
            filtered = filtered.filter((item) => {
                const property = properties?.find((p) => p.id === item.id);
                if (!property) return false;

                // Check if property has all selected amenities
                const privateAmenities = Array.isArray(
                    property.privateAmenities
                )
                    ? (property.privateAmenities as string[])
                    : [];
                const commonAmenities = Array.isArray(property.commonAmenities)
                    ? (property.commonAmenities as string[])
                    : [];

                const propertyAmenities = new Set([
                    ...privateAmenities,
                    ...commonAmenities,
                ]);

                return Array.from(selectedAmenities).every((amenity) =>
                    propertyAmenities.has(amenity)
                );
            });
        }

        return filtered;
    }, [
        transformedProperties,
        searchText,
        locationFilter,
        propertyTypeFilter,
        statusFilter,
        bedroomsFilter,
        minPrice,
        maxPrice,
        selectedAmenities,
        properties,
    ]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchText,
        locationFilter,
        propertyTypeFilter,
        statusFilter,
        bedroomsFilter,
        minPrice,
        maxPrice,
        selectedAmenities,
    ]);

    // Pagination logic
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    // Render pagination
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];

        // Previous button
        pages.push(
            <li
                key="prev"
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            >
                <button
                    className="page-link"
                    onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    aria-label="Anterior"
                >
                    <i className="fa-solid fa-arrow-left-long"></i>
                    <span className="sr-only">Anterior</span>
                </button>
            </li>
        );

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li
                    key={i}
                    className={`page-item ${i === currentPage ? "active" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        // Next button
        pages.push(
            <li
                key="next"
                className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                }`}
            >
                <button
                    className="page-link"
                    onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    aria-label="Próximo"
                >
                    <i className="fa-solid fa-arrow-right-long"></i>
                    <span className="sr-only">Próximo</span>
                </button>
            </li>
        );

        return <ul className="pagination p-center">{pages}</ul>;
    };

    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center py-5">
                        <LoadingSpinner />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center py-5">
                        <p>
                            Erro ao carregar imóveis. Tente novamente mais
                            tarde.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="filter_search_opt">
                        <Link
                            href="#"
                            className="btn btn-dark full-width mb-4"
                            onClick={(e) => {
                                e.preventDefault();
                                setShow(!show);
                            }}
                        >
                            <span className="svg-icon text-light svg-icon-2hx me-2">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </span>
                            Abrir Opções de Filtro
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <SideFilter
                        show={show}
                        setShow={setShow}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        locationFilter={locationFilter}
                        setLocationFilter={setLocationFilter}
                        propertyTypeFilter={propertyTypeFilter}
                        setPropertyTypeFilter={setPropertyTypeFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        bedroomsFilter={bedroomsFilter}
                        setBedroomsFilter={setBedroomsFilter}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        selectedAmenities={selectedAmenities}
                        setSelectedAmenities={setSelectedAmenities}
                    />
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12">
                    <div className="row justify-content-center g-4">
                        {filteredProperties.length === 0 ? (
                            <div className="col-12 text-center py-5">
                                <p>Nenhum imóvel encontrado.</p>
                            </div>
                        ) : (
                            paginatedProperties.map((item, index) => {
                                return (
                                    <div
                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-12"
                                        key={item.id || index}
                                    >
                                        <GridProperty
                                            item={item}
                                            border={false}
                                        />
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            {renderPagination()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
