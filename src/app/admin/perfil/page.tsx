"use client";
import React, { useState } from "react";
import Link from "next/link";

import UserNav from "../../components/navbar/user-nav";
import AdminSidebar from "../../components/admin-sidebar";
import FooterTop from "../../components/footer-top";
import Footer from "../../components/footer";
import ScrollToTop from "../../components/scroll-to-top";

export default function Page() {
    let [show, setShow] = useState<boolean>(false);
    return (
        <>
            <UserNav />
            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">
                                Oi, tudo bem? Seja livre na Labanca!
                            </h2>
                            <span className="ipn-subtitle">
                                Sua jornada imobiliária em Barra do Piraí começa
                                aqui!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <section className="bg-light">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="filter_search_opt">
                                <Link
                                    href="#"
                                    className="btn btn-dark full-width mb-4"
                                    onClick={() => setShow(!show)}
                                >
                                    Navegação do Painel
                                    <i className="fa-solid fa-bars ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <AdminSidebar show={show} setShow={setShow} />
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="dashboard-wraper">
                                <div className="form-submit">
                                    <h4>Sua Conta Labanca Imobiliária</h4>
                                    <div className="submit-section">
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Seu Nome
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Ex: João Silva - Corretor Labanca"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    E-mail
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    defaultValue="seu.email@exemplo.com"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Seu Título
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Corretor de Imóveis"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Telefone
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="(XX) XXXXX-XXXX"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Endereço
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Av. Coronel Braulio de Lima, 123, Barra do Piraí"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Cidade
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Barra do Piraí"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Estado
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="RJ"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    CEP
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="27175-000"
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label className="mb-2">
                                                    Sobre
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    defaultValue="Conte sobre sua experiência no mercado imobiliário de Barra do Piraí"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-submit">
                                    <h4>Contas Sociais</h4>
                                    <div className="submit-section">
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Facebook
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="https://facebook.com/seuperfil"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Twitter
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    defaultValue="https://twitter.com/seuperfil"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Google Plus
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="https://plus.google.com/seuperfil"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    LinkedIn
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="https://linkedin.com/in/seuperfil"
                                                />
                                            </div>

                                            <div className="form-group col-lg-12 col-md-12">
                                                <button
                                                    className="btn btn-primary px-5 rounded"
                                                    type="submit"
                                                >
                                                    Salvar e continuar buscando!
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterTop bg="theme-bg" />
            <Footer />
            <ScrollToTop />
        </>
    );
}
