"use client";
import React, { useState } from "react";

import UserNav from "../../../components/navbar/user-nav";
import AdminSidebar from "../../../components/admin-sidebar";
import FooterTop from "../../../components/footer-top";
import Footer from "../../../components/footer";
import ScrollToTop from "../../../components/scroll-to-top";
import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
    let [show, setShow] = useState<boolean>(false);
    return (
        <>
            <UserNav />

            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">Cadastrar Novo Imóvel</h2>
                            <span className="ipn-subtitle">
                                Destaque seu imóvel com a Labanca Imobiliária -
                                a líder em compra, venda e locação em Barra do
                                Piraí. Conectamos você aos melhores clientes!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <section className="bg-light">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <AdminSidebar show={show} setShow={setShow} />
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="submit-pages">
                                        <PropertyForm />
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
