import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const propertyLinks = [
        {
            href: "/imoveis?tipo=apartamento&cidade=barra-do-pirai&status=alugar",
            text: "Apartamentos para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=apartamento&cidade=barra-do-pirai&status=venda",
            text: "Apartamentos à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=loja&cidade=barra-do-pirai&status=alugar",
            text: "Lojas para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=casa&cidade=barra-do-pirai&status=alugar",
            text: "Casas para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=casa&cidade=barra-do-pirai&status=venda",
            text: "Casas à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=pousada&cidade=barra-do-pirai&status=venda",
            text: "Pousadas à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=terreno&cidade=barra-do-pirai&status=venda",
            text: "Terrenos à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=galpao&cidade=barra-do-pirai&status=venda",
            text: "Galpões à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=cobertura&cidade=barra-do-pirai&status=alugar",
            text: "Coberturas para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=ponto&cidade=barra-do-pirai&status=alugar",
            text: "Pontos para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=sala&cidade=barra-do-pirai&status=alugar",
            text: "Salas para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=sala&cidade=barra-do-pirai&status=venda",
            text: "Salas à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=sitio&cidade=barra-do-pirai&status=venda",
            text: "Sítios à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=chacara&cidade=barra-do-pirai&status=venda",
            text: "Chácaras à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=studio&cidade=barra-do-pirai&status=alugar",
            text: "Studios para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=studio&cidade=barra-do-pirai&status=venda",
            text: "Studios à venda em Barra do Piraí",
        },
    ];

    return (
        <footer
            className="dark-footer skin-dark-footer py-3 "
            style={{ fontSize: "1.1rem" }}
        >
            <div className="container mb-5 ">
                <div className="row">
                    {/* Bloco 1: Logo e informações da empresa - centralizado */}
                    <div className="col-lg-12 col-md-12 text-center">
                        <div className="footer-widget mx-auto d-inline-block">
                            <Link
                                className="nav-footer-logo d-flex justify-content-center align-items-center mb-2"
                                href="/"
                            >
                                <span className="svg-icon text-light svg-icon-2hx">
                                    <svg
                                        width="65"
                                        height="65"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.8797 15.375C15.9797 15.075 15.9797 14.775 15.9797 14.475C15.9797 13.775 15.7797 13.075 15.4797 12.475C14.7797 11.275 13.4797 10.475 11.9797 10.475C11.7797 10.475 11.5797 10.475 11.3797 10.575C7.37971 11.075 4.67971 14.575 2.57971 18.075L10.8797 3.675C11.3797 2.775 12.5797 2.775 13.0797 3.675C13.1797 3.875 13.2797 3.975 13.3797 4.175C15.2797 7.575 16.9797 11.675 15.8797 15.375Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.3"
                                            d="M20.6797 20.6749C16.7797 20.6749 12.3797 20.275 9.57972 17.575C10.2797 18.075 11.0797 18.375 11.9797 18.375C13.4797 18.375 14.7797 17.5749 15.4797 16.2749C15.6797 15.9749 15.7797 15.675 15.797 15.375V15.2749C16.8797 11.5749 15.2797 7.47495 13.2797 4.07495L21.6797 18.6749C22.2797 19.5749 21.6797 20.6749 20.6797 20.6749ZM8.67972 18.6749C8.17972 17.8749 7.97972 16.975 7.77972 15.975C7.37972 13.575 8.67972 10.775 11.3797 10.375C7.37972 10.875 4.67972 14.375 2.57972 17.875C2.47972 18.075 2.27972 18.375 2.17972 18.575C1.67972 19.475 2.27972 20.475 3.27972 20.475H10.3797C9.67972 20.175 9.07972 19.3749 8.67972 18.6749Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>
                                <h5 className="fs-2 fw-bold text-light ms-1 my-0">
                                    Labanca Imobiliária
                                </h5>
                            </Link>
                            <div className="footer-add font-footer">
                                <p className="mb-1">
                                    Rua Dr. Osvaldo Prado, 123 - Centro, Barra
                                    do Piraí - RJ, 27175-000.
                                </p>
                                <p className="mb-1">+55 24 99999-9999</p>
                                <p className="mb-1">
                                    contato@labancaimobiliaria.com.br
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bloco 2: Subtítulo e links de imóveis */}
                    <div className="col-lg-12 col-md-12 mt-3">
                        <h4 className="widget-title text-center mb-5 ">
                            Outras opções de imóveis em Barra do Piraí
                        </h4>
                        <div className="row">
                            {propertyLinks.map((link, index) => (
                                <div
                                    key={index}
                                    className="col-lg-3 col-md-4 col-sm-6 mb-2 text-center text-md-start"
                                >
                                    <Link
                                        href={link.href}
                                        className="text-light font-link-footer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        {link.text}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom  py-3">
                <div className="container">
                    <div className="row align-items-center flex-column flex-md-row">
                        <div className="col-lg-6 col-md-6 text-center text-md-start order-0 order-md-0">
                            <p className="mb-2 mb-md-0">
                                © {new Date().getFullYear()} Labanca
                                Imobiliária.
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-6 text-center text-md-end order-1 order-md-1 d-flex justify-content-center justify-content-md-end">
                            <ul className="footer-bottom-social">
                                <li>
                                    <Link
                                        href="https://www.facebook.com/shreethemes"
                                        target="_blank"
                                        className="text-light"
                                    >
                                        <i className="fa-brands fa-facebook"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://x.com/shreethemes"
                                        target="_blank"
                                        className="text-light"
                                    >
                                        <i className="fa-brands fa-twitter"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://www.instagram.com/shreethemes/"
                                        target="_blank"
                                        className="text-light"
                                    >
                                        <i className="fa-brands fa-instagram"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://www.linkedin.com/company/shreethemes"
                                        target="_blank"
                                        className="text-light"
                                    >
                                        <i className="fa-brands fa-linkedin"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
