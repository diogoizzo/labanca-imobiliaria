"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import UserNav from "@/components/navbar/user-nav";
import AdminSidebar from "@/components/admin-sidebar";
import Footer from "@/components/footer";
import FooterTop from "@/components/footer-top";
import ScrollToTop from "@/components/scroll-to-top";
import PropertyForm from "@/components/admin/PropertyForm";
import { getProperty } from "@/services/propertyService";

export default function EditPropertyPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const [show, setShow] = useState(false);

    const {
        data: property,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["property", id],
        queryFn: () => getProperty(id),
        enabled: Boolean(id),
        retry: (failureCount, err: any) => {
            // se for 404, não faz sentido tentar de novo
            if (err?.status === 404) return false;
            return failureCount < 2;
        },
    });

    // 404 -> envia para not-found
    if ((error as any)?.status === 404) {
        router.replace("/not-found");
    }

    const processedProperty = useMemo(() => {
        if (!property) return null as any;
        const propertyNumber =
            (property as any)?.number ?? property.streetNumber ?? "";
        const normalizedNumber =
            typeof propertyNumber === "string"
                ? propertyNumber
                : propertyNumber != null
                ? String(propertyNumber)
                : "";
        return {
            ...property,
            number: normalizedNumber,
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
                    <h2 className="ipt-title">Editar Imóvel</h2>
                    <span className="ipn-subtitle">
                        Atualize as informações do seu imóvel na Labanca
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
                            {isLoading && (
                                <div className="p-4">
                                    Carregando informações do imóvel…
                                </div>
                            )}

                            {isError && !(error as any)?.status && (
                                <div className="alert alert-danger m-0">
                                    Ocorreu um erro ao carregar o imóvel. Tente
                                    novamente.
                                </div>
                            )}

                            {!isLoading && property && (
                                <div className="submit-pages">
                                    <PropertyForm
                                        defaultValues={processedProperty}
                                    />
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
