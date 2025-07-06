import React from "react";
import SuspenseNavbar from "../../../components/navbar/SuspenseNavbar";
import FooterTop from "../../../components/footer-top";
import Footer from "../../../components/footer";
import AddImg from "../../../components/add-img";
import ScrollToTop from "../../../components/scroll-to-top";
import SessionWrapper from "@/components/auth/SessionWrapper";

export default function Page() {
    return (
        <>
            <SessionWrapper>
                <SuspenseNavbar transparent={false} />
            </SessionWrapper>
            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">
                                Atualize Seu Perfil Labanca
                            </h2>
                            <span className="ipn-subtitle">
                                Mantenha seus dados atualizados para melhor
                                atendimento em Barra do Piraí
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="gray-simple">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="submit-page">
                                <div className="form-submit middle-logo">
                                    <h3>Sua Imagem Profissional</h3>
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
                                                    defaultValue="Nome do Corretor"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Cargo
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
                                                    E-mail
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="email@corretor.com"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Telefone Fixo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="(XX) XXXX-XXXX"
                                                />
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label className="mb-2">
                                                    Descrição
                                                </label>
                                                <textarea
                                                    className="form-control h-120"
                                                    defaultValue="Conte sobre sua experiência no mercado imobiliário de Barra do Piraí"
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
                                                    defaultValue="Rua Exemplo, 123"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Endereço 2
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Complemento"
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    País
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="Brasil"
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
                                                    CEP
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="27175-000"
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
                                                    defaultValue="https://facebook.com/seuperfil"
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Twitter
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="https://twitter.com/seuperfil"
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    LinkedIn
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="https://linkedin.com/in/seuperfil"
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Google Plus
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="https://plus.google.com/seuperfil"
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Instagram
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="https://instagram.com/seuperfil"
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Tumblr
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue="https://tumblr.com/seuperfil"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-12 col-md-12">
                                    <label className="mb-2">
                                        Acordo GDPR *
                                    </label>
                                    <ul className="no-ul-list">
                                        <li>
                                            <input
                                                id="aj-1"
                                                className="form-check-input"
                                                name="aj-1"
                                                type="checkbox"
                                            />
                                            <label
                                                htmlFor="aj-1"
                                                className="form-check-label ms-2"
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
                                        Atualizar Perfil e Continuar
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
