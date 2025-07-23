"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SuspenseNavbar from "../../components/navbar/SuspenseNavbar";
import FooterTop from "../../components/footer-top";
import Footer from "../../components/footer";
import AddImg from "../../components/add-img";
import ScrollToTop from "../../components/scroll-to-top";
import SessionWrapper from "@/components/auth/SessionWrapper";
import RealtorForm from "@/components/form/RealtorForm";
import { createRealtor } from "@/services/realtorService";

export default function Page() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: createRealtor,
        onSuccess: () => {
            router.push("/admin/perfil");
        },
    });

    const onSubmit = (data: any) => {
        console.log("Form data submitted:", data);
        mutation.mutate(data);
    };

    return (
        <>
            <SessionWrapper>
                <SuspenseNavbar transparent={false} />
            </SessionWrapper>
            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">
                                Atualize Seu Perfil Labanca
                            </h2>
                            <span className="ipn-subtitle">
                                Mantenha seus dados atualizados para melhor
                                atendimento em Barra do Piraí
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="gray-simple">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="submit-page">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <RealtorForm
                                        register={register}
                                        errors={errors}
                                    />
                                    <div className="form-group col-lg-12 col-md-12">
                                        <button
                                            className="btn btn-primary px-5 rounded"
                                            type="submit"
                                            disabled={mutation.isPending}
                                        >
                                            {mutation.isPending
                                                ? "Salvando..."
                                                : "Atualizar Perfil e Continuar"}
                                        </button>
                                    </div>
                                </form>
                            </div>
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
