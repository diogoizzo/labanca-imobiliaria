"use client";
import React, { useState } from "react";
import Link from "next/link";

import UserNav from "../../components/navbar/user-nav";
import AdminSidebar from "../../components/admin-sidebar";
import FooterTop from "../../components/footer-top";
import Footer from "../../components/footer";
import ScrollToTop from "../../components/scroll-to-top";

export default function ChangePassword() {
    let [show, setShow] = useState<boolean>(false);
    return (
        <>
            <UserNav />

            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">Segurança Labanca</h2>
                            <span className="ipn-subtitle">
                                Proteja seu acesso à plataforma
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
                                    onClick={() => setShow(!show)}
                                    className="btn btn-dark full-width mb-4"
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
                                    <h4>Atualize Sua Senha com Segurança</h4>
                                    <div className="submit-section">
                                        <div className="row">
                                            <div className="form-group col-lg-12 col-md-6">
                                                <label>Senha Antiga</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Nova Senha</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Confirmar Senha</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-lg-12 col-md-12">
                                                <button
                                                    className="btn btn-primary px-5 rounded"
                                                    type="submit"
                                                >
                                                    Atualizar e Proteger Minha
                                                    Conta
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
