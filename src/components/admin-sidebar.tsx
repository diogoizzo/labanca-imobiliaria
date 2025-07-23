"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({
    show,
    setShow,
}: {
    show: any;
    setShow: any;
}) {
    const location = usePathname();
    const current = location;
    return (
        <div
            className={`simple-sidebar sm-sidebar ${
                show ? "d-block d-md-block" : "d-none d-md-block"
            }`}
            id="filter_search"
        >
            <div className="search-sidebar_header">
                <h4 className="ssh_heading">Fechar Filtro</h4>
                <button
                    className="w3-bar-item w3-button w3-large"
                    onClick={() => setShow(!show)}
                >
                    <i className="fa-regular fa-circle-xmark fs-5 text-muted-2"></i>
                </button>
            </div>

            <div className="sidebar-widgets">
                <div className="d-navigation">
                    <ul>
                        <li
                            className={current === "/dashboard" ? "active" : ""}
                        >
                            <Link href="/dashboard">
                                <i className="fa-solid fa-gauge"></i>Painel
                            </Link>
                        </li>
                        <li
                            className={
                                current === "/my-profile" ? "active" : ""
                            }
                        >
                            <Link href="/my-profile">
                                <i className="fa-solid fa-address-card"></i>Meu
                                Perfil
                            </Link>
                        </li>
                        <li
                            className={
                                current === "/bookmark-list" ? "active" : ""
                            }
                        >
                            <Link href="/bookmark-list">
                                <i className="fa-solid fa-bookmark"></i>Imóveis
                                Salvos
                            </Link>
                        </li>
                        <li
                            className={
                                current === "/my-property" ? "active" : ""
                            }
                        >
                            <Link href="/my-property">
                                <i className="fa-solid fa-building-circle-check"></i>
                                Minhas Propriedades
                            </Link>
                        </li>
                        <li
                            className={
                                current === "/submit-property-dashboard"
                                    ? "active"
                                    : ""
                            }
                        >
                            <Link href="/submit-property-dashboard">
                                <i className="fa-solid fa-house"></i>Cadastrar
                                Nova Propriedade
                            </Link>
                        </li>
                        <li
                            className={
                                current === "/change-password" ? "active" : ""
                            }
                        >
                            <Link href="/change-password">
                                <i className="fa-solid fa-unlock"></i>Alterar
                                Senha
                            </Link>
                        </li>
                        <li className={current === "#" ? "active" : ""}>
                            <Link href="#">
                                <i className="fa-solid fa-power-off"></i>Sair
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
