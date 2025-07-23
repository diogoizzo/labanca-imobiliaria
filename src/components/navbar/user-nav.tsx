"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FiChevronDown } from "react-icons/fi";
import { TiSocialGooglePlus, TiSocialFacebook } from "react-icons/ti";

import { navProperty } from "../../app/data/data";
import { useSession } from "next-auth/react";

export default function UserNav() {
    const [activeMenu, setActiveMenu] = useState<{
        [key: string]: { [key: string]: boolean };
    }>({});
    const [windowWidth, setWindowWidth] = useState(0);
    const [toggle, setIsToggle] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const [property, setProperty] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(1);
    const [userMenu, setUserMenu] = useState<boolean>(false);

    const { data: session } = useSession();

    let [scroll, setScroll] = useState<boolean>(false);

    const location = usePathname();
    const current = location;

    const handleMouseEnter = (menu: string, submenu?: string) => {
        setActiveMenu((prev) => ({
            ...prev,
            [menu]: {
                ...prev[menu],
                [submenu || "main"]: true, // Open main menu or submenu
            },
        }));
    };

    // Handle mouse leave for any menu or submenu
    const handleMouseLeave = (menu: string, submenu?: string) => {
        setActiveMenu((prev) => ({
            ...prev,
            [menu]: {
                ...prev[menu],
                [submenu || "main"]: false, // Close main menu or submenu
            },
        }));
    };

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.scrollTo(0, 0);

        const handlerScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
        }
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("scroll", handlerScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handlerScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div
                className={`header header-light head-shadow ${
                    scroll ? "header-fixed" : ""
                }`}
            >
                <div className="container">
                    <nav
                        id="navigation"
                        className={
                            windowWidth > 991
                                ? "navigation navigation-landscape"
                                : "navigation navigation-portrait"
                        }
                    >
                        <div className="nav-header" style={{ lineHeight: "0" }}>
                            <Link className="nav-brand text-logo" href="#">
                                <img src="/img/logo.svg" alt="" />
                                <h5 className="fs-3 fw-bold ms-1 my-0">
                                    Labanca
                                </h5>
                            </Link>
                            <div
                                className="nav-toggle"
                                onClick={() => setIsToggle(!toggle)}
                            ></div>

                            <div className="mobile_nav">
                                <ul>
                                    <li>
                                        <Link
                                            href="/submit-property"
                                            className="text-primary"
                                        >
                                            <span className="svg-icon svg-icon-2hx">
                                                <svg
                                                    width="35"
                                                    height="35"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        opacity="0.3"
                                                        x="2"
                                                        y="2"
                                                        width="20"
                                                        height="20"
                                                        rx="10"
                                                        fill="currentColor"
                                                    />
                                                    <rect
                                                        x="10.8891"
                                                        y="17.8033"
                                                        width="12"
                                                        height="2"
                                                        rx="1"
                                                        transform="rotate(-90 10.8891 17.8033)"
                                                        fill="currentColor"
                                                    />
                                                    <rect
                                                        x="6.01041"
                                                        y="10.9247"
                                                        width="12"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="btn-group account-drop">
                                            <button
                                                type="button"
                                                className="btn btn-order-by-filt dropdown-toggle"
                                                id="showbuttons"
                                                onClick={() =>
                                                    setUserMenu(!userMenu)
                                                }
                                            >
                                                <img
                                                    src="/img/team-1.jpg"
                                                    className="avater-img"
                                                    alt=""
                                                />
                                            </button>
                                            <div
                                                className="dropdown-menu pull-right animated flipInX"
                                                id="showings"
                                                style={{
                                                    display: userMenu
                                                        ? "block"
                                                        : "none",
                                                }}
                                            >
                                                <Link href="/dashboard">
                                                    <i className="fa-solid fa-gauge"></i>
                                                    Painel
                                                </Link>
                                                <Link href="/my-profile">
                                                    <i className="fa-solid fa-address-card"></i>
                                                    Meu Perfil
                                                </Link>
                                                <Link href="/my-property">
                                                    <i className="fa-solid fa-building-circle-check"></i>
                                                    Minhas Propriedades
                                                </Link>
                                                <Link href="/bookmark-list">
                                                    <i className="fa-solid fa-bookmark"></i>
                                                    Propriedades Salvas
                                                </Link>
                                                <Link href="/submit-property-dashboard">
                                                    <i className="fa-solid fa-house"></i>
                                                    Cadastrar Imóvel
                                                </Link>
                                                <Link href="/change-password">
                                                    <i className="fa-solid fa-unlock"></i>
                                                    Alterar Senha
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className={`nav-menus-wrapper  ${
                                toggle ? "nav-menus-wrapper-open" : ""
                            }`}
                            style={{
                                transitionProperty: toggle ? "none" : "left",
                            }}
                        >
                            <span
                                className="nav-menus-wrapper-close-button"
                                onClick={() => setIsToggle(!toggle)}
                            >
                                ✕
                            </span>
                            <ul className="nav-menu">
                                <li
                                    className={`${
                                        [
                                            "/",
                                            "/home-2",
                                            "/home-3",
                                            "/home-4",
                                            "/home-5",
                                            "/home-6",
                                            "/home-7",
                                            "/home-8",
                                            "/home-8",
                                            "/home-9",
                                            "/home-10",
                                            "/home-11",
                                            "video",
                                            "map",
                                        ].includes(current)
                                            ? "active"
                                            : ""
                                    } ${
                                        activeMenu["home"]?.main ? "show" : ""
                                    }`}
                                    onMouseEnter={() =>
                                        handleMouseEnter("home")
                                    }
                                    onMouseLeave={() =>
                                        handleMouseLeave("home")
                                    }
                                >
                                    <Link href="#">
                                        Início
                                        <FiChevronDown className="submenu-indicator" />
                                    </Link>
                                    <ul
                                        className="nav-dropdown nav-submenu"
                                        style={{
                                            display: activeMenu["home"]?.main
                                                ? "block"
                                                : "none",
                                            pointerEvents: activeMenu["home"]
                                                ?.main
                                                ? "auto"
                                                : "none",
                                        }}
                                    >
                                        <li>
                                            <Link
                                                className={
                                                    current === "/"
                                                        ? "active"
                                                        : ""
                                                }
                                                href="/"
                                            >
                                                Layout Início 1
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-2"
                                                className={
                                                    current === "/home-2"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 2
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-3"
                                                className={
                                                    current === "/home-3"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 3
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-4"
                                                className={
                                                    current === "/home-4"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 4
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-5"
                                                className={
                                                    current === "/home-5"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 5
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-6"
                                                className={
                                                    current === "/home-6"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 6
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-7"
                                                className={
                                                    current === "/home-7"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 7
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-8"
                                                className={
                                                    current === "/home-8"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 8
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-9"
                                                className={
                                                    current === "/home-9"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 9
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-10"
                                                className={
                                                    current === "/home-10"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 10
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/home-11"
                                                className={
                                                    current === "/home-11"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início 11
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/video"
                                                className={
                                                    current === "/video"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Início com Vídeo
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/map"
                                                className={
                                                    current === "/map"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Layout Início com Mapa
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li
                                    className={` ${
                                        [
                                            "/list-layout-one",
                                            "/list-layout-two",
                                            "/list-layout-three",
                                            "/list-layout-with-map",
                                            "/list-layout-full",
                                            "/list-layout-one",
                                            "/list-layout-two",
                                            "/list-layout-three",
                                            "/list-layout-with-map",
                                            "/list-layout-full",
                                            "/grid-layout-with-sidebar",
                                            "/classical-layout-with-sidebar",
                                            "/grid-layout-with-map",
                                            "/grid",
                                            "/classical-property",
                                            "/list-layout-with-map",
                                            "/grid-layout-with-map",
                                            "/classical-layout-with-map",
                                            "/half-map",
                                            "/half-map-2",
                                        ].includes(current)
                                            ? "active"
                                            : ""
                                    } ${
                                        activeMenu["listing"]?.main
                                            ? "show"
                                            : ""
                                    }`}
                                    onMouseEnter={() =>
                                        handleMouseEnter("listing")
                                    }
                                    onMouseLeave={() =>
                                        handleMouseLeave("listing")
                                    }
                                >
                                    <Link href="#">
                                        Listagens
                                        <FiChevronDown className="submenu-indicator" />
                                    </Link>
                                    <ul
                                        className="nav-dropdown nav-submenu"
                                        style={{
                                            display: activeMenu["listing"]?.main
                                                ? "block"
                                                : "none",
                                            pointerEvents: activeMenu["listing"]
                                                ?.main
                                                ? "auto"
                                                : "none",
                                        }}
                                    >
                                        <li
                                            className={`${
                                                [
                                                    "/list-layout-one",
                                                    "/list-layout-two",
                                                    "/list-layout-three",
                                                    "/list-layout-with-map",
                                                    "/list-layout-full",
                                                ].includes(current)
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onMouseEnter={() =>
                                                handleMouseEnter(
                                                    "listing",
                                                    "list-layout"
                                                )
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(
                                                    "listing",
                                                    "list-layout"
                                                )
                                            }
                                        >
                                            <Link href="#">
                                                Layout de Lista
                                                <FiChevronDown className="submenu-indicator" />
                                            </Link>
                                            <ul
                                                className="nav-dropdown nav-submenu"
                                                style={{
                                                    display: activeMenu[
                                                        "listing"
                                                    ]?.["list-layout"]
                                                        ? "block"
                                                        : "none",
                                                    pointerEvents: activeMenu[
                                                        "listing"
                                                    ]?.["list-layout"]
                                                        ? "auto"
                                                        : "none",
                                                }}
                                            >
                                                <li>
                                                    <Link
                                                        href="/list-layout-one"
                                                        className={
                                                            current ===
                                                            "/list-layout-one"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Lista Simples
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/list-layout-two"
                                                        className={
                                                            current ===
                                                            "/list-layout-two"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Lista Moderna
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/list-layout-three"
                                                        className={
                                                            current ===
                                                            "/list-layout-three"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Lista Avançada
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/list-layout-with-map"
                                                        className={
                                                            current ===
                                                            "/list-layout-with-map"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Com Mapa
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/list-layout-full"
                                                        className={
                                                            current ===
                                                            "/list-layout-full"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Largura Total
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li
                                            className={`${
                                                [
                                                    "/grid-layout-with-sidebar",
                                                    "/classical-layout-with-sidebar",
                                                    "/grid-layout-with-map",
                                                    "/grid",
                                                    "/classical-property",
                                                ].includes(current)
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onMouseEnter={() =>
                                                handleMouseEnter(
                                                    "listing",
                                                    "grid-layout"
                                                )
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(
                                                    "listing",
                                                    "grid-layout"
                                                )
                                            }
                                        >
                                            <Link href="#">
                                                Layout de Grade
                                                <FiChevronDown className="submenu-indicator" />
                                            </Link>
                                            <ul
                                                className="nav-dropdown nav-submenu"
                                                style={{
                                                    display: activeMenu[
                                                        "listing"
                                                    ]?.["grid-layout"]
                                                        ? "block"
                                                        : "none",
                                                    pointerEvents: activeMenu[
                                                        "listing"
                                                    ]?.["grid-layout"]
                                                        ? "auto"
                                                        : "none",
                                                }}
                                            >
                                                <li>
                                                    <Link
                                                        href="/grid-layout-with-sidebar"
                                                        className={
                                                            current ===
                                                            "/grid-layout-with-sidebar"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Com Barra Lateral
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/classical-layout-with-sidebar"
                                                        className={
                                                            current ===
                                                            "/classical-layout-with-sidebar"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Clássico Com Barra
                                                        Lateral
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/grid-layout-with-map"
                                                        className={
                                                            current ===
                                                            "/grid-layout-with-map"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Com Mapa
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/grid"
                                                        className={
                                                            current === "/grid"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Largura Total
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/classical-property"
                                                        className={
                                                            current ===
                                                            "/classical-property"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Clássico Largura Total
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li
                                            className={`${
                                                [
                                                    "/list-layout-with-map",
                                                    "/grid-layout-with-map",
                                                    "/classical-layout-with-map",
                                                    "/half-map",
                                                    "/half-map-2",
                                                ].includes(current)
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onMouseEnter={() =>
                                                handleMouseEnter(
                                                    "listing",
                                                    "map-layout"
                                                )
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(
                                                    "listing",
                                                    "map-layout"
                                                )
                                            }
                                        >
                                            <Link href="#">
                                                Propriedade com Mapa
                                                <FiChevronDown className="submenu-indicator" />
                                            </Link>
                                            <ul
                                                className="nav-dropdown nav-submenu"
                                                style={{
                                                    display: activeMenu[
                                                        "listing"
                                                    ]?.["map-layout"]
                                                        ? "block"
                                                        : "none",
                                                    pointerEvents: activeMenu[
                                                        "listing"
                                                    ]?.["map-layout"]
                                                        ? "auto"
                                                        : "none",
                                                }}
                                            >
                                                <li>
                                                    <Link
                                                        href="/list-layout-with-map"
                                                        className={
                                                            current ===
                                                            "/list-layout-with-map"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Lista Com Mapa
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/grid-layout-with-map"
                                                        className={
                                                            current ===
                                                            "/grid-layout-with-map"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Grade Com Mapa
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/classical-layout-with-map"
                                                        className={
                                                            current ===
                                                            "/classical-layout-with-map"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Clássico Com Mapa
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/place-search"
                                                        className={
                                                            current ===
                                                            "/place-search"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Pesquisa por Local
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/half-map"
                                                        className={
                                                            current ===
                                                            "/half-map"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Pesquisa Meio Mapa
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/half-map-2"
                                                        className={
                                                            current ===
                                                            "/half-map-2"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Pesquisa Meio Mapa 02
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>

                                <li
                                    className={`${
                                        [
                                            "/single-property-1",
                                            "/single-property-2",
                                            "/single-property-3",
                                            "/single-property-4",
                                            "/agents",
                                            "/agent-page",
                                            "/add-agent",
                                            "/agencies",
                                            "/agency-page",
                                            "/dashboard",
                                            "/create-account",
                                            "/my-profile",
                                            "/checkout",
                                            "/my-property",
                                            "/bookmark-list",
                                            "/change-password",
                                            "/compare-property",
                                            "/submit-property",
                                        ].includes(current)
                                            ? "active"
                                            : ""
                                    } ${
                                        activeMenu["feature"]?.main
                                            ? "show"
                                            : ""
                                    }`}
                                    onMouseEnter={() =>
                                        handleMouseEnter("feature")
                                    }
                                    onMouseLeave={() =>
                                        handleMouseLeave("feature")
                                    }
                                >
                                    <Link href="#">
                                        Recursos
                                        <FiChevronDown className="submenu-indicator" />
                                    </Link>
                                    <ul
                                        className="nav-dropdown nav-submenu"
                                        style={{
                                            display: activeMenu["feature"]?.main
                                                ? "block"
                                                : "none",
                                            pointerEvents: activeMenu["feature"]
                                                ?.main
                                                ? "auto"
                                                : "none",
                                        }}
                                    >
                                        <li
                                            className={
                                                [
                                                    "/single-property-1",
                                                    "/single-property-2",
                                                    "/single-property-3",
                                                    "/single-property-4",
                                                ].includes(current)
                                                    ? "active"
                                                    : ""
                                            }
                                            onMouseEnter={() =>
                                                handleMouseEnter(
                                                    "listing",
                                                    "single-property"
                                                )
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(
                                                    "listing",
                                                    "single-property"
                                                )
                                            }
                                        >
                                            <Link href="#">
                                                Propriedade Única
                                                <FiChevronDown className="submenu-indicator" />
                                            </Link>
                                            <ul
                                                className="nav-dropdown nav-submenu"
                                                style={{
                                                    display: activeMenu[
                                                        "listing"
                                                    ]?.["single-property"]
                                                        ? "block"
                                                        : "none",
                                                    pointerEvents: activeMenu[
                                                        "listing"
                                                    ]?.["single-property"]
                                                        ? "auto"
                                                        : "none",
                                                }}
                                            >
                                                <li>
                                                    <Link
                                                        href="/single-property-1"
                                                        className={
                                                            current ===
                                                            "/single-property-1"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Propriedade Única 1
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/single-property-2"
                                                        className={
                                                            current ===
                                                            "/single-property-2"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Propriedade Única 2
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/single-property-3"
                                                        className={
                                                            current ===
                                                            "/single-property-3"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Propriedade Única 3
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/single-property-4"
                                                        className={
                                                            current ===
                                                            "/single-property-4"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Propriedade Única 4
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li
                                            className={
                                                [
                                                    "/agents",
                                                    "/agent-page",
                                                    "/add-agent",
                                                ].includes(current)
                                                    ? "active"
                                                    : ""
                                            }
                                            onMouseEnter={() =>
                                                handleMouseEnter(
                                                    "listing",
                                                    "agent-list"
                                                )
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(
                                                    "listing",
                                                    "agent-list"
                                                )
                                            }
                                        >
                                            <Link href="#">
                                                Corretores
                                                <FiChevronDown className="submenu-indicator" />
                                            </Link>
                                            <ul
                                                className="nav-dropdown nav-submenu"
                                                style={{
                                                    display: activeMenu[
                                                        "listing"
                                                    ]?.["agent-list"]
                                                        ? "block"
                                                        : "none",
                                                    pointerEvents: activeMenu[
                                                        "listing"
                                                    ]?.["agent-list"]
                                                        ? "auto"
                                                        : "none",
                                                }}
                                            >
                                                <li>
                                                    <Link
                                                        href="/agents"
                                                        className={
                                                            current ===
                                                            "/agents"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Lista de Corretores
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/agent-page"
                                                        className={
                                                            current ===
                                                            "/agent-page"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Página do Corretor
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/add-agent"
                                                        className={
                                                            current ===
                                                            "/add-agent"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Adicionar Corretor
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/edit-agent"
                                                        className={
                                                            current ===
                                                            "/edit-agent"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Editar Corretor
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li
                                            className={
                                                [
                                                    "/agencies",
                                                    "/agency-page",
                                                ].includes(current)
                                                    ? "active"
                                                    : ""
                                            }
                                            onMouseEnter={() =>
                                                handleMouseEnter(
                                                    "listing",
                                                    "agency-list"
                                                )
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(
                                                    "listing",
                                                    "agency-list"
                                                )
                                            }
                                        >
                                            <Link href="#">
                                                Agências
                                                <FiChevronDown className="submenu-indicator" />
                                            </Link>
                                            <ul
                                                className="nav-dropdown nav-submenu"
                                                style={{
                                                    display: activeMenu[
                                                        "listing"
                                                    ]?.["agency-list"]
                                                        ? "block"
                                                        : "none",
                                                    pointerEvents: activeMenu[
                                                        "listing"
                                                    ]?.["agency-list"]
                                                        ? "auto"
                                                        : "none",
                                                }}
                                            >
                                                <li>
                                                    <Link
                                                        href="/agencies"
                                                        className={
                                                            current ===
                                                            "/agencies"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Lista de Agências
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/agency-page"
                                                        className={
                                                            current ===
                                                            "/agency-page"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Página da Agência
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li
                                            className={
                                                [
                                                    "/dashboard",
                                                    "/create-account",
                                                    "/my-profile",
                                                    "/checkout",
                                                    "/my-property",
                                                    "/bookmark-list",
                                                    "/change-password",
                                                ].includes(current)
                                                    ? "active"
                                                    : ""
                                            }
                                            onMouseEnter={() =>
                                                handleMouseEnter(
                                                    "listing",
                                                    "account"
                                                )
                                            }
                                            onMouseLeave={() =>
                                                handleMouseLeave(
                                                    "listing",
                                                    "account"
                                                )
                                            }
                                        >
                                            <Link href="#">
                                                Minha Conta
                                                <FiChevronDown className="submenu-indicator" />
                                            </Link>
                                            <ul
                                                className="nav-dropdown nav-submenu"
                                                style={{
                                                    display: activeMenu[
                                                        "listing"
                                                    ]?.["account"]
                                                        ? "block"
                                                        : "none",
                                                    pointerEvents: activeMenu[
                                                        "listing"
                                                    ]?.["account"]
                                                        ? "auto"
                                                        : "none",
                                                }}
                                            >
                                                <li>
                                                    <Link
                                                        href="/dashboard"
                                                        className={
                                                            current ===
                                                            "/dashboard"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Painel do Usuário
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/create-account"
                                                        className={
                                                            current ===
                                                            "/create-account"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Criar Conta
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/payment">
                                                        Confirmação de Pagamento
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/checkout"
                                                        className={
                                                            current ===
                                                            "/checkout"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Finalizar Compra
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/my-profile"
                                                        className={
                                                            current ===
                                                            "/my-profile"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Meu Perfil
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/my-property"
                                                        className={
                                                            current ===
                                                            "/my-property"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Lista de Propriedades
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/bookmark-list"
                                                        className={
                                                            current ===
                                                            "/bookmark-list"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Listagens Salvas
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/change-password"
                                                        className={
                                                            current ===
                                                            "/change-password"
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        Alterar Senha
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link
                                                href="/compare-property"
                                                className={
                                                    current ===
                                                    "/compare-property"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Comparar Propriedade
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/submit-property"
                                                className={
                                                    current ===
                                                    "/submit-property"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Cadastrar Propriedade
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li
                                    className={`${
                                        [
                                            "/blog",
                                            "/blog-detail",
                                            "/component",
                                            "/pricing",
                                            "/404",
                                            "/contact",
                                        ].includes(current)
                                            ? "active"
                                            : ""
                                    } ${
                                        activeMenu["pages"]?.main ? "show" : ""
                                    }`}
                                    onMouseEnter={() =>
                                        handleMouseEnter("pages")
                                    }
                                    onMouseLeave={() =>
                                        handleMouseLeave("pages")
                                    }
                                >
                                    <Link href="#">
                                        Páginas
                                        <FiChevronDown className="submenu-indicator" />
                                    </Link>
                                    <ul
                                        className="nav-dropdown nav-submenu"
                                        style={{
                                            display: activeMenu["pages"]?.main
                                                ? "block"
                                                : "none",
                                            pointerEvents: activeMenu["pages"]
                                                ?.main
                                                ? "auto"
                                                : "none",
                                        }}
                                    >
                                        <li>
                                            <Link
                                                href="/about-us"
                                                className={
                                                    current === "/about-us"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Sobre Nós
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/blog"
                                                className={
                                                    current === "/blog"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Página de Blogs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/blog-detail"
                                                className={
                                                    current === "/blog-detail"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Detalhes do Blog
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/component"
                                                className={
                                                    current === "/component"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Shortcodes
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/pricing"
                                                className={
                                                    current === "/pricing"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Preços
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/faq"
                                                className={
                                                    current === "/faq"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                FAQ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/404"
                                                className={
                                                    current === "/404"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Página de Erro
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/contact"
                                                className={
                                                    current === "/contact"
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                Contatos
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul className="nav-menu nav-menu-social align-to-right d-none d-lg-inline-flex">
                                <ul className="nav-menu nav-menu-social align-to-right">
                                    <li>
                                        <div className="btn-group account-drop">
                                            <button
                                                type="button"
                                                className="btn btn-order-by-filt dropdown-toggle"
                                                onClick={() =>
                                                    setUserMenu(!userMenu)
                                                }
                                            >
                                                <img
                                                    src="/img/team-1.jpg"
                                                    className="avater-img"
                                                    alt=""
                                                />
                                                Olá,{" "}
                                                {session?.user?.name || "Admin"}
                                            </button>
                                            <div
                                                className="dropdown-menu pull-right animated flipInX"
                                                id="showing"
                                                style={{
                                                    display: userMenu
                                                        ? "block"
                                                        : "none",
                                                }}
                                            >
                                                <Link href="/dashboard">
                                                    <i className="fa-solid fa-gauge"></i>
                                                    Painel
                                                </Link>
                                                <Link href="/my-profile">
                                                    <i className="fa-solid fa-address-card"></i>
                                                    Meu Perfil
                                                </Link>
                                                <Link href="/my-property">
                                                    <i className="fa-solid fa-building-circle-check"></i>
                                                    Minhas Propriedades
                                                </Link>
                                                <Link href="/bookmark-list">
                                                    <i className="fa-solid fa-bookmark"></i>
                                                    Propriedades Salvas
                                                </Link>
                                                <Link href="/submit-property-dashboard">
                                                    <i className="fa-solid fa-house"></i>
                                                    Cadastrar Imóvel
                                                </Link>
                                                <Link href="/change-password">
                                                    <i className="fa-solid fa-unlock"></i>
                                                    Alterar Senha
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                        <div
                            className="nav-overlay-panel"
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: toggle ? "block" : "none",
                            }}
                        ></div>
                    </nav>
                </div>
            </div>
            <div className="clearfix"></div>

            {login && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "#0000008a" }}
                >
                    <div
                        className="modal-dialog modal-dialog-centered login-pop-form"
                        role="document"
                    >
                        <div className="modal-content" id="registermodal">
                            <span
                                className="mod-close"
                                onClick={() => setLogin(!login)}
                            >
                                <span className="svg-icon text-primary svg-icon-2hx">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            opacity="0.3"
                                            x="2"
                                            y="2"
                                            width="20"
                                            height="20"
                                            rx="10"
                                            fill="currentColor"
                                        ></rect>
                                        <rect
                                            x="7"
                                            y="15.3137"
                                            width="12"
                                            height="2"
                                            rx="1"
                                            transform="rotate(-45 7 15.3137)"
                                            fill="currentColor"
                                        ></rect>
                                        <rect
                                            x="8.41422"
                                            y="7"
                                            width="12"
                                            height="2"
                                            rx="1"
                                            transform="rotate(45 8.41422 7)"
                                            fill="currentColor"
                                        ></rect>
                                    </svg>
                                </span>
                            </span>
                            <div className="modal-body">
                                <h4 className="modal-header-title">
                                    Acessar Conta
                                </h4>
                                <div className="d-flex align-items-center justify-content-center mb-3">
                                    <span className="svg-icon text-primary svg-icon-2hx">
                                        <svg
                                            width="80"
                                            height="80"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.8797 15.375C15.9797 15.075 15.9797 14.775 15.9797 14.475C15.9797 13.775 15.7797 13.075 15.4797 12.475C14.7797 11.275 13.4797 10.475 11.9797 10.475C11.7797 10.475 11.5797 10.475 11.3797 10.575C7.37971 11.075 4.67971 14.575 2.57971 18.075L10.8797 3.675C11.3797 2.775 12.5797 2.775 13.0797 3.675C13.1797 3.875 13.2797 3.975 13.3797 4.175C15.2797 7.575 16.9797 11.675 15.8797 15.375Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                opacity="0.3"
                                                d="M20.6797 20.6749C16.7797 20.6749 12.3797 20.275 9.57972 17.575C10.2797 18.075 11.0797 18.375 11.9797 18.375C13.4797 18.375 14.7797 17.5749 15.4797 16.2749C15.6797 15.9749 15.7797 15.675 15.7797 15.375V15.2749C16.8797 11.5749 15.2797 7.47495 13.2797 4.07495L21.6797 18.6749C22.2797 19.5749 21.6797 20.6749 20.6797 20.6749ZM8.67972 18.6749C8.17972 17.8749 7.97972 16.975 7.77972 15.975C7.37972 13.575 8.67972 10.775 11.3797 10.375C7.37972 10.875 4.67972 14.375 2.57972 17.875C2.47972 18.075 2.27972 18.375 2.17972 18.575C1.67972 19.475 2.27972 20.475 3.27972 20.475H10.3797C9.67972 20.175 9.07972 19.3749 8.67972 18.6749Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                                <div className="login-form">
                                    <form>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="nome@exemplo.com"
                                            />
                                            <label>Endereço de E-mail</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Senha"
                                            />
                                            <label>Senha</label>
                                        </div>

                                        <div className="form-group mb-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="flex-shrink-0 flex-first">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="save-pass"
                                                            value="option1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="save-pass"
                                                        >
                                                            Lembrar Senha
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0 flex-first">
                                                    <Link
                                                        href="#"
                                                        className="link fw-medium"
                                                    >
                                                        Esqueceu a Senha?
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <button
                                                type="button"
                                                className="btn btn-lg btn-primary fw-medium full-width rounded-2"
                                            >
                                                Entrar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-divider">
                                    <span>Ou acesse com</span>
                                </div>
                                <div className="social-login mb-3">
                                    <ul>
                                        <li>
                                            <Link
                                                href="#"
                                                className="btn connect-fb"
                                            >
                                                <TiSocialFacebook
                                                    className="ti-facebook"
                                                    style={{
                                                        width: "25px",
                                                        height: "25px",
                                                    }}
                                                />
                                                Facebook
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="btn connect-google"
                                            >
                                                <TiSocialGooglePlus
                                                    className="ti-google"
                                                    style={{
                                                        width: "25px",
                                                        height: "25px",
                                                    }}
                                                />
                                                Google
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-center">
                                    <p className="mt-4">
                                        Não tem uma conta?{" "}
                                        <Link
                                            href="/create-account"
                                            className="link fw-medium"
                                        >
                                            Criar uma Conta
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`offcanvas offcanvas-end  ${property ? "show" : ""}`}
            >
                <div className="offcanvas-header">
                    <h5
                        className="offcanvas-title"
                        id="offcanvasScrollingLabel"
                    >
                        Comparar e Propriedades Selecionadas
                    </h5>
                    <Link href="#" onClick={() => setProperty(!property)}>
                        <span className="svg-icon text-primary svg-icon-2hx">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    opacity="0.3"
                                    x="2"
                                    y="2"
                                    width="20"
                                    height="20"
                                    rx="10"
                                    fill="currentColor"
                                />
                                <rect
                                    x="7"
                                    y="15.3137"
                                    width="12"
                                    height="2"
                                    rx="1"
                                    transform="rotate(-45 7 15.3137)"
                                    fill="currentColor"
                                />
                                <rect
                                    x="8.41422"
                                    y="7"
                                    width="12"
                                    height="2"
                                    rx="1"
                                    transform="rotate(45 8.41422 7)"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
                <div className="offcanvas-body">
                    <ul
                        className="nav nav-pills sider_tab mb-3"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    activeTab === 1 ? "active" : ""
                                }`}
                                onClick={() => setActiveTab(1)}
                            >
                                Comparar Propriedade
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    activeTab === 2 ? "active" : ""
                                }`}
                                onClick={() => setActiveTab(2)}
                            >
                                Propriedades Salvas
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className={`tab-pane fade ${
                                activeTab === 1 ? "show active" : ""
                            }`}
                        >
                            <div className="sidebar_featured_property">
                                {navProperty.slice(0, 4).map((item, index) => {
                                    return (
                                        <div
                                            className="sides_list_property p-2"
                                            key={index}
                                        >
                                            <div className="sides_list_property_thumb">
                                                <img
                                                    src={item.image}
                                                    className="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="sides_list_property_detail">
                                                <h4>
                                                    <Link href="/single-property-1">
                                                        {item.title}
                                                    </Link>
                                                </h4>
                                                <span className="text-muted-2">
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    {item.loction}
                                                </span>
                                                <div className="lists_property_price">
                                                    <div className="lists_property_types">
                                                        {item.tag ===
                                                            "For Sale" && (
                                                            <div className="property_types_vlix sale">
                                                                Para Venda
                                                            </div>
                                                        )}
                                                        {item.tag ===
                                                            "For Rent" && (
                                                            <div className="property_types_vlix">
                                                                Para Aluguel
                                                            </div>
                                                        )}
                                                        {item.tag ===
                                                            "For Buy" && (
                                                            <div className="property_types_vlix buy">
                                                                Para Compra
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="lists_property_price_value">
                                                        <h4 className="text-primary">
                                                            {item.value}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="input-group">
                                    <Link
                                        href="/compare-property"
                                        className="btn btn-light-primary fw-medium full-width"
                                    >
                                        Ver e Comparar
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`tab-pane fade ${
                                activeTab === 2 ? "show active" : ""
                            }`}
                        >
                            <div className="sidebar_featured_property">
                                {navProperty.slice(4, 8).map((item, index) => {
                                    return (
                                        <div
                                            className="sides_list_property p-2"
                                            key={index}
                                        >
                                            <div className="sides_list_property_thumb">
                                                <img
                                                    src={item.image}
                                                    className="img-fluid"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="sides_list_property_detail">
                                                <h4>
                                                    <Link href="/single-property-1">
                                                        {item.title}
                                                    </Link>
                                                </h4>
                                                <span className="text-muted-2">
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    {item.loction}
                                                </span>
                                                <div className="lists_property_price">
                                                    <div className="lists_property_types">
                                                        {item.tag ===
                                                            "For Sale" && (
                                                            <div className="property_types_vlix sale">
                                                                Para Venda
                                                            </div>
                                                        )}
                                                        {item.tag ===
                                                            "For Rent" && (
                                                            <div className="property_types_vlix">
                                                                Para Aluguel
                                                            </div>
                                                        )}
                                                        {item.tag ===
                                                            "For Buy" && (
                                                            <div className="property_types_vlix buy">
                                                                Para Compra
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="lists_property_price_value">
                                                        <h4 className="text-primary">
                                                            {item.value}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="input-group">
                                    <Link
                                        href="#"
                                        className="btn btn-light-primary fw-medium full-width"
                                    >
                                        Ver e Comparar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
