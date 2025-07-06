import React from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import FooterTop from "../../components/footer-top";
import ScrollToTop from "../../components/scroll-to-top";
import SessionWrapper from "@/components/auth/SessionWrapper";
import SuspenseNavbar from "@/components/navbar/SuspenseNavbar";

export default function Page() {
    return (
        <div>
            <SessionWrapper>
                <SuspenseNavbar transparent={false} />
            </SessionWrapper>
            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">Componentes</h2>
                            <span className="ipn-subtitle">
                                Lista de todos os componentes utilizados
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h4>Tipografia</h4>
                            <h1>Título Um</h1>
                            <h2>Título Dois</h2>
                            <h3>Título Três</h3>
                            <h4>Título Quatro</h4>
                            <h5>Título Cinco</h5>
                            <h6>Título Seis</h6>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h4 className="mb-4">Botões</h4>
                            <button
                                type="submit"
                                className="btn btn-primary mb-3"
                            >
                                Botão Simples
                            </button>
                            <br />
                            <button
                                type="submit"
                                className="btn btn-light-primary btn-rounded mb-3 me-2"
                            >
                                Botão Simples
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success btn-md mb-3"
                            >
                                Botão Médio
                            </button>
                            <br />
                            <button
                                type="submit"
                                className="btn btn-danger btn-lg me-2"
                            >
                                Botão Grande
                            </button>
                            <button
                                type="submit"
                                className="btn btn-outline-primary"
                            >
                                Botão Contorno
                            </button>
                            <br />
                            <br />
                            <Link
                                href="#"
                                className="btn btn-info rounded-pill mb-3"
                            >
                                Botão Simples
                            </Link>
                            <br />
                            <Link
                                href="#"
                                className="btn btn-light-primary rounded-pill mb-3"
                            >
                                Botão Simples
                            </Link>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h4 className="mb-3">
                                Caixa de Entrada Simples e com Sombra
                            </h4>

                            <div className="form-group">
                                <div className="input-with-icon">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Bairro"
                                    />
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="mb-2">Nome</label>
                                <input
                                    type="text"
                                    className="form-control simple"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h4>Caixas de Seleção e Botões de Rádio</h4>
                            <ul className="no-ul-list">
                                <li>
                                    <input
                                        id="a-1"
                                        className="form-check-input"
                                        name="a-1"
                                        type="checkbox"
                                    />
                                    <label
                                        htmlFor="a-1"
                                        className="form-check-label ms-2"
                                    >
                                        Ar Condicionado
                                    </label>
                                </li>
                                <li>
                                    <input
                                        id="a-2"
                                        className="form-check-input"
                                        name="a-2"
                                        type="checkbox"
                                    />
                                    <label
                                        htmlFor="a-2"
                                        className="form-check-label ms-2"
                                    >
                                        Roupa de Cama
                                    </label>
                                </li>
                            </ul>

                            <ul className="no-ul-list">
                                <li>
                                    <input
                                        id="a-p"
                                        className="form-check-input"
                                        name="a-p"
                                        type="radio"
                                    />
                                    <label
                                        htmlFor="a-p"
                                        className="form-check-label ms-2"
                                    >
                                        Ar Condicionado
                                    </label>
                                </li>
                                <li>
                                    <input
                                        id="a-c"
                                        className="form-check-input"
                                        name="a-c"
                                        type="radio"
                                    />
                                    <label
                                        htmlFor="a-c"
                                        className="form-check-label ms-2"
                                    >
                                        Roupa de Cama
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <FooterTop bg="theme-bg" />
            <Footer />
            <ScrollToTop />
        </div>
    );
}
