import React from "react";

import UserNav from "../../components/navbar/user-nav";
import AddImg from "../../components/add-img";
import FooterTop from "../../components/footer-top";
import Footer from "../../components/footer";
import ScrollToTop from "../../components/scroll-to-top";

export default function Page() {
    return (
        <>
            <UserNav />

            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">
                                Bem-vindo à Equipe Labanca!
                            </h2>
                            <span className="ipn-subtitle">
                                Cadastre um novo corretor para atuar em Barra do
                                Piraí
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="submit-page">
                                <div className="form-submit middle-logo">
                                    <h3>Foto Profissional</h3>
                                    <div className="submit-section">
                                        <div className="form-row">
                                            <div className="form-group col-md-12 position-relative">
                                                <AddImg />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-submit">
                                    <h3>Informações Básicas</h3>
                                    <div className="submit-section">
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <label className="mb-2">
                                                    Nome Completo
                                                    <span
                                                        className="tip-topdata"
                                                        data-tip="Nome Completo do Corretor"
                                                    >
                                                        <i className="fa-solid fa-info"></i>
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Cargo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Telefone
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    E-mail
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Telefone Fixo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label className="mb-2">
                                                    Descrição
                                                </label>
                                                <textarea
                                                    className="form-control h-120"
                                                    placeholder="Descreva a experiência do corretor no mercado imobiliário de Barra do Piraí"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-submit">
                                    <h3>Localização</h3>
                                    <div className="submit-section">
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Endereço
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Endereço 2
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    País
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Estado
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Cidade
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    CEP
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-submit">
                                    <h3>Contas Sociais</h3>
                                    <div className="submit-section">
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Facebook
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Twitter
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    LinkedIn
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Google Plus
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Instagram
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Tumblr
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-12 col-md-12">
                                    <label>Acordo GDPR *</label>
                                    <ul className="no-ul-list">
                                        <li className="form-check">
                                            <input
                                                id="aj-1"
                                                className="form-check-input"
                                                name="aj-1"
                                                type="checkbox"
                                            />
                                            <label
                                                htmlFor="aj-1"
                                                className="form-check-label"
                                            >
                                                Eu concordo que este site
                                                armazene minhas informações
                                                enviadas para que possam
                                                responder à minha solicitação.
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="form-group col-lg-12 col-md-12">
                                    <button
                                        className="btn btn-primary px-5 rounded"
                                        type="submit"
                                    >
                                        Cadastrar Corretor e Continuar
                                    </button>
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
