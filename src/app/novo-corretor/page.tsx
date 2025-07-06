import UserNav from "../components/navbar/user-nav";
import FooterTop from "../components/footer-top";
import Footer from "../components/footer";
import ScrollToTop from "../components/scroll-to-top";
import NovoCorretorForm from "./NovoCorretorForm";

export default function Page() {
    return (
        <>
            <UserNav />

            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">
                                Bem-vindo à Equipe Labanca!
                            </h2>
                            <span className="ipn-subtitle">
                                Cadastre um novo corretor para atuar em Barra do
                                Piraí
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <NovoCorretorForm />
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
