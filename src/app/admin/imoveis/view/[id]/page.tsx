"use client";
import { ListingStatus } from "@prisma/client";
import { PropertyWithImages } from "@/services/propertyService";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FaPencilAlt } from "react-icons/fa";
import { PROPERTY_TYPE_LABELS } from "@/constants/propertyConstants";
import UserNav from "@/components/navbar/user-nav";
import AdminSidebar from "@/components/admin-sidebar";
import Footer from "@/components/footer";
import FooterTop from "@/components/footer-top";
import ScrollToTop from "@/components/scroll-to-top";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { getProperty } from "@/services/propertyService";
import Link from "next/link";

export default function ViewPropertyPage() {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const [show, setShow] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redireciona para login se não estiver autenticado
    if (status === "unauthenticated") {
        router.push("/");
        return null;
    }

    // Aguarda a sessão ser carregada
    if (status === "loading") {
        return <LoadingSpinner />;
    }

    // Validação de formato do ID
    const isValidUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            id || ""
        );

    // Tratamento de ID inválido (formato incorreto)
    if (id && !isValidUUID) {
        return (
            <div className="container-fluid">
                <UserNav />
                <div className="page-title">
                    <div className="container">
                        <h2 className="ipt-title">Detalhes do Imóvel</h2>
                        <span className="ipn-subtitle">
                            Visualize as informações do imóvel na Labanca
                            Imobiliária
                        </span>
                    </div>
                </div>
                <section className="bg-light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-md-12">
                                <AdminSidebar show={show} setShow={setShow} />
                            </div>
                            <div className="col-lg-9 col-md-12">
                                <div className="alert alert-warning m-0">
                                    ID do imóvel inválido
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FooterTop bg="theme-bg" />
                <Footer />
                <ScrollToTop />
            </div>
        );
    }

    const {
        data: property,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["property", id],
        queryFn: () => getProperty(id),
        enabled: Boolean(id) && status === "authenticated" && isValidUUID,
        staleTime: 300000,
        retry: (failureCount, err: any) => {
            // se for 404, não faz sentido tentar de novo
            if (err?.status === 404) return false;
            return failureCount < 2;
        },
    });

    // Tratamento de ID não encontrado (404)
    if ((error as any)?.status === 404) {
        return (
            <div className="container-fluid">
                <UserNav />
                <div className="page-title">
                    <div className="container">
                        <h2 className="ipt-title">Detalhes do Imóvel</h2>
                        <span className="ipn-subtitle">
                            Visualize as informações do imóvel na Labanca
                            Imobiliária
                        </span>
                    </div>
                </div>
                <section className="bg-light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-md-12">
                                <AdminSidebar show={show} setShow={setShow} />
                            </div>
                            <div className="col-lg-9 col-md-12">
                                <div className="alert alert-warning m-0">
                                    Imóvel não encontrado
                                    <div className="mt-3">
                                        <button
                                            onClick={() =>
                                                router.push("/admin/imoveis")
                                            }
                                            className="btn btn-primary"
                                        >
                                            Voltar à listagem
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FooterTop bg="theme-bg" />
                <Footer />
                <ScrollToTop />
            </div>
        );
    }

    const processedProperty = useMemo(() => {
        if (!property) return null as any;
        return {
            ...property,
            privateAmenities:
                typeof property.privateAmenities === "string"
                    ? JSON.parse(property.privateAmenities)
                    : property.privateAmenities,
            commonAmenities:
                typeof property.commonAmenities === "string"
                    ? JSON.parse(property.commonAmenities)
                    : property.commonAmenities,
        } as any;
    }, [property]);

    return (
        <>
            <UserNav />

            <div className="page-title">
                <div className="container">
                    <h2 className="ipt-title">Detalhes do Imóvel</h2>
                    <span className="ipn-subtitle">
                        Visualize as informações do imóvel na Labanca
                        Imobiliária
                    </span>
                </div>
            </div>

            <section className="bg-light">
                <div className="container-fluid">
                    <div className="filter_search_opt mb-4">
                        <button
                            className="btn btn-dark"
                            onClick={() => setShow((s) => !s)}
                        >
                            Navegação do Painel
                            <i className="fa-solid fa-bars ms-2"></i>
                        </button>
                    </div>

                    <div className="row">
                        {/* Menu lateral */}
                        <div className="col-lg-3 col-md-12">
                            <AdminSidebar show={show} setShow={setShow} />
                        </div>

                        {/* Conteúdo */}
                        <div className="col-lg-9 col-md-12">
                            {isError && !(error as any)?.status && (
                                <div className="alert alert-danger m-0">
                                    Ocorreu um erro ao carregar o imóvel. Tente
                                    novamente.
                                </div>
                            )}

                            {!isLoading && !isError && !property && (
                                <div className="alert alert-warning m-0">
                                    Imóvel não encontrado ou ID inválido.
                                </div>
                            )}

                            {!isLoading && !isError && property && (
                                <div className="dashboard-wraper">
                                    {/* Dados Gerais */}
                                    <div className="form-submit">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4>Dados Gerais</h4>
                                            <Link
                                                href={`/admin/imoveis/${id}`} // ou o caminho de edição que você usa
                                                className="btn d-flex align-items-center justify-content-center p-0"
                                                style={{
                                                    width: "35px",
                                                    height: "35px",
                                                    backgroundColor: "#084da3",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    color: "#ffffff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <FaPencilAlt size={15} />
                                            </Link>
                                        </div>

                                        <div className="submit-section pt-2">
                                            <div className="row">
                                                <div className="form-group col-md-12">
                                                    <label className="fw-bold mb-2">
                                                        Título do Imóvel
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.title ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Status
                                                    </label>
                                                    <p className="form-control">
                                                        <span
                                                            className={`badge ${
                                                                property?.status ===
                                                                "FOR_SALE"
                                                                    ? "bg-success"
                                                                    : "bg-primary"
                                                            }`}
                                                        >
                                                            {property?.status ===
                                                            "FOR_SALE"
                                                                ? "À Venda"
                                                                : "Para Alugar"}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Tipo de Imóvel
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.type
                                                            ? PROPERTY_TYPE_LABELS[
                                                                  property.type as keyof typeof PROPERTY_TYPE_LABELS
                                                              ] || property.type
                                                            : "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Preço
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.price
                                                            ? new Intl.NumberFormat(
                                                                  "pt-BR",
                                                                  {
                                                                      style: "currency",
                                                                      currency:
                                                                          "BRL",
                                                                      minimumFractionDigits: 2,
                                                                  }
                                                              ).format(
                                                                  property.price
                                                              )
                                                            : "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Código de Referência
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.referenceCode ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label className="fw-bold mb-2">
                                                        Descrição
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.description ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Localização */}
                                    <div className="form-submit">
                                        <h4>Localização</h4>
                                        <div className="submit-section pt-2">
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Rua
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.street ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Número
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.streetNumber ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Bairro
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.neighborhood ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Cidade
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.city ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Estado
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.state ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        CEP
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.zipCode ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Latitude
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.latitude ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Longitude
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.longitude ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Características */}
                                    <div className="form-submit">
                                        <h4>Características</h4>
                                        <div className="submit-section pt-2">
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Quartos
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.bedrooms ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Suítes
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.suites ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Banheiros
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.bathrooms ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Vagas de Garagem
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.parkingSpaces ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Cômodos
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.rooms ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Andar
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.floor ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Ano de Construção
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.yearBuilt ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Área Utilizável (m²)
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.usableArea ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Área Total (m²)
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.totalArea ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Condomínio (R$)
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.condoFee
                                                            ? new Intl.NumberFormat(
                                                                  "pt-BR",
                                                                  {
                                                                      style: "currency",
                                                                      currency:
                                                                          "BRL",
                                                                      minimumFractionDigits: 2,
                                                                  }
                                                              ).format(
                                                                  property.condoFee
                                                              )
                                                            : "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        IPTU (R$)
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.iptu
                                                            ? new Intl.NumberFormat(
                                                                  "pt-BR",
                                                                  {
                                                                      style: "currency",
                                                                      currency:
                                                                          "BRL",
                                                                      minimumFractionDigits: 2,
                                                                  }
                                                              ).format(
                                                                  property.iptu
                                                              )
                                                            : "Não informado"}
                                                    </p>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="fw-bold mb-2">
                                                        Idade do Imóvel
                                                    </label>
                                                    <p className="form-control">
                                                        {property?.age ||
                                                            "Não informado"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amenidades */}
                                    <div className="form-submit">
                                        <h4>Amenidades</h4>
                                        <div className="submit-section pt-2">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h5>
                                                        Amenidades Privativas
                                                    </h5>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {processedProperty.privateAmenities &&
                                                        processedProperty
                                                            .privateAmenities
                                                            .length > 0 ? (
                                                            processedProperty.privateAmenities.map(
                                                                (
                                                                    amenity: string
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            amenity
                                                                        }
                                                                        className="badge bg-primary"
                                                                    >
                                                                        {
                                                                            amenity
                                                                        }
                                                                    </span>
                                                                )
                                                            )
                                                        ) : (
                                                            <span className="text-muted">
                                                                Nenhuma
                                                                amenidade
                                                                privativa
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <h5>Amenidades Comuns</h5>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {processedProperty.commonAmenities &&
                                                        processedProperty
                                                            .commonAmenities
                                                            .length > 0 ? (
                                                            processedProperty.commonAmenities.map(
                                                                (
                                                                    amenity: string
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            amenity
                                                                        }
                                                                        className="badge bg-primary"
                                                                    >
                                                                        {
                                                                            amenity
                                                                        }
                                                                    </span>
                                                                )
                                                            )
                                                        ) : (
                                                            <span className="text-muted">
                                                                Nenhuma
                                                                amenidade comum
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            checked={
                                                                property.petsAllowed ||
                                                                false
                                                            }
                                                            disabled
                                                        />
                                                        <label className="form-check-label">
                                                            Aceita Animais
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-3">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            checked={
                                                                property.furnished ||
                                                                false
                                                            }
                                                            disabled
                                                        />
                                                        <label className="form-check-label">
                                                            Mobiliado
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fotos */}
                                    <div className="form-submit">
                                        <h4>Fotos</h4>
                                        <div className="submit-section pt-2">
                                            <div className="row g-3">
                                                {property.images &&
                                                property.images.length > 0 ? (
                                                    property.images.map(
                                                        (image) => (
                                                            <div
                                                                key={image.id}
                                                                className="col-6 col-md-4 col-lg-3"
                                                            >
                                                                <img
                                                                    src={
                                                                        image.url
                                                                    }
                                                                    alt="Imagem do imóvel"
                                                                    className="img-fluid rounded"
                                                                    style={{
                                                                        height: "150px",
                                                                        objectFit:
                                                                            "cover",
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="col-12">
                                                        <p className="text-muted">
                                                            Nenhuma imagem
                                                            disponível
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
