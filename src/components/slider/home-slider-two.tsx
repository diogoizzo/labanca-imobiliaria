"use client";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";

var settings = {
    dots: true,
    slidesToShow: 2,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    arrows: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    fade: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                centerMode: true,
                centerPadding: "15px",
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                centerMode: false,
                centerPadding: "0px",
                dots: true,
                arrows: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                centerMode: false,
                centerPadding: "0px",
                dots: true,
                arrows: false,
                autoplaySpeed: 3000,
            },
        },
    ],
};

interface HomeSliderTwoProps {
    images?: string[];
}

export default function HomeSliderTwo({ images = [] }: HomeSliderTwoProps) {
    // Se não houver imagens, retorna null para não mostrar o slider
    if (images.length === 0) {
        return (
            <div className="featured_slick_gallery gray">
                <div className="container text-center py-5">
                    <p style={{ color: "#6c757d", margin: 0 }}>
                        Nenhuma imagem disponível para este imóvel
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="featured_slick_gallery gray">
            <div className="featured_slick_gallery-slide home-slider">
                <Slider {...settings}>
                    {images.map((imageUrl, index) => (
                        <div key={index} className="featured_slick_padd">
                            <a href={imageUrl} className="mfp-gallery">
                                <img
                                    src={imageUrl}
                                    className="img-fluid mx-auto"
                                    alt={`Imagem do imóvel ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "400px",
                                        objectFit: "cover",
                                    }}
                                />
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
