"use client";
import Link from "next/link";
import React, { useState } from "react";
import { normalizeText } from "@/lib/textUtils";
import {
    PROPERTY_TYPES,
    PROPERTY_TYPE_LABELS,
    PRIVATE_AMENITIES,
    COMMON_AMENITIES,
} from "@/constants/propertyConstants";

export default function SideFilter({
    show,
    setShow,
    searchText,
    setSearchText,
    locationFilter,
    setLocationFilter,
    propertyTypeFilter,
    setPropertyTypeFilter,
    statusFilter,
    setStatusFilter,
    bedroomsFilter,
    setBedroomsFilter,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    selectedAmenities,
    setSelectedAmenities,
}: {
    show: any;
    setShow: any;
    searchText: string;
    setSearchText: (value: string) => void;
    locationFilter: string;
    setLocationFilter: (value: string) => void;
    propertyTypeFilter: string;
    setPropertyTypeFilter: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    bedroomsFilter: string;
    setBedroomsFilter: (value: string) => void;
    minPrice: number | "";
    maxPrice: number | "";
    setMinPrice: (value: number | "") => void;
    setMaxPrice: (value: number | "") => void;
    selectedAmenities: Set<string>;
    setSelectedAmenities: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
    let [open, setOpen] = useState<boolean>(false);
    let [open2, setOpen2] = useState<boolean>(false);
    let [open3, setOpen3] = useState<boolean>(false);
    let [open4, setOpen4] = useState<boolean>(false);
    let [open5, setOpen5] = useState<boolean>(false);
    let [open6, setOpen6] = useState<boolean>(false);

    const handleAmenityToggle = (amenity: string) => {
        setSelectedAmenities((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(amenity)) {
                newSet.delete(amenity);
            } else {
                newSet.add(amenity);
            }
            return newSet;
        });
    };

    const getDisplayLocation = (location: string) => {
        const displayMap: { [key: string]: string } = {
            "BARRA DO PIRAI": "Barra do Piraí",
            VALENÇA: "Valença",
            VASSOURAS: "Vassouras",
            "VOLTA REDONDA": "Volta Redonda",
            PINHEIRAL: "Pinheiral",
            PIRAI: "Piraí",
            "RIO DAS FLORES": "Rio das Flores",
            MENDES: "Mendes",
            "MIGUEL PEREIRA": "Miguel Pereira",
        };
        return displayMap[location] || location;
    };
    return (
        <div
            className={`simple-sidebar sm-sidebar ${show ? "d-block" : ""}`}
            id="filter_search"
            style={{ left: "0" }}
        >
            <div className="search-sidebar_header">
                <h4 className="ssh_heading">Filtros</h4>
                <button
                    className="w3-bar-item w3-button w3-large"
                    onClick={() => setShow(false)}
                >
                    <i className="fa-regular fa-circle-xmark fs-5 text-muted-2"></i>
                </button>
            </div>

            <div className="sidebar-widgets">
                <div className="search-inner p-0">
                    <div className="filter-search-box">
                        <div className="form-group">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control rounded-3 ps-5"
                                    placeholder="Buscar por nome do imóvel…"
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />
                                <div className="position-absolute top-50 start-0 translate-middle-y ms-2">
                                    <span className="svg-icon text-primary svg-icon-2hx">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                opacity="0.5"
                                                x="17.0365"
                                                y="15.1223"
                                                width="8.15546"
                                                height="2"
                                                rx="1"
                                                transform="rotate(45 17.0365 15.1223)"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="filter_wraps">
                        <div className="single_search_boxed">
                            <div className="widget-boxed-header">
                                <h4>
                                    <Link
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpen6(!open6);
                                        }}
                                        className={open6 ? "" : "collapsed"}
                                    >
                                        Status
                                        <span className="selected">
                                            {statusFilter === "venda"
                                                ? "Venda"
                                                : statusFilter === "alugar"
                                                ? "Aluguel"
                                                : "Todos"}
                                        </span>
                                    </Link>
                                </h4>
                            </div>
                            <div
                                className={`widget-boxed-body collapse ${
                                    open6 ? "show" : ""
                                }`}
                                id="status"
                            >
                                <div className="side-list no-border">
                                    <div className="single_filter_card">
                                        <div className="card-body pt-0">
                                            <div className="inner_widget_link">
                                                <ul className="no-ul-list filter-list">
                                                    <li className="form-check">
                                                        <input
                                                            id="status-all"
                                                            className="form-check-input"
                                                            name="status"
                                                            type="radio"
                                                            checked={
                                                                !statusFilter
                                                            }
                                                            onChange={() =>
                                                                setStatusFilter(
                                                                    ""
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="status-all"
                                                            className="form-check-label"
                                                        >
                                                            Todos
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="status-venda"
                                                            className="form-check-input"
                                                            name="status"
                                                            type="radio"
                                                            checked={
                                                                statusFilter ===
                                                                "venda"
                                                            }
                                                            onChange={() =>
                                                                setStatusFilter(
                                                                    "venda"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="status-venda"
                                                            className="form-check-label"
                                                        >
                                                            Venda
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="status-alugar"
                                                            className="form-check-input"
                                                            name="status"
                                                            type="radio"
                                                            checked={
                                                                statusFilter ===
                                                                "alugar"
                                                            }
                                                            onChange={() =>
                                                                setStatusFilter(
                                                                    "alugar"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="status-alugar"
                                                            className="form-check-label"
                                                        >
                                                            Aluguel
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single_search_boxed">
                            <div className="widget-boxed-header">
                                <h4>
                                    <Link
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpen(!open);
                                        }}
                                        className={open ? "" : "collapsed"}
                                    >
                                        Onde
                                        <span className="selected">
                                            {locationFilter
                                                ? getDisplayLocation(
                                                      locationFilter
                                                  )
                                                : "Barra do Piraí"}
                                        </span>
                                    </Link>
                                </h4>
                            </div>
                            <div
                                className={`widget-boxed-body collapse ${
                                    open ? "show" : ""
                                }`}
                                id="where"
                            >
                                <div className="side-list no-border">
                                    <div className="single_filter_card">
                                        <div className="card-body pt-0">
                                            <div className="inner_widget_link">
                                                <ul className="no-ul-list filter-list">
                                                    <li className="form-check">
                                                        <input
                                                            id="b1"
                                                            className="form-check-input"
                                                            name="where"
                                                            type="radio"
                                                            checked={
                                                                locationFilter ===
                                                                "BARRA DO PIRAI"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "BARRA DO PIRAI"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="b1"
                                                            className="form-check-label"
                                                        >
                                                            Barra do Piraí
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="b2"
                                                            className="form-check-input"
                                                            name="where"
                                                            type="radio"
                                                            checked={
                                                                locationFilter ===
                                                                "VALENÇA"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "VALENÇA"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="b2"
                                                            className="form-check-label"
                                                        >
                                                            Valença
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="b3"
                                                            className="form-check-input"
                                                            name="where"
                                                            type="radio"
                                                            checked={
                                                                locationFilter ===
                                                                "VASSOURAS"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "VASSOURAS"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="b3"
                                                            className="form-check-label"
                                                        >
                                                            Vassouras
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="b4"
                                                            className="form-check-input"
                                                            name="where"
                                                            type="radio"
                                                            checked={
                                                                locationFilter ===
                                                                "VOLTA REDONDA"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "VOLTA REDONDA"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="b4"
                                                            className="form-check-label"
                                                        >
                                                            Volta Redonda
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="b5"
                                                            className="form-check-input"
                                                            name="where"
                                                            type="radio"
                                                            checked={
                                                                locationFilter ===
                                                                "PINHEIRAL"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "PINHEIRAL"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="b5"
                                                            className="form-check-label"
                                                        >
                                                            Pinheiral
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="b6"
                                                            className="form-check-input"
                                                            name="where"
                                                            type="radio"
                                                            checked={
                                                                locationFilter ===
                                                                "PIRAI"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "PIRAI"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="b6"
                                                            className="form-check-label"
                                                        >
                                                            Piraí
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="b7"
                                                            className="form-check-input"
                                                            name="where"
                                                            type="radio"
                                                            checked={
                                                                locationFilter ===
                                                                "RIO DAS FLORES"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "RIO DAS FLORES"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="b7"
                                                            className="form-check-label"
                                                        >
                                                            Rio das Flores
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="b8"
                                                            className="form-check-input"
                                                            name="where"
                                                            type="radio"
                                                            checked={
                                                                locationFilter ===
                                                                "MENDES"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "MENDES"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="b8"
                                                            className="form-check-label"
                                                        >
                                                            Mendes
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="b9"
                                                            className="form-check-input"
                                                            name="where"
                                                            type="radio"
                                                            checked={
                                                                locationFilter ===
                                                                "MIGUEL PEREIRA"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "MIGUEL PEREIRA"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="b9"
                                                            className="form-check-label"
                                                        >
                                                            Miguel Pereira
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single_search_boxed">
                            <div className="widget-boxed-header">
                                <h4>
                                    <Link
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpen2(!open2);
                                        }}
                                        className={open2 ? "" : "collapsed"}
                                    >
                                        Tipos de Propriedade
                                        <span className="selected">
                                            {propertyTypeFilter ||
                                                PROPERTY_TYPE_LABELS.APARTMENT}
                                        </span>
                                    </Link>
                                </h4>
                            </div>
                            <div
                                className={`widget-boxed-body collapse ${
                                    open2 ? "show" : ""
                                }`}
                            >
                                <div className="side-list no-border">
                                    <div className="single_filter_card">
                                        <div className="card-body pt-0">
                                            <div className="inner_widget_link">
                                                <ul className="no-ul-list filter-list">
                                                    {PROPERTY_TYPES.map(
                                                        (t, index) => (
                                                            <li
                                                                key={t}
                                                                className="form-check"
                                                            >
                                                                <input
                                                                    id={`c${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="form-check-input"
                                                                    name="ptype"
                                                                    type="radio"
                                                                    checked={
                                                                        propertyTypeFilter ===
                                                                            PROPERTY_TYPE_LABELS[
                                                                                t
                                                                            ] ||
                                                                        (propertyTypeFilter ===
                                                                            "" &&
                                                                            t ===
                                                                                "APARTMENT")
                                                                    }
                                                                    onChange={() =>
                                                                        setPropertyTypeFilter(
                                                                            PROPERTY_TYPE_LABELS[
                                                                                t
                                                                            ]
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={`c${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    className="form-check-label"
                                                                >
                                                                    {
                                                                        PROPERTY_TYPE_LABELS[
                                                                            t
                                                                        ]
                                                                    }
                                                                </label>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single_search_boxed">
                            <div className="widget-boxed-header">
                                <h4>
                                    <Link
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpen3(!open3);
                                        }}
                                        className={open3 ? "" : "collapsed"}
                                    >
                                        Quartos
                                        <span className="selected">
                                            {bedroomsFilter || "2 Quartos"}
                                        </span>
                                    </Link>
                                </h4>
                            </div>
                            <div
                                className={`widget-boxed-body collapse ${
                                    open3 ? "show" : ""
                                }`}
                            >
                                <div className="side-list no-border">
                                    <div className="single_filter_card">
                                        <div className="card-body pt-0">
                                            <div className="inner_widget_link">
                                                <ul className="no-ul-list filter-list">
                                                    <li className="form-check">
                                                        <input
                                                            id="a1"
                                                            className="form-check-input"
                                                            name="bed"
                                                            type="radio"
                                                            checked={
                                                                bedroomsFilter ===
                                                                "01 Quarto"
                                                            }
                                                            onChange={() =>
                                                                setBedroomsFilter(
                                                                    "01 Quarto"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="a1"
                                                            className="form-check-label"
                                                        >
                                                            01 Quarto
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="a2"
                                                            className="form-check-input"
                                                            name="bed"
                                                            type="radio"
                                                            checked={
                                                                bedroomsFilter ===
                                                                "02 Quartos"
                                                            }
                                                            onChange={() =>
                                                                setBedroomsFilter(
                                                                    "02 Quartos"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="a2"
                                                            className="form-check-label"
                                                        >
                                                            02 Quartos
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="a3"
                                                            className="form-check-input"
                                                            name="bed"
                                                            type="radio"
                                                            checked={
                                                                bedroomsFilter ===
                                                                "03 Quartos"
                                                            }
                                                            onChange={() =>
                                                                setBedroomsFilter(
                                                                    "03 Quartos"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="a3"
                                                            className="form-check-label"
                                                        >
                                                            03 Quartos
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="a4"
                                                            className="form-check-input"
                                                            name="bed"
                                                            type="radio"
                                                            checked={
                                                                bedroomsFilter ===
                                                                "04 Quartos"
                                                            }
                                                            onChange={() =>
                                                                setBedroomsFilter(
                                                                    "04 Quartos"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="a4"
                                                            className="form-check-label"
                                                        >
                                                            04 Quartos
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="a5"
                                                            className="form-check-input"
                                                            name="bed"
                                                            type="radio"
                                                            checked={
                                                                bedroomsFilter ===
                                                                "05 Quartos"
                                                            }
                                                            onChange={() =>
                                                                setBedroomsFilter(
                                                                    "05 Quartos"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="a5"
                                                            className="form-check-label"
                                                        >
                                                            05 Quartos
                                                        </label>
                                                    </li>
                                                    <li className="form-check">
                                                        <input
                                                            id="a6"
                                                            className="form-check-input"
                                                            name="bed"
                                                            type="radio"
                                                            checked={
                                                                bedroomsFilter ===
                                                                "06+ Quartos"
                                                            }
                                                            onChange={() =>
                                                                setBedroomsFilter(
                                                                    "06+ Quartos"
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            htmlFor="a6"
                                                            className="form-check-label"
                                                        >
                                                            06+ Quartos
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single_search_boxed">
                            <div className="widget-boxed-header">
                                <h4>
                                    <Link
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpen4(!open4);
                                        }}
                                        className={open4 ? "" : "collapsed"}
                                    >
                                        Faixa de Preço
                                        <span className="selected">
                                            {minPrice !== "" || maxPrice !== ""
                                                ? `R$ ${
                                                      minPrice !== ""
                                                          ? minPrice.toLocaleString(
                                                                "pt-BR"
                                                            )
                                                          : "0"
                                                  } - R$ ${
                                                      maxPrice !== ""
                                                          ? maxPrice.toLocaleString(
                                                                "pt-BR"
                                                            )
                                                          : "∞"
                                                  }`
                                                : "Qualquer preço"}
                                        </span>
                                    </Link>
                                </h4>
                            </div>
                            <div
                                className={`widget-boxed-body collapse ${
                                    open4 ? "show" : ""
                                }`}
                            >
                                <div className="side-list no-border">
                                    <div className="single_filter_card">
                                        <div className="card-body pt-0">
                                            <div className="inner_widget_link">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <label
                                                            htmlFor="minPrice"
                                                            className="form-label"
                                                        >
                                                            Preço Mínimo
                                                        </label>
                                                        <input
                                                            id="minPrice"
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="0"
                                                            value={
                                                                minPrice === ""
                                                                    ? ""
                                                                    : minPrice
                                                            }
                                                            onChange={(e) => {
                                                                const value =
                                                                    e.target
                                                                        .value ===
                                                                    ""
                                                                        ? ""
                                                                        : Number(
                                                                              e
                                                                                  .target
                                                                                  .value
                                                                          );
                                                                if (
                                                                    value ===
                                                                        "" ||
                                                                    maxPrice ===
                                                                        "" ||
                                                                    value <=
                                                                        maxPrice
                                                                ) {
                                                                    setMinPrice(
                                                                        value
                                                                    );
                                                                }
                                                            }}
                                                            min="0"
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <label
                                                            htmlFor="maxPrice"
                                                            className="form-label"
                                                        >
                                                            Preço Máximo
                                                        </label>
                                                        <input
                                                            id="maxPrice"
                                                            type="number"
                                                            className="form-control"
                                                            value={
                                                                maxPrice === ""
                                                                    ? ""
                                                                    : maxPrice
                                                            }
                                                            onChange={(e) => {
                                                                const value =
                                                                    e.target
                                                                        .value ===
                                                                    ""
                                                                        ? ""
                                                                        : Number(
                                                                              e
                                                                                  .target
                                                                                  .value
                                                                          );
                                                                if (
                                                                    value ===
                                                                        "" ||
                                                                    minPrice ===
                                                                        "" ||
                                                                    value >=
                                                                        minPrice
                                                                ) {
                                                                    setMaxPrice(
                                                                        value
                                                                    );
                                                                }
                                                            }}
                                                            min="0"
                                                        />
                                                    </div>
                                                </div>
                                                {minPrice !== "" &&
                                                    maxPrice !== "" &&
                                                    minPrice > maxPrice && (
                                                        <div className="text-danger mt-2">
                                                            O preço mínimo não
                                                            pode ser maior que o
                                                            máximo.
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single_search_boxed">
                            <div className="widget-boxed-header">
                                <h4>
                                    <Link
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpen5(!open5);
                                        }}
                                        className={open5 ? "" : "collapsed"}
                                    >
                                        Comodidades
                                        <span className="selected">
                                            Acessibilidade
                                        </span>
                                    </Link>
                                </h4>
                            </div>
                            <div
                                className={`widget-boxed-body collapse ${
                                    open5 ? "show" : ""
                                }`}
                            >
                                <div className="side-list no-border">
                                    <div className="single_filter_card">
                                        <div className="card-body pt-0">
                                            <div className="inner_widget_link">
                                                <div>
                                                    <h6>
                                                        Amenidades Privativas
                                                    </h6>
                                                    <ul className="no-ul-list filter-list">
                                                        {PRIVATE_AMENITIES.map(
                                                            (
                                                                amenity,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        amenity
                                                                    }
                                                                    className="form-check"
                                                                >
                                                                    <input
                                                                        id={`priv-${index}`}
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={selectedAmenities.has(
                                                                            amenity
                                                                        )}
                                                                        onChange={() =>
                                                                            handleAmenityToggle(
                                                                                amenity
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor={`priv-${index}`}
                                                                        className="form-check-label"
                                                                    >
                                                                        {
                                                                            amenity
                                                                        }
                                                                    </label>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>

                                                    <h6 className="mt-4">
                                                        Amenidades Comuns
                                                    </h6>
                                                    <ul className="no-ul-list filter-list">
                                                        {COMMON_AMENITIES.map(
                                                            (
                                                                amenity,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        amenity
                                                                    }
                                                                    className="form-check"
                                                                >
                                                                    <input
                                                                        id={`comm-${index}`}
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={selectedAmenities.has(
                                                                            amenity
                                                                        )}
                                                                        onChange={() =>
                                                                            handleAmenityToggle(
                                                                                amenity
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor={`comm-${index}`}
                                                                        className="form-check-label"
                                                                    >
                                                                        {
                                                                            amenity
                                                                        }
                                                                    </label>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
