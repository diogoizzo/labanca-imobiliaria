"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function UserNav() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [toggle, setIsToggle] = useState<boolean>(false);
    const [userMenu, setUserMenu] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setUserMenu(false);
            }
        };

        if (userMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenu]);

    const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        signOut({ callbackUrl: "/" });
    };

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
                                    <Link href="/admin/perfil">
                                        <i className="fa-solid fa-address-card"></i>
                                        <span className="ms-2">Meu Perfil</span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/admin/imoveis">
                                        <i className="fa-solid fa-building-circle-check"></i>
                                        <span className="ms-2">
                                            Meus imóveis
                                        </span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/admin/novo-imovel">
                                        <i className="fa-solid fa-house"></i>
                                        <span className="ms-2">
                                            Cadastrar Novo Imóvel
                                        </span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/admin/novo-corretor">
                                        <i className="fa-solid fa-user-tie"></i>
                                        <span className="ms-2">
                                            Cadastrar Novo Corretor
                                        </span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="/admin/alterar-senha">
                                        <i className="fa-solid fa-unlock"></i>
                                        <span className="ms-2">
                                            Alterar Senha
                                        </span>
                                    </Link>
                                </li>
                                <li className="mobile-menu-item d-block d-lg-none">
                                    <Link href="#" onClick={handleSignOut}>
                                        <i className="fa-solid fa-power-off"></i>
                                        <span className="ms-2">Sair</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Dropdown do usuário para desktop */}
                        <div className="d-none d-lg-block">
                            <div
                                className="btn-group account-drop"
                                ref={dropdownRef}
                            >
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
                                    <Link
                                        href="/admin/perfil"
                                        className="dropdown-item py-2 text-dark"
                                    >
                                        <i className="fa-solid fa-address-card me-2"></i>
                                        Meu Perfil
                                    </Link>
                                    <Link
                                        href="/admin/imoveis"
                                        className="dropdown-item py-2 text-dark"
                                    >
                                        <i className="fa-solid fa-building-circle-check me-2"></i>
                                        Meus imóveis
                                    </Link>
                                    <Link
                                        href="/admin/novo-imovel"
                                        className="dropdown-item py-2 text-dark"
                                    >
                                        <i className="fa-solid fa-house me-2"></i>
                                        Cadastrar Novo Imóvel
                                    </Link>
                                    <Link
                                        href="/admin/novo-corretor"
                                        className="dropdown-item py-2 text-dark"
                                    >
                                        <i className="fa-solid fa-user-tie me-2"></i>
                                        Cadastrar Novo Corretor
                                    </Link>
                                    <Link
                                        href="/admin/alterar-senha"
                                        className="dropdown-item py-2 text-dark"
                                    >
                                        <i className="fa-solid fa-unlock me-2"></i>
                                        Alterar Senha
                                    </Link>
                                    <Link
                                        href="#"
                                        onClick={handleSignOut}
                                        className="dropdown-item py-2 text-dark"
                                    >
                                        <i className="fa-solid fa-power-off me-2"></i>
                                        Sair
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
