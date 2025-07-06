import React from "react";

import Navbar from "../components/navbar/navbar";
import FooterTop from "../components/footer-top";
import Footer from "../components/footer";
import ScrollToTop from "../components/scroll-to-top";
import SessionWrapper from "../components/auth/SessionWrapper";

export default function Page() {
    return (
        <>
            <SessionWrapper>
                <Navbar transparent={false} />
            </SessionWrapper>

            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">Fale Conosco</h2>
                            <span className="ipn-subtitle">
                                Entre em contato com a Labanca Imobiliária
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-7">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label className="mb-2">Nome</label>
                                        <input
                                            type="text"
                                            className="form-control simple"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label className="mb-2">E-mail</label>
                                        <input
                                            type="email"
                                            className="form-control simple"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="mb-2">Assunto</label>
                                <input
                                    type="text"
                                    className="form-control simple"
                                />
                            </div>

                            <div className="form-group">
                                <label className="mb-2">Mensagem</label>
                                <textarea
                                    className="form-control simple"
                                    placeholder="Sua mensagem..."
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-primary px-5 rounded"
                                    type="submit"
                                >
                                    Enviar Solicitação
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-5 col-md-5">
                            <div className="contact-info">
                                <h2>Entre em Contato</h2>
                                <p>
                                    Estamos aqui para ajudar! Preencha o
                                    formulário ao lado ou utilize os contatos
                                    abaixo para falar com a Labanca Imobiliária.
                                </p>

                                <div className="cn-info-detail mt-4">
                                    <div className="cn-info-icon">
                                        <i className="fa-solid fa-house"></i>
                                    </div>
                                    <div className="cn-info-content">
                                        <h4 className="cn-info-title">
                                            Nosso Endereço
                                        </h4>
                                        Rua Dr. Osvaldo Prado, 123,
                                        <br />
                                        Centro, Barra do Piraí - RJ,
                                        <br />
                                        27175-000, Brasil
                                    </div>
                                </div>
                                <div className="cn-info-detail">
                                    <div className="cn-info-icon">
                                        <i className="fa-solid fa-envelope-circle-check"></i>
                                    </div>
                                    <div className="cn-info-content">
                                        <h4 className="cn-info-title">
                                            Envie um E-mail
                                        </h4>
                                        contato@labancaimobiliaria.com.br
                                        <br />
                                        suporte@labancaimobiliaria.com.br
                                    </div>
                                </div>
                                <div className="cn-info-detail">
                                    <div className="cn-info-icon">
                                        <i className="fa-solid fa-phone-volume"></i>
                                    </div>
                                    <div className="cn-info-content">
                                        <h4 className="cn-info-title">
                                            Ligue para Nós
                                        </h4>
                                        (24) 99999-9999
                                        <br />
                                        (24) 3333-3333
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
