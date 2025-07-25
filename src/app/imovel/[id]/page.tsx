import React from "react";
import HomeSliderTwo from "../../../components/slider/home-slider-two";
import PropertyDetail from "../../../components/property/property-detail";
import DetailSidebar from "../../../components/property/detail-sidebar";
import FooterTop from "../../../components/footer-top";
import Footer from "../../../components/footer";
import ScrollToTop from "../../../components/scroll-to-top";
import { propertyData } from "@/app/data/data";
import SuspenseNavbar from "@/components/navbar/SuspenseNavbar";

export default function Page({ params }: { params: { id: string } }) {
    let data = propertyData.find(
        (item: any) => item.id === parseInt(params.id)
    );
    return (
        <>
            <SuspenseNavbar transparent={false} />

            <HomeSliderTwo />

            <section className="gray-simple">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className="property_block_wrap style-2 p-4">
                                <div className="prt-detail-title-desc">
                                    <span className="label text-light bg-success">
                                        Para Venda
                                    </span>
                                    <h3 className="mt-3">{data?.name}</h3>
                                    <span>
                                        <i className="lni-map-marker"></i>{" "}
                                        {data?.loction}
                                    </span>
                                    <h3 className="prt-price-fix text-primary mt-2">
                                        {data?.value}
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
                                            {data?.beds}
                                        </div>
                                        <div className="listing-card-info-icon">
                                            <div className="inc-fleat-icon me-1">
                                                <img
                                                    src="/img/bathtub.svg"
                                                    width="13"
                                                    alt=""
                                                />
                                            </div>
                                            {data?.baths}
                                        </div>
                                        <div className="listing-card-info-icon">
                                            <div className="inc-fleat-icon me-1">
                                                <img
                                                    src="/img/move.svg"
                                                    width="13"
                                                    alt=""
                                                />
                                            </div>
                                            {data?.sqft}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <PropertyDetail />
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <DetailSidebar />
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
