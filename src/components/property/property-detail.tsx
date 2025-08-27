"use client";
import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { PROPERTY_TYPE_LABELS } from "@/constants/propertyConstants";
import PropertyMapByAddress from "./PropertyMapByAddress";

const Select = dynamic(() => import("react-select"), { ssr: false });
import Lightbox from "react-18-image-lightbox";

import "../../../node_modules/react-modal-video/css/modal-video.css";
import "../../../node_modules/react-18-image-lightbox/style.css";

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
    age?: string;
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

interface PropertyDetailProps {
    property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
    const [isOpen, setIsOpen] = useState(false);
    let [open, setOpen] = useState<boolean>(true);
    let [open2, setOpen2] = useState<boolean>(true);
    let [open3, setOpen3] = useState<boolean>(true);
    let [open4, setOpen4] = useState<boolean>(false);
    let [open5, setOpen5] = useState<boolean>(false);
    let [open6, setOpen6] = useState<boolean>(false);
    let [open7, setOpen7] = useState<boolean>(false);
    let [open8, setOpen8] = useState<boolean>(true);
    let [open9, setOpen9] = useState<boolean>(true);
    let [open10, setOpen10] = useState<boolean>(true);
    let [show, setShow] = useState<boolean>(false);
    let [show2, setShow2] = useState<boolean>(false);
    let [show3, setShow3] = useState<boolean>(false);

    let [activeIndex, setActiveIndex] = useState<number>(0);
    let [photo, setPhoto] = useState<boolean>(false);

    const onImageClick = (index: number) => {
        setActiveIndex(index);
        setPhoto(true);
    };

    const propertyFeature = [
        {
            title: "Quartos:",
            value: property.bedrooms ? `${property.bedrooms} Quartos` : "N/A",
        },
        {
            title: "Suítes:",
            value: property.suites
                ? `${property.suites} Suíte${property.suites > 1 ? "s" : ""}`
                : "N/A",
        },
        {
            title: "Banheiros:",
            value: property.bathrooms
                ? `${property.bathrooms} Banheiros`
                : "N/A",
        },
        {
            title: "Vagas de Garagem:",
            value: property.parkingSpaces
                ? `${property.parkingSpaces} Vaga${
                      property.parkingSpaces > 1 ? "s" : ""
                  }`
                : "N/A",
        },
        {
            title: "Cômodos:",
            value: property.rooms
                ? `${property.rooms} Cômodo${property.rooms > 1 ? "s" : ""}`
                : "N/A",
        },
        {
            title: "Andar:",
            value: property.floor ? `Andar ${property.floor}` : "N/A",
        },
        {
            title: "Ano de Construção:",
            value: property.yearBuilt ? property.yearBuilt.toString() : "N/A",
        },
        {
            title: "Área Utilizável:",
            value: property.usableArea ? `${property.usableArea} m²` : "N/A",
        },
        {
            title: "Área Total:",
            value: property.totalArea ? `${property.totalArea} m²` : "N/A",
        },
        {
            title: "Condomínio:",
            value: property.condoFee
                ? `R$ ${property.condoFee.toLocaleString("pt-BR")}`
                : "N/A",
        },
        {
            title: "IPTU:",
            value: property.iptu
                ? `R$ ${property.iptu.toLocaleString("pt-BR")}`
                : "N/A",
        },
        {
            title: "Idade do Imóvel:",
            value: property.age ? property.age : "N/A",
        },
        {
            title: "Tipo de Imóvel:",
            value:
                PROPERTY_TYPE_LABELS[
                    property.type as keyof typeof PROPERTY_TYPE_LABELS
                ] || property.type,
        },
        {
            title: "Status:",
            value:
                property.status === "FOR_SALE" ? "Para Venda" : "Para Alugar",
        },
        {
            title: "Mobília:",
            value: property.furnished ? "Incluída" : "Não incluída",
        },
    ];

    const galleryImg = property.images
        ? property.images.map((img) => img.url)
        : [];

    const rating = [
        { value: "1", label: "01 Star" },
        { value: "1", label: "02 Star" },
        { value: "1", label: "03 Star" },
        { value: "1", label: "04 Star" },
        { value: "1", label: "05 Star" },
    ];

    return (
        <>
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen(!open)}
                        className={open ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">
                            Detalhes e Características
                        </h4>
                    </Link>
                </div>
                <div
                    id="clOne"
                    className={`panel-collapse collapse ${open ? "show" : ""}`}
                >
                    <div className="block-body">
                        <ul className="deatil_features">
                            {propertyFeature.map((item: any, index: number) => (
                                <li key={index}>
                                    <strong>{item.title}</strong>
                                    {item.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen2(!open2)}
                        className={open2 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">Descrição</h4>
                    </Link>
                </div>
                <div
                    id="clTwo"
                    className={`panel-collapse collapse ${open2 ? "show" : ""}`}
                >
                    <div className="block-body">
                        {property.description ? (
                            <p>{property.description}</p>
                        ) : (
                            <p>
                                Este imóvel oferece uma excelente oportunidade
                                de investimento imobiliário. Com localização
                                privilegiada, apresenta características que
                                atendem às necessidades de diversos perfis de
                                moradores ou investidores. Entre em contato
                                conosco para obter mais informações sobre este
                                imóvel e agendar uma visita.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {((property.privateAmenities &&
                Array.isArray(property.privateAmenities) &&
                property.privateAmenities.length > 0) ||
                (property.commonAmenities &&
                    Array.isArray(property.commonAmenities) &&
                    property.commonAmenities.length > 0) ||
                property.petsAllowed ||
                property.furnished) && (
                <div className="property_block_wrap style-2">
                    <div className="property_block_wrap_header">
                        <Link
                            href="#"
                            scroll={false}
                            onClick={() => setOpen3(!open3)}
                            className={open3 ? "" : "collapsed"}
                        >
                            <h4 className="property_block_title">
                                Comodidades
                            </h4>
                        </Link>
                    </div>
                    <div
                        id="clThree"
                        className={`panel-collapse collapse ${
                            open3 ? "show" : ""
                        }`}
                    >
                        <div className="block-body">
                            <ul className="avl-features third color">
                                {property.privateAmenities &&
                                    Array.isArray(property.privateAmenities) &&
                                    property.privateAmenities.map(
                                        (amenity: string, index: number) => (
                                            <li key={`private-${index}`}>
                                                {amenity}
                                            </li>
                                        )
                                    )}
                                {property.commonAmenities &&
                                    Array.isArray(property.commonAmenities) &&
                                    property.commonAmenities.map(
                                        (amenity: string, index: number) => (
                                            <li key={`common-${index}`}>
                                                {amenity}
                                            </li>
                                        )
                                    )}
                                {property.petsAllowed && (
                                    <li>Permite Animais</li>
                                )}
                                {property.furnished && (
                                    <li>Mobília incluída</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* LOCALIZAÇÃO */}
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen6(!open6)}
                        className={open6 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">Localização</h4>
                    </Link>
                </div>
                <div
                    id="clSix"
                    className={`panel-collapse collapse ${open6 ? "show" : ""}`}
                >
                    <div
                        className="block-body"
                        style={{
                            paddingBottom:
                                "20px" /* reduz espaço extra abaixo do mapa */,
                        }}
                    >
                        {/* Removi .map-container para não herdar altura fixa do tema */}
                        <div
                            className="w-100"
                            style={{ padding: 0, margin: 0 }}
                        >
                            <PropertyMapByAddress
                                endereco={{
                                    logradouro: property.street,
                                    numero: property.streetNumber,
                                    bairro: property.neighborhood,
                                    cidade: property.city,
                                    estado: property.state,
                                    cep: property.zipCode,
                                    pais: "Brasil",
                                }}
                                zoom={15}
                                ratio="3/2" // mais alto que 16/9; ajuste para "4/3" se quiser ainda mais alto
                                className="w-100"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* GALERIA */}
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen7(!open7)}
                        className={open7 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">Galeria</h4>
                    </Link>
                </div>
                <div
                    id="clSev"
                    className={`panel-collapse collapse ${open7 ? "show" : ""}`}
                >
                    <div className="block-body">
                        {galleryImg.length > 0 ? (
                            <>
                                <ul className="list-gallery-inline">
                                    {galleryImg.map(
                                        (item: any, index: number) => (
                                            <li key={index}>
                                                <Link
                                                    href="#"
                                                    className="mfp-gallery"
                                                    onClick={() =>
                                                        onImageClick(index)
                                                    }
                                                >
                                                    <Image
                                                        src={item}
                                                        width={0}
                                                        height={0}
                                                        sizes="100vw"
                                                        style={{
                                                            width: "100%",
                                                            height: "auto",
                                                        }}
                                                        className="img-fluid mx-auto"
                                                        alt=""
                                                    />
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                                {photo && (
                                    <Lightbox
                                        mainSrc={galleryImg[activeIndex]}
                                        nextSrc={
                                            galleryImg[
                                                (activeIndex + 1) %
                                                    galleryImg.length
                                            ]
                                        }
                                        prevSrc={
                                            galleryImg[
                                                (activeIndex +
                                                    galleryImg.length -
                                                    1) %
                                                    galleryImg.length
                                            ]
                                        }
                                        onCloseRequest={() => setPhoto(false)}
                                        onMovePrevRequest={() =>
                                            setActiveIndex(
                                                (activeIndex +
                                                    galleryImg.length -
                                                    1) %
                                                    galleryImg.length
                                            )
                                        }
                                        onMoveNextRequest={() =>
                                            setActiveIndex(
                                                (activeIndex + 1) %
                                                    galleryImg.length
                                            )
                                        }
                                    />
                                )}
                            </>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "2rem",
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "8px",
                                }}
                            >
                                <p style={{ margin: 0, color: "#6c757d" }}>
                                    Nenhuma imagem disponível para este imóvel
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTATO */}
            <div className="property_block_wrap style-2">
                <div className="property_block_wrap_header">
                    <Link
                        href="#"
                        scroll={false}
                        onClick={() => setOpen10(!open10)}
                        className={open10 ? "" : "collapsed"}
                    >
                        <h4 className="property_block_title">
                            Enviar Mensagem para o Corretor
                        </h4>
                    </Link>
                </div>
                <div
                    id="clTen"
                    className={`panel-collapse collapse ${
                        open10 ? "show" : ""
                    }`}
                >
                    <div className="block-body">
                        <form className="form-submit">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Seu Nome"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Seu E-mail"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <textarea
                                            className="form-control ht-80"
                                            placeholder="Mensagem"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary fw-medium px-lg-5 rounded"
                                            type="submit"
                                        >
                                            Enviar Mensagem
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
