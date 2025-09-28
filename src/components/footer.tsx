import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
    const propertyLinks = [
        {
            href: "/imoveis?tipo=Apartamento&location=BARRA DO PIRAI&status=alugar",
            text: "Apartamentos para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Apartamento&location=BARRA DO PIRAI&status=venda",
            text: "Apartamentos à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Comercial&location=BARRA DO PIRAI&status=alugar",
            text: "Lojas para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Casa&location=BARRA DO PIRAI&status=alugar",
            text: "Casas para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Casa&location=BARRA DO PIRAI&status=venda",
            text: "Casas à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Casa&location=BARRA DO PIRAI&status=venda",
            text: "Pousadas à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Terreno&location=BARRA DO PIRAI&status=venda",
            text: "Terrenos à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Galpão&location=BARRA DO PIRAI&status=venda",
            text: "Galpões à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Apartamento&location=BARRA DO PIRAI&status=alugar",
            text: "Coberturas para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Comercial&location=BARRA DO PIRAI&status=alugar",
            text: "Pontos para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Escritório&location=BARRA DO PIRAI&status=alugar",
            text: "Salas para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Escritório&location=BARRA DO PIRAI&status=venda",
            text: "Salas à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Casa&location=BARRA DO PIRAI&status=venda",
            text: "Sítios à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Casa&location=BARRA DO PIRAI&status=venda",
            text: "Chácaras à venda em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Studio&location=BARRA DO PIRAI&status=alugar",
            text: "Studios para alugar em Barra do Piraí",
        },
        {
            href: "/imoveis?tipo=Studio&location=BARRA DO PIRAI&status=venda",
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
                                className="nav-footer-logo d-flex justify-content-center align-items-center mb-3"
                                href="/"
                            >
                                <span className="svg-icon text-light svg-icon-2hx">
                                    <Image
                                        src="/img/logo-labanca.png"
                                        width={450}
                                        height={100}
                                        className="img-fluid logo "
                                        alt="Resido Logo"
                                    />
                                </span>
                                {/* <h5 className="fs-2 fw-bold text-light ms-1 my-0">
                                    Labanca Imobiliária
                                </h5> */}
                            </Link>
                            <div className="footer-add font-footer">
                                {/* <p className="mb-1">
                                    Rua Dr. Osvaldo Prado, 123 - Centro, Barra
                                    do Piraí - RJ, 27175-000.
                                </p> */}
                                <p className="mb-1">
                                    <a
                                        href="https://wa.me/5524988044677"
                                        target="_blank"
                                        className="normal-text"
                                    >
                                        +55 24 98804-4677
                                    </a>
                                </p>
                                <p className="mb-1 ">
                                    <a
                                        href="mailto:contato@exemplo.com"
                                        className="normal-text"
                                    >
                                        gslainelabanca@hotmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bloco 2: Subtítulo e links de imóveis */}
                    <div className="col-lg-12 col-md-12">
                        <h4 className="widget-title text-center mb-5 mt-5 mt-md-0">
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
