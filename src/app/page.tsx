import Link from "next/link";
import FormOne from "./components/form/form-one";
import HowItsWork from "./components/how-its-work";
import GridPropertyOne from "./components/property/grid-property-one";
import ClientOne from "./components/client-one";
import Footer from "./components/footer";
import FooterTop from "./components/footer-top";
import ScrollToTop from "./components/scroll-to-top";
import ExplorePropertyOne from "./components/explore-property-one";
import CtaOne from "./components/property/cta-one";
import Navbar from "./components/navbar/navbar";
import SessionWrapper from "./components/auth/SessionWrapper";

export default function Home() {
    return (
        <>
            <SessionWrapper>
                <Navbar transparent={false} />
            </SessionWrapper>
            <div
                className="image-cover hero-banner"
                style={{
                    backgroundImage: `url('/img/bg-1.jpg')`,
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="container">
                    <div className="hero-search-wrap">
                        <div className="hero-search">
                            <h1>
                                Encontre o Imóvel dos Seus Sonhos em Barra do
                                Piraí
                            </h1>
                        </div>
                        <div className="hero-search-content side-form">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <div className="input-with-icon">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Pesquise por localização, tipo ou características"
                                            />
                                            <img
                                                src="/img/pin.svg"
                                                width="18"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FormOne />
                        </div>
                        <div className="hero-search-action">
                            <Link
                                href="/imoveis"
                                className="btn full-width btn-primary"
                            >
                                Buscar Imóveis
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-10 text-center">
                            <div className="sec-heading center">
                                <h2>
                                    Descubra os Melhores Imóveis em Barra do
                                    Piraí
                                </h2>
                                <p>
                                    A Labanca Imobiliária tem o imóvel perfeito
                                    para você. Seja para morar, investir ou
                                    alugar, nossa seleção exclusiva em Barra do
                                    Piraí atende a todos os desejos e
                                    necessidades.
                                </p>
                            </div>
                        </div>
                    </div>
                    <ExplorePropertyOne />
                </div>
            </section>

            <section className="bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-7 col-md-10 text-center">
                            <div className="sec-heading center">
                                <h2>
                                    Imóveis Recém-Adicionados: Oportunidades
                                    Frescas em Barra do Piraí
                                </h2>
                                <p>
                                    Fique por dentro das últimas novidades do
                                    mercado imobiliário. A Labanca Imobiliária
                                    atualiza constantemente seu portfólio com as
                                    melhores opções de casas, apartamentos e
                                    terrenos.
                                </p>
                            </div>
                        </div>
                    </div>

                    <GridPropertyOne border={false} />

                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
                            <Link
                                href="/imoveis"
                                className="btn btn-primary px-md-5 rounded "
                            >
                                Ver Mais Imóveis
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <HowItsWork />
            </section>
            <CtaOne />
            <section className="gray-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-10 text-center">
                            <div className="sec-heading center">
                                <h2>
                                    O Que Nossos Clientes Dizem Sobre a Labanca
                                    Imobiliária
                                </h2>
                                <p>
                                    A satisfação dos nossos clientes é a nossa
                                    maior conquista. Veja os depoimentos de quem
                                    encontrou o imóvel ideal ou realizou um
                                    excelente negócio com a Labanca Imobiliária
                                    em Barra do Piraí.
                                </p>
                            </div>
                        </div>
                    </div>
                    <ClientOne />
                </div>
            </section>

            <FooterTop bg="theme-bg" />
            <Footer />
            <ScrollToTop />
        </>
    );
}
