"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

const settings = {
    items: 1,
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    nav: true,
    speed: 400,
    gutter: 0,
};

export default function GridProperty({
    item,
    border,
}: {
    item: any;
    border: any;
}) {
    return (
        <div
            className={`property-listing card rounded-3 ${
                border ? "border" : "border-0"
            }`}
        >
            <div className={`listing-img-wrapper p-3`}>
                <div className="list-img-slide position-relative">
                    <div className="position-absolute top-0 left-0 ms-3 mt-3 z-1">
                        {/* badges opcional */}
                    </div>

                    <div className="click rounded-3 overflow-hidden mb-0">
                        <TinySlider settings={settings}>
                            {item.image.map((el: any, index: number) => (
                                <div key={index}>
                                    <Link href={`/imovel/${item.id}`}>
                                        <Image
                                            src={el}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            style={{
                                                width: "100%",
                                                height: "250px",
                                                objectFit: "cover",
                                            }}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                            ))}
                        </TinySlider>
                    </div>
                </div>
            </div>

            <div className="listing-caption-wrapper px-3">
                <div className="listing-detail-wrapper">
                    <div className="listing-short-detail-wrap">
                        <div className="listing-short-detail">
                            <div className="d-flex align-items-center flex-wrap gap-2">
                                {item.tag2 === "For Rent" && (
                                    <span className="label bg-light-success text-success prt-type me-2">
                                        Para Aluguel
                                    </span>
                                )}
                                {item.tag2 === "For Sell" && (
                                    <span className="label bg-light-danger text-danger prt-type me-2">
                                        Para Venda
                                    </span>
                                )}
                                <span className="label bg-light-purple text-purple property-cats">
                                    {item.type}
                                </span>
                            </div>

                            <h4 className="listing-name fw-semibold fs-5 mt-3 mb-2">
                                <Link href={`/imovel/${item.id}`}>
                                    {item.name}
                                </Link>
                            </h4>

                            {/* Localização — agora com o mesmo ícone/círculo dos demais */}
                            <div className="prt-location text-muted-2 d-flex align-items-center gap-2 flex-wra mt-2">
                                <div className="square--35 text-muted-2 fs-md circle gray-simple d-inline-flex align-items-center justify-content-center">
                                    <i className="fa-solid fa-location-dot fa-lg"></i>
                                </div>
                                <span className="location-text small">
                                    {item.loction}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEATURES — 3 colunas sempre lado a lado */}
                <div className="price-features-wrapper mt-3">
                    <div className="row row-cols-3 g-2 g-sm-3">
                        {/* Área - Size */}
                        <div className="col d-flex align-items-center">
                            <div className="square--35 text-muted-2 fs-md circle gray-simple me-2 d-flex align-items-center justify-content-center">
                                <i className="fa-solid fa-building-shield fa-lg feature-icon"></i>
                            </div>
                            <span className="text-muted-2 fw-medium feature-text">
                                {item.size}
                            </span>
                        </div>

                        {/* Quartos - Beds */}
                        <div className="col d-flex align-items-center">
                            <div className="square--35 text-muted-2 fs-md circle gray-simple me-2 d-flex align-items-center justify-content-center">
                                <i className="fa-solid fa-bed fa-lg feature-icon"></i>
                            </div>
                            <span className="text-muted-2 fw-medium feature-text">
                                {item.beds}
                            </span>
                        </div>

                        {/* Metragem - Sqft */}
                        <div className="col d-flex align-items-center">
                            <div className="square--35 text-muted-2 fs-md circle gray-simple me-2 d-flex align-items-center justify-content-center">
                                <i className="fa-solid fa-clone fa-lg feature-icon"></i>
                            </div>
                            <span className="text-muted-2 fw-medium feature-text">
                                {item.sqft}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="listing-detail-footer d-flex align-items-center justify-content-between py-4 flex-wrap gap-2">
                    <div className="listing-short-detail-flex">
                        <h6 className="listing-card-info-price m-0">
                            {item.value}
                        </h6>
                    </div>
                    <div className="footer-flex">
                        <Link href={`/imovel/${item.id}`} className="prt-view">
                            <button className="btn btn-light-primary fw-medium rounded btn-sm">
                                Saiba mais...
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
