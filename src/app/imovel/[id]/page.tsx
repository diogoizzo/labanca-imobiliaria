"use client";

import React from "react";
import { useParams } from "next/navigation";
import HomeSliderTwo from "../../../components/slider/home-slider-two";
import PropertyDetail from "../../../components/property/property-detail";
import DetailSidebar from "../../../components/property/detail-sidebar";
import FooterTop from "../../../components/footer-top";
import Footer from "../../../components/footer";
import ScrollToTop from "../../../components/scroll-to-top";
import SuspenseNavbar from "@/components/navbar/SuspenseNavbar";
import { notFound } from "next/navigation";
import { useProperty } from "@/hooks/propertyHooks";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

export default function Page() {
    const params = useParams();
    const id = params.id as string;

    const { data: property, isLoading, error } = useProperty(id);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        if ((error as any).status === 404) {
            notFound();
        }
        console.error("Error fetching property:", error);
        notFound();
    }

    if (!property) {
        notFound();
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    const statusLabel =
        property.status === "FOR_SALE" ? "Para Venda" : "Para Alugar";

    // Extrair URLs das imagens para o slider (ordenadas por relevância)
    const propertyImages = property.images
        ? property.images
              .sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0))
              .map((img: any) => img.url)
        : [];

    return (
        <>
            <SuspenseNavbar transparent={false} />

            <HomeSliderTwo images={propertyImages} />

            <section className="gray-simple">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className="property_block_wrap style-2 p-4">
                                <div className="prt-detail-title-desc">
                                    <span className="label text-light bg-success">
                                        {statusLabel}
                                    </span>
                                    <h3 className="mt-3">{property.title}</h3>
                                    <span>
                                        <i className="lni-map-marker"></i>{" "}
                                        {property.street &&
                                        property.streetNumber
                                            ? `${property.street}, ${
                                                  property.streetNumber
                                              }, ${
                                                  property.neighborhood || ""
                                              }, ${
                                                  property.city || ""
                                              }`.replace(/, ,|,$/, "")
                                            : `${
                                                  property.neighborhood || ""
                                              }, ${
                                                  property.city || ""
                                              }`.replace(/^, |, $/, "")}
                                    </span>
                                    <h3 className="prt-price-fix text-primary mt-2">
                                        {formatPrice(property.price)}
                                    </h3>
                                    <div className="list-fx-features">
                                        <div className="listing-card-info-icon">
                                            <div className="inc-fleat-icon me-1">
                                                <img
                                                    src="/img/bed.svg"
                                                    width="13"
                                                    alt=""
                                                />
                                            </div>
                                            {property.bedrooms || 0}
                                        </div>
                                        <div className="listing-card-info-icon">
                                            <div className="inc-fleat-icon me-1">
                                                <img
                                                    src="/img/bathtub.svg"
                                                    width="13"
                                                    alt=""
                                                />
                                            </div>
                                            {property.bathrooms || 0}
                                        </div>
                                        <div className="listing-card-info-icon">
                                            <div className="inc-fleat-icon me-1">
                                                <img
                                                    src="/img/move.svg"
                                                    width="13"
                                                    alt=""
                                                />
                                            </div>
                                            {property.usableArea
                                                ? `${property.usableArea} m²`
                                                : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <PropertyDetail property={property} />
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <DetailSidebar property={property} />
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
