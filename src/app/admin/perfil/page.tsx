"use client";
import React, { useState } from "react";
import Link from "next/link";

import UserNav from "../../../components/navbar/user-nav";
import AdminSidebar from "../../../components/admin-sidebar";
import FooterTop from "../../../components/footer-top";
import Footer from "../../../components/footer";
import ScrollToTop from "../../../components/scroll-to-top";
import SessionWrapper from "@/components/auth/SessionWrapper";
import ProfileDisplay from "@/components/admin/ProfileDisplay";

export default function Page() {
    let [show, setShow] = useState<boolean>(false);
    return (
        <>
            <SessionWrapper>
                <UserNav />

                <div className="page-title">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <h2 className="ipt-title">
                                    Oi, tudo bem? Seja livre na Labanca!
                                </h2>
                                <span className="ipn-subtitle">
                                    Sua jornada imobiliária em Barra do Piraí
                                    começa aqui!
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
                                <ProfileDisplay />
                            </div>
                        </div>
                    </div>
                </section>

                <FooterTop bg="theme-bg" />
                <Footer />
                <ScrollToTop />
            </SessionWrapper>
        </>
    );
}
