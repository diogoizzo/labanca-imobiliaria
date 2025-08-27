import React from "react";
import Link from "next/link";
import Image from "next/image";

import { featureProperty } from "@/app/data/property";

interface Property {
    id: string;
    title: string;
    status: string;
    type: string;
    price: number;
    description?: string;
    bedrooms?: number;
    bathrooms?: number;
    suites?: number;
    parkingSpaces?: number;
    rooms?: number;
    floor?: number;
    yearBuilt?: number;
    usableArea?: number;
    totalArea?: number;
    condoFee?: number;
    iptu?: number;
    privateAmenities?: any;
    commonAmenities?: any;
    petsAllowed?: boolean;
    furnished?: boolean;
    images: Array<{
        id: string;
        url: string;
        sortOrder?: number;
    }>;
    realtor: {
        id: string;
        fullName: string;
        phone?: string;
        email: string;
    };
    latitude?: number;
    longitude?: number;
    street?: string;
    streetNumber?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

interface DetailSidebarProps {
    property: Property;
}

export default function DetailSidebar({ property }: DetailSidebarProps) {
    return (
        <>
            <div className="details-sidebar">
                <div className="sides-widget">
                    <div className="sides-widget-header bg-primary">
                        <div className="agent-photo">
                            <Image
                                src="/img/user-6.jpg"
                                width={60}
                                height={60}
                                alt=""
                            />
                        </div>

                        <div className="sides-widget-details">
                            <h4>
                                <Link href="#">
                                    {property.realtor?.fullName ||
                                        "Corretor não informado"}
                                </Link>
                            </h4>

                            <span>
                                {property.realtor?.phone ||
                                    "Telefone não informado"}
                            </span>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <div className="sides-widget-body simple-form">
                        {/* <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Seu E-mail"
                            />
                        </div>
                        <div className="form-group">
                            <label>Telefone</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Seu Telefone"
                            />
                        </div> */}
                        {/* <div className="form-group">
                            <label>Mensagem</label>
                            <textarea
                                className="form-control"
                                defaultValue="Tenho interesse nesta propriedade e gostaria de mais informações."
                            />
                        </div> */}
                        <button className="btn btn-light-primary fw-medium rounded full-width">
                            <img
                                src="/img/svg/whatsapp-icon.svg"
                                width={20}
                                height={20}
                                className="me-3 whatsapp-icon"
                                alt=""
                            />
                            Enviar Mensagem
                        </button>
                    </div>
                </div>

                {/* <div className="sides-widget">
                    <div className="sides-widget-header bg-primary">
                        <div className="sides-widget-details">
                            <h4>Calculadora de Financiamento</h4>
                            <span>Calcule sua Taxa de Juros</span>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <div className="sides-widget-body simple-form">
                        <div className="form-group">
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Preço de Venda"
                                />
                                <i className="fa-solid fa-sack-dollar"></i>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Entrada"
                                />
                                <i className="fa-solid fa-piggy-bank"></i>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Prazo do Empréstimo (Anos)"
                                />
                                <i className="fa-regular fa-calendar-days"></i>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Taxa de Juros"
                                />
                                <i className="fa fa-percent"></i>
                            </div>
                        </div>
                        <button className="btn btn-light-primary fw-medium rounded full-width">
                            Calcular
                        </button>
                    </div>
                </div> */}

                <div className="sidebar-widgets">
                    <h4>Propriedades em Destaque</h4>

                    <div className="sidebar_featured_property">
                        {featureProperty.map((item: any, index: number) => {
                            return (
                                <div
                                    className="sides_list_property"
                                    key={index}
                                >
                                    <div className="sides_list_property_thumb">
                                        <Image
                                            src={item.image}
                                            width={125}
                                            height={75}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    <div className="sides_list_property_detail">
                                        <h4>
                                            <Link href="/single-property-1">
                                                {item.name}
                                            </Link>
                                        </h4>
                                        <span>
                                            <i className="fa-solid fa-location-dot mt-2"></i>
                                            {item.loction}
                                        </span>
                                        <div className="lists_property_price">
                                            <div className="lists_property_types">
                                                {item.type === "For Sale" && (
                                                    <div className="property_types_vlix sale">
                                                        Para Venda
                                                    </div>
                                                )}
                                                {item.type === "For Rent" && (
                                                    <div className="property_types_vlix">
                                                        Para Aluguel
                                                    </div>
                                                )}
                                            </div>
                                            <div className="lists_property_price_value">
                                                <h4>{item.value}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
