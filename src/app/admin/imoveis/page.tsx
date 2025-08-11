"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { PROPERTY_TYPE_LABELS } from "@/constants/propertyConstants";
import UserNav from "../../../components/navbar/user-nav";
import AdminSidebar from "../../../components/admin-sidebar";
import Footer from "../../../components/footer";
import FooterTop from "../../../components/footer-top";
import ScrollToTop from "../../../components/scroll-to-top";
import { getAllProperties, deleteProperty } from "@/services/propertyService";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<string | null>(
        null
    );
    const itemsPerPage = 10;

    const queryClient = useQueryClient();
    const { data: properties = [] } = useQuery({
        queryKey: ["properties"],
        queryFn: getAllProperties,
    });

    const filteredProperties = useMemo(() => {
        const term = searchTerm
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        return properties.filter((p) => {
            const combined = [p.title, p.city, p.state]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            return combined.includes(term);
        });
    }, [properties, searchTerm]);

    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProperties = filteredProperties.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <>
            <UserNav />

            <div className="page-title">
                <div className="container">
                    <h2 className="ipt-title">Seu Portal de Imóveis Labanca</h2>
                    <span className="ipn-subtitle">
                        Gerencie seus imóveis em Barra do Piraí
                    </span>
                </div>
            </div>

            <section className="bg-light">
                <div className="container-fluid">
                    <div className="filter_search_opt mb-4">
                        <button
                            className="btn btn-dark"
                            onClick={() => setShow(!show)}
                        >
                            Navegação do Painel
                            <i className="fa-solid fa-bars ms-2"></i>
                        </button>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <AdminSidebar show={show} setShow={setShow} />
                        </div>

                        <div className="col-lg-9 col-md-12">
                            <div className="dashboard-wraper">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4>Seu Portfólio Labanca</h4>
                                    <input
                                        type="text"
                                        placeholder="Buscar propriedades..."
                                        className="form-control"
                                        style={{ maxWidth: "300px" }}
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="row">
                                    {paginatedProperties.map((item) => (
                                        <div
                                            className="col-12 mb-2"
                                            key={item.id}
                                        >
                                            <div className="singles-dashboard-list d-flex align-items-stretch">
                                                {/* imagem ocupa toda a altura do card */}
                                                <div
                                                    className="sd-list-left me-3 position-relative"
                                                    style={{
                                                        flex: "0 0 230px",
                                                    }}
                                                >
                                                    <Image
                                                        src={
                                                            item.images[0]
                                                                ?.url ||
                                                            "/img/sem-imagem.png"
                                                        }
                                                        alt={item.title}
                                                        fill
                                                        style={{
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>

                                                {/* texto + ações */}
                                                <div className="sd-list-right d-flex justify-content-between align-items-center flex-grow-1">
                                                    <div>
                                                        <h4 className="listing_dashboard_title mb-1">
                                                            <Link
                                                                href="#"
                                                                className="text-primary"
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </h4>
                                                        <div className="user_dashboard_listed">
                                                            <i className="fa-solid fa-location-dot text-primary me-2"></i>
                                                            {item.city},{" "}
                                                            {item.state}
                                                        </div>
                                                        <div className="user_dashboard_listed mt-1">
                                                            <strong>
                                                                Valor:
                                                            </strong>{" "}
                                                            {new Intl.NumberFormat(
                                                                "pt-BR",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "BRL",
                                                                }
                                                            ).format(
                                                                item.price
                                                            )}
                                                        </div>
                                                        <div className="user_dashboard_listed mt-1">
                                                            <strong>
                                                                Tipo:
                                                            </strong>{" "}
                                                            {item.type}
                                                        </div>
                                                    </div>

                                                    <div className="d-flex">
                                                        {[
                                                            {
                                                                title: "Ver",
                                                                icon: (
                                                                    <FaEye
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                ),
                                                                onClick:
                                                                    () => {},
                                                            },
                                                            {
                                                                title: "Editar",
                                                                icon: (
                                                                    <FaEdit
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                ),
                                                                onClick: () => {
                                                                    router.push(
                                                                        `/admin/imoveis/${item.id}/`
                                                                    );
                                                                },
                                                            },
                                                            {
                                                                title: "Excluir",
                                                                icon: (
                                                                    <FaTrash
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                ),
                                                                onClick: (
                                                                    e: React.MouseEvent
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setSelectedProperty(
                                                                        item.id
                                                                    );
                                                                    setShowModal(
                                                                        true
                                                                    );
                                                                },
                                                            },
                                                        ].map(
                                                            (
                                                                {
                                                                    title,
                                                                    icon,
                                                                    onClick,
                                                                },
                                                                i
                                                            ) => (
                                                                <button
                                                                    key={title}
                                                                    title={
                                                                        title
                                                                    }
                                                                    onClick={
                                                                        onClick
                                                                    }
                                                                    className={`btn btn-secondary p-0 d-flex align-items-center justify-content-center rounded ${
                                                                        i < 2
                                                                            ? "me-3"
                                                                            : ""
                                                                    }`}
                                                                    style={{
                                                                        width: "36px",
                                                                        height: "36px",
                                                                    }}
                                                                >
                                                                    {icon}
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Paginação */}
                                <div className="d-flex justify-content-end align-items-center mt-3">
                                    <button
                                        className="btn btn-light text-secondary me-2"
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-primary fw-bold">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                    <button
                                        className="btn btn-light text-secondary ms-2"
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                    >
                                        Próximo
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

            {showModal && (
                <>
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex={-1}
                        role="dialog"
                    >
                        <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                        >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Confirmar Exclusão
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Tem certeza que deseja excluir este
                                        imóvel? Esta ação removerá também todas
                                        as imagens associadas.
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={async () => {
                                            if (selectedProperty) {
                                                try {
                                                    await deleteProperty(
                                                        selectedProperty
                                                    );
                                                    queryClient.invalidateQueries(
                                                        {
                                                            queryKey: [
                                                                "properties",
                                                            ],
                                                        }
                                                    );
                                                    setShowModal(false);
                                                    setSelectedProperty(null);
                                                } catch (error) {
                                                    console.error(
                                                        "Erro ao excluir imóvel:",
                                                        error
                                                    );
                                                    alert(
                                                        "Erro ao excluir imóvel. Tente novamente."
                                                    );
                                                }
                                            }
                                        }}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop fade show"
                        style={{ display: "block" }}
                    ></div>
                </>
            )}
        </>
    );
}
