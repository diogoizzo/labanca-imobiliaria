import React from "react";
import Link from "next/link";
import Image from "next/image";
import { normalizeText } from "@/lib/textUtils";

const explorePlace = [
    {
        image: "/img/barradopirai.jpg",
        location: "Barra do Piraí",
    },
    {
        image: "/img/valenca-rj.webp",
        location: "Valença",
    },
    {
        image: "/img/vassouras.jpg",
        location: "Vassouras",
        property: "42 Imóveis",
    },
    {
        image: "/img/voltaredonda.jpeg",
        location: "Volta Redonda",
        property: "47 Imóveis",
    },
    {
        image: "/img/pinheiral.webp",
        location: "Pinheiral",
    },
    {
        image: "/img/pirai.jpg",
        location: "Piraí",
        property: "37 Imóveis",
    },
    {
        image: "/img/rio-das-flores.jpg",
        location: "Rio das Flores",
        property: "32 Imóveis",
    },
    {
        image: "/img/mendes-rj.jpeg",
        location: "Mendes",
    },
    {
        image: "/img/miguel-pereira.webp",
        location: "Miguel Pereira",
    },
    {
        image: "/img/paty.jpeg",
        location: "Paty do Alferes",
    },
];

interface Place {
    image: string;
    location: string;
}

export default function ExplorePropertyOne() {
    // Função para gerar o link com filtro de localização
    const getLocationUrl = (location: string) => {
        // Mapeamento dos nomes amigáveis para os valores normalizados
        const locationMap: { [key: string]: string } = {
            "Barra do Piraí": "BARRA DO PIRAI",
            Valença: "VALENÇA",
            Vassouras: "VASSOURAS",
            "Volta Redonda": "VOLTA REDONDA",
            Pinheiral: "PINHEIRAL",
            Piraí: "PIRAI",
            "Rio das Flores": "RIO DAS FLORES",
            Mendes: "MENDES",
            "Miguel Pereira": "MIGUEL PEREIRA",
            "Paty do Alferes": "PATY DO ALFERES",
        };

        const normalizedLocation =
            locationMap[location] || normalizeText(location);
        return `/imoveis?location=${encodeURIComponent(normalizedLocation)}`;
    };

    return (
        <div className="row justify-content-center row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4">
            {explorePlace.map((item: Place, index: number) => {
                return (
                    <div className="col" key={index}>
                        <div className="position-relative">
                            <Link
                                href={getLocationUrl(item.location)}
                                className="d-flex align-items-center justify-content-start border rounded-pill p-2"
                            >
                                <div className="explod-thumb flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        width="64"
                                        height="64"
                                        className="rounded-circle"
                                        style={{ objectFit: "cover" }} // corta sem distorcer
                                        priority
                                        alt=""
                                    />
                                </div>
                                <div className="explod-caps ps-3">
                                    <h5 className="fs-5 fw-medium mb-0">
                                        {item.location}
                                    </h5>
                                    {/* <p className="text-muted-2 fs-sm m-0">
                                        {item.property}
                                    </p> */}
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
