"use client";
import Link from "next/link";
import React, { useState } from "react";
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

                    {/* <div className="position-relative d-flex flex-xl-row flex-column align-items-center">
                        <div className="verifyd-prt-block flex-fill full-width my-1 me-1">
                            <div className="d-flex align-items-center justify-content-center justify-content-between border rounded-3 px-2 py-3">
                                <div className="eliok-cliops d-flex align-items-center">
                                    <span className="svg-icon text-success svg-icon-2hx">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.3"
                                                d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-muted-2 fw-medium ms-1">
                                        Verificado
                                    </span>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckChecked"
                                        defaultChecked
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexSwitchCheckChecked"
                                    ></label>
                                </div>
                            </div>
                        </div>

                        <div className="super-agt-block flex-fill full-width my-1 ms-1">
                            <div className="d-flex align-items-center justify-content-center justify-content-between border rounded-3 px-2 py-3">
                                <div className="eliok-cliops d-flex align-items-center">
                                    <span className="svg-icon text-warning svg-icon-2hx">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-muted-2 fw-medium ms-1">
                                        SuperAgente
                                    </span>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckChecked"
                                        defaultChecked
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexSwitchCheckChecked"
                                    ></label>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="filter_wraps">
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
                                            {locationFilter || "Barra do Piraí"}
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
                                                                "Barra do Piraí"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "Barra do Piraí"
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
                                                                "Valença"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "Valença"
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
                                                                "Vassouras"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "Vassouras"
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
                                                                "Volta Redonda"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "Volta Redonda"
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
                                                                "Pinheiral"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "Pinheiral"
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
                                                                "Piraí"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "Piraí"
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
                                                                "Rio das Flores"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "Rio das Flores"
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
                                                                "Mendes"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "Mendes"
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
                                                                "Miguel Pereira"
                                                            }
                                                            onChange={() =>
                                                                setLocationFilter(
                                                                    "Miguel Pereira"
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
