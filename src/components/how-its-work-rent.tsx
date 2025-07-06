import React from "react";
import { workDataRent } from "../app/data/data";
import Image from "next/image";

interface WorkData {
    image: string;
    title: string;
    desc: string;
    bg: string;
}

export default function HowItsWorkRent() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                    <div className="sec-heading center">
                        <h2 className="title-text">
                            Conheça o procedimento de Locação.
                        </h2>
                        <p className="normal-text">
                            Descubra como a Labanca Imobiliária simplifica o
                            processo de locação de imóveis em Barra do Piraí.
                            Nosso método é transparente, eficiente e focado em
                            você.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center g-4">
                {workDataRent.map((item: WorkData, index: number) => {
                    return (
                        <div className="col-lg-4 col-md-4" key={index}>
                            <div
                                className={`middle-icon-features-item ${
                                    index === 2 ? "remove" : ""
                                }`}
                            >
                                <div className="icon-features-wrap">
                                    <div
                                        className={`middle-icon-large-features-box ${item.bg}`}
                                    >
                                        <Image
                                            src={item.image}
                                            width={38}
                                            height={38}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="middle-icon-features-content">
                                    <h4>{item.title}</h4>
                                    <p className="normal-text">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
