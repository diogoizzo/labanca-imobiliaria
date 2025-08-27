"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";

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

export default function GridOne() {
    const [show, setShow] = useState<boolean>(false);

    // Filter states
    const [locationFilter, setLocationFilter] = useState<string>("");
    const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>("");
    const [bedroomsFilter, setBedroomsFilter] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");
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

            const imageUrls = property.images.map((img) => img.url);

            let tag2 = "";
            if (property.status === "FOR_SALE") {
                tag2 = "For Sell";
            } else if (property.status === "FOR_RENT") {
                tag2 = "For Rent";
            }

            const typeMap = PROPERTY_TYPE_LABELS;

            return {
                id: property.id,
                image: imageUrls,
                tag: [], // Can be enhanced later with verification status
                tag2,
                type: typeMap[property.type] || property.type,
                name: property.title,
                loction: address,
                size: `${property.bedrooms || 0} Quartos`,
                beds: `${property.bedrooms || 0} Camas`,
                sqft: `${property.usableArea || 0} m²`,
                value:
                    property.status === "FOR_RENT"
                        ? `R$ ${property.price?.toLocaleString("pt-BR")}/mês`
                        : `R$ ${property.price?.toLocaleString("pt-BR")}`,
                baths: `${property.bathrooms || 0} Banheiros`,
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

        if (locationFilter && locationFilter !== "Barra do Piraí") {
            filtered = filtered.filter((item) =>
                item.loction
                    .toLowerCase()
                    .includes(locationFilter.toLowerCase())
            );
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
                    {/* <div className="row justify-content-center">
                        <div className="col-lg-12 col-md-12">
                            <div className="item-shorting-box">
                                <div className="item-shorting clearfix">
                                    <div className="left-column pull-left">
                                        <h4 className="fs-6 m-0">
                                            Exibindo 1-10 de 142 Resultados
                                        </h4>
                                    </div>
                                </div>
                                <div className="item-shorting-box-right">
                                    <div className="shorting-by">
                                        <PropertySelect />
                                    </div>
                                    <ul className="shorting-list">
                                        <li>
                                            <Link
                                                href="/grid-layout-with-sidebar"
                                                className="active w-12 h-12"
                                            >
                                                <span className="svg-icon text-seegreen svg-icon-2hx">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="2"
                                                            y="2"
                                                            width="9"
                                                            height="9"
                                                            rx="2"
                                                            fill="currentColor"
                                                        />
                                                        <rect
                                                            opacity="0.3"
                                                            x="13"
                                                            y="2"
                                                            width="9"
                                                            height="9"
                                                            rx="2"
                                                            fill="currentColor"
                                                        />
                                                        <rect
                                                            opacity="0.3"
                                                            x="13"
                                                            y="13"
                                                            width="9"
                                                            height="9"
                                                            rx="2"
                                                            fill="currentColor"
                                                        />
                                                        <rect
                                                            opacity="0.3"
                                                            x="2"
                                                            y="13"
                                                            width="9"
                                                            height="9"
                                                            rx="2"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/list-layout-with-sidebar"
                                                className="w-12 h-12"
                                            >
                                                <span className="svg-icon text-muted-2 svg-icon-2hx">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.3"
                                                            d="M14 10V20C14 20.6 13.6 21 13 21H10C9.4 21 9 20.6 9 20V10C9 9.4 9.4 9 10 9H13C13.6 9 14 9.4 14 10ZM20 9H17C16.4 9 16 9.4 16 10V20C16 20.6 16.4 21 17 21H20C20.6 21 21 20.6 21 20V10C21 9.4 20.6 9 20 9Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M7 10V20C7 20.6 6.6 21 6 21H3C2.4 21 2 20.6 2 20V10C2 9.4 2.4 9 3 9H6C6.6 9 7 9.4 7 10ZM21 6V3C21 2.4 20.6 2 20 2H3C2.4 2 2 2.4 2 3V6C2 6.6 2.4 7 3 7H20C20.6 7 21 6.6 21 6Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}

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
