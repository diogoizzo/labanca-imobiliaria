"use client";
import { Suspense } from "react";
import Navbar from "./navbar";
import Image from "next/image";

function NavbarFallback({ transparent }: { transparent: boolean }) {
    return (
        <div
            className={`header ${
                transparent
                    ? "header-transparent dark"
                    : "header-light head-shadow"
            }`}
        >
            <div className="container">
                <nav className="navigation navigation-landscape">
                    <div className="nav-header" style={{ lineHeight: "0" }}>
                        <div className="nav-brand text-logo">
                            <Image
                                src="/img/svg/logo-labanca.svg"
                                width={50}
                                height={50}
                                alt="Resido Logo"
                            />
                            <h5 className="fs-3 fw-bold ms-1 my-0">Labanca</h5>
                        </div>
                    </div>
                    <div className="nav-menus-wrapper">
                        <ul className="nav-menu align-to-right">
                            <li>
                                <span className="menu-font">Carregando...</span>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default function SuspenseNavbar({
    transparent,
}: {
    transparent: boolean;
}) {
    return (
        <Suspense fallback={<NavbarFallback transparent={transparent} />}>
            <Navbar transparent={transparent} />
        </Suspense>
    );
}
