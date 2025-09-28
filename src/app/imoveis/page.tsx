import React from "react";
import GridOne from "../../components/property/grid-one";
import FooterTop from "../../components/footer-top";
import Footer from "../../components/footer";
import ScrollToTop from "../../components/scroll-to-top";
import SuspenseNavbar from "@/components/navbar/SuspenseNavbar";

interface SearchParams {
    minPrice?: string;
    maxPrice?: string;
    tipo?: string;
    status?: string;
    bedrooms?: string;
    location?: string;
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const initialFilters = {
        minPrice: params.minPrice || "",
        maxPrice: params.maxPrice || "",
        propertyType: params.tipo || "",
        status: params.status || "",
        bedrooms: params.bedrooms || "",
        location: params.location || "",
    };

    return (
        <>
            <SuspenseNavbar transparent={false} />
            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">Imóveis Disponíveis</h2>
                            <span className="ipn-subtitle">
                                Encontre a propriedade ideal para você
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="gray-simple">
                <GridOne initialFilters={initialFilters} />
            </section>

            <FooterTop bg="theme-bg" />

            <Footer />

            <ScrollToTop />
        </>
    );
}
