import React from "react";
import Link from "next/link";

export default function FooterTop({ bg }: { bg: any }) {
    return (
        <section className={`call-to-act-wrap ${bg}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="call-to-act">
                            <div className="call-to-act-head">
                                <h3>
                                    Quer Vender ou Alugar Seu Imóvel em Barra do
                                    Piraí?
                                </h3>
                                <span>
                                    Conte com a expertise da Labanca Imobiliária
                                    para um processo rápido e seguro.
                                </span>
                            </div>
                            <Link
                                href="/contato"
                                className="btn btn-call-to-act"
                            >
                                Fale Conosco Agora
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
