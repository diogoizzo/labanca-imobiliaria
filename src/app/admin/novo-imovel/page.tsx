"use client";
import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import UserNav from "../../../components/navbar/user-nav";
import AdminSidebar from "../../../components/admin-sidebar";
import FooterTop from "../../../components/footer-top";
import Footer from "../../../components/footer";
import ScrollToTop from "../../../components/scroll-to-top";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function page() {
    let [show, setShow] = useState(false);

    const status = [
        { value: "1", label: "Para Alugar" },
        { value: "2", label: "Para Venda" },
    ];

    const ptypes = [
        { value: "1", label: "Casas" },
        { value: "2", label: "Apartamentos" },
        { value: "3", label: "Vilas" },
        { value: "4", label: "Comercial" },
        { value: "5", label: "Escritórios" },
        { value: "6", label: "Garagem" },
    ];

    const bedrooms = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
    ];

    const bathrooms = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
    ];

    const age = [
        { value: "1", label: "0 - 5 Anos" },
        { value: "2", label: "0 - 10 Anos" },
        { value: "3", label: "0 - 15 Anos" },
        { value: "4", label: "0 - 20 Anos" },
        { value: "5", label: "20+ Anos" },
    ];

    const garage = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
    ];

    const rooms = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
    ];

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
                        <div className="col-lg-12 col-md-12">
                            <div className="filter_search_opt">
                                <Link
                                    href=""
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
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="submit-pages">
                                            <div className="form-submit">
                                                <h3 className="mb-3">
                                                    Informações Básicas
                                                </h3>
                                                <div className="submit-section">
                                                    <div className="row">
                                                        <div className="form-group col-md-12">
                                                            <label className="mb-2">
                                                                Título do Imóvel
                                                                <span
                                                                    className="tip-topdata"
                                                                    data-tip="Título do Imóvel"
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
                                                                Status
                                                            </label>
                                                            <Select
                                                                options={status}
                                                                className="form-control"
                                                                placeholder="Selecione o Status"
                                                            />
                                                        </div>

                                                        <div className="form-group col-md-6">
                                                            <label className="mb-2">
                                                                Tipo de Imóvel
                                                            </label>
                                                            <Select
                                                                options={ptypes}
                                                                className="form-control"
                                                                placeholder="Mostrar Todos"
                                                            />
                                                        </div>

                                                        <div className="form-group col-md-6">
                                                            <label className="mb-2">
                                                                Preço
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="R$"
                                                            />
                                                        </div>

                                                        <div className="form-group col-md-6">
                                                            <label className="mb-2">
                                                                Área (m²)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                            />
                                                        </div>

                                                        <div className="form-group col-md-6">
                                                            <label className="mb-2">
                                                                Quartos
                                                            </label>
                                                            <Select
                                                                options={
                                                                    bedrooms
                                                                }
                                                                className="form-control"
                                                                placeholder="Quartos"
                                                            />
                                                        </div>

                                                        <div className="form-group col-md-6">
                                                            <label className="mb-2">
                                                                Banheiros
                                                            </label>
                                                            <Select
                                                                options={
                                                                    bathrooms
                                                                }
                                                                className="form-control"
                                                                placeholder="Banheiros"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-submit">
                                                <h3>Galeria</h3>
                                                <div className="submit-section">
                                                    <div className="row">
                                                        <div className="form-group col-md-12">
                                                            <label>
                                                                Enviar Fotos
                                                            </label>
                                                            <form
                                                                action="/upload-target"
                                                                className="dropzone dz-clickable primary-dropzone"
                                                            >
                                                                <div className="dz-default dz-message">
                                                                    <i className="ti-gallery"></i>
                                                                    <span>
                                                                        Arraste
                                                                        e solte
                                                                        fotos
                                                                        aqui
                                                                    </span>
                                                                </div>
                                                            </form>
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
                                                                Cidade
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
                                                <h3>Informações Detalhadas</h3>
                                                <div className="submit-section">
                                                    <div className="row">
                                                        <div className="form-group col-md-12">
                                                            <label className="mb-2">
                                                                Descrição
                                                            </label>
                                                            <textarea className="form-control h-120"></textarea>
                                                        </div>

                                                        <div className="form-group col-md-4">
                                                            <label className="mb-2">
                                                                Idade do Imóvel
                                                                (opcional)
                                                            </label>
                                                            <Select
                                                                options={age}
                                                                className="form-control"
                                                                placeholder="Selecione uma opção"
                                                            />
                                                        </div>

                                                        <div className="form-group col-md-4">
                                                            <label className="mb-2">
                                                                Garagem
                                                                (opcional)
                                                            </label>
                                                            <Select
                                                                options={garage}
                                                                className="form-control"
                                                                placeholder="Selecione"
                                                            />
                                                        </div>

                                                        <div className="form-group col-md-4">
                                                            <label className="mb-2">
                                                                Cômodos
                                                                (opcional)
                                                            </label>
                                                            <Select
                                                                options={rooms}
                                                                className="form-control"
                                                                placeholder="Escolha Cômodos"
                                                            />
                                                        </div>

                                                        <div className="form-group col-md-12">
                                                            <label className="mb-2">
                                                                Outras
                                                                Características
                                                                (opcionais)
                                                            </label>
                                                            <div className="o-features">
                                                                <ul className="no-ul-list third-row">
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
                                                                            Ar
                                                                            Condicionado
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
                                                                            Roupa
                                                                            de
                                                                            Cama
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-3"
                                                                            className="form-check-input"
                                                                            name="a-3"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-3"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Aquecimento
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-4"
                                                                            className="form-check-input"
                                                                            name="a-4"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-4"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Internet
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-5"
                                                                            className="form-check-input"
                                                                            name="a-5"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-5"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Microondas
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-6"
                                                                            className="form-check-input"
                                                                            name="a-6"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-6"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Permite
                                                                            Fumar
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-7"
                                                                            className="form-check-input"
                                                                            name="a-7"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-7"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Terraço
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-8"
                                                                            className="form-check-input"
                                                                            name="a-8"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-8"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Varanda
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-9"
                                                                            className="form-check-input"
                                                                            name="a-9"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-9"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Ícone
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-10"
                                                                            className="form-check-input"
                                                                            name="a-10"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-10"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Wi-Fi
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-11"
                                                                            className="form-check-input"
                                                                            name="a-11"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-11"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Praia
                                                                        </label>
                                                                    </li>
                                                                    <li>
                                                                        <input
                                                                            id="a-12"
                                                                            className="form-check-input"
                                                                            name="a-12"
                                                                            type="checkbox"
                                                                        />
                                                                        <label
                                                                            htmlFor="a-12"
                                                                            className="form-check-label ms-2"
                                                                        >
                                                                            Estacionamento
                                                                        </label>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-submit">
                                                <h3>Informações de Contato</h3>
                                                <div className="submit-section">
                                                    <div className="row">
                                                        <div className="form-group col-md-4">
                                                            <label className="mb-2">
                                                                Nome
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label className="mb-2">
                                                                E-mail
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-4">
                                                            <label className="mb-2">
                                                                Telefone
                                                                (opcional)
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
                                                <label>
                                                    Termos de Privacidade *
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
                                                            Eu concordo que este
                                                            site armazene minhas
                                                            informações enviadas
                                                            para que possam
                                                            responder à minha
                                                            solicitação.
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="form-group col-lg-12 col-md-12">
                                                <button
                                                    className="btn btn-primary px-5 rounded"
                                                    type="submit"
                                                >
                                                    Publicar Imóvel
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

            <FooterTop bg="theme-bg " />

            <Footer />

            <ScrollToTop />
        </>
    );
}
