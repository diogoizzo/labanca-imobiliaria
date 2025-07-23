"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserNav() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [toggle, setIsToggle] = useState<boolean>(false);
    const [userMenu, setUserMenu] = useState<boolean>(false);

    const { data: session } = useSession();

    let [scroll, setScroll] = useState<boolean>(false);

    const location = usePathname();
    const current = location;

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

        setWindowWidth(window.innerWidth);
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
                                ? "navigation navigation-landscape d-flex justify-content-between align-items-center"
                                : "navigation navigation-portrait"
                        }
                    >
                        <div className="nav-header" style={{ lineHeight: "0" }}>
                            <Link className="nav-brand text-logo" href="/">
                                <img src="/img/logo.svg" alt="Labanca Logo" />
                                <h5 className="fs-3 fw-bold ms-1 my-0">
                                    Labanca
                                </h5>
                            </Link>
                            <div
                                className="nav-toggle"
                                onClick={() => setIsToggle(!toggle)}
                            ></div>
                        </div>

                        <div
                            className={`nav-menus-wrapper ${
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
                            {/* Menu para mobile */}
                            <ul className="nav-menu align-to-right">
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/dashboard">
                                        <i className="fa-solid fa-gauge"></i>
                                        <span className="ms-2">Painel</span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/my-profile">
                                        <i className="fa-solid fa-address-card"></i>
                                        <span className="ms-2">Meu Perfil</span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/my-property">
                                        <i className="fa-solid fa-building-circle-check"></i>
                                        <span className="ms-2">
                                            Minhas Propriedades
                                        </span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/bookmark-list">
                                        <i className="fa-solid fa-bookmark"></i>
                                        <span className="ms-2">
                                            Propriedades Salvas
                                        </span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/submit-property-dashboard">
                                        <i className="fa-solid fa-house"></i>
                                        <span className="ms-2">
                                            Cadastrar Imóvel
                                        </span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/change-password">
                                        <i className="fa-solid fa-unlock"></i>
                                        <span className="ms-2">
                                            Alterar Senha
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Dropdown do usuário para desktop */}
                        <div className="d-none d-lg-block">
                            <div className="btn-group account-drop">
                                <button
                                    type="button"
                                    className="btn btn-order-by-filt dropdown-toggle menu-font"
                                    style={{ color: "#084da3" }}
                                    onClick={() => setUserMenu(!userMenu)}
                                >
                                    Olá,{" "}
                                    <span className="menu-font">
                                        {session?.user?.name || "Admin"}
                                    </span>
                                </button>
                                <div
                                    className="dropdown-menu pull-right animated flipInX"
                                    style={{
                                        display: userMenu ? "block" : "none",
                                    }}
                                >
                                    <Link href="/dashboard">
                                        <i className="fa-solid fa-gauge"></i>{" "}
                                        Painel
                                    </Link>
                                    <Link href="/my-profile">
                                        <i className="fa-solid fa-address-card"></i>{" "}
                                        Meu Perfil
                                    </Link>
                                    <Link href="/my-property">
                                        <i className="fa-solid fa-building-circle-check"></i>{" "}
                                        Minhas Propriedades
                                    </Link>
                                    <Link href="/bookmark-list">
                                        <i className="fa-solid fa-bookmark"></i>{" "}
                                        Propriedades Salvas
                                    </Link>
                                    <Link href="/submit-property-dashboard">
                                        <i className="fa-solid fa-house"></i>{" "}
                                        Cadastrar Imóvel
                                    </Link>
                                    <Link href="/change-password">
                                        <i className="fa-solid fa-unlock"></i>{" "}
                                        Alterar Senha
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="clearfix"></div>
        </>
    );
}
