"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UserNav from "@/components/navbar/user-nav";
import FooterTop from "../../../components/footer-top";
import Footer from "../../../components/footer";
import AddImg from "../../../components/add-img";
import ScrollToTop from "../../../components/scroll-to-top";
import AdminSidebar from "@/components/admin-sidebar";
import { getRealtor, updateRealtor } from "@/services/realtorService";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import RealtorForm from "@/components/form/RealtorForm";

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const id = session?.user?.id;

    console.log(id);

    const { data, isLoading } = useQuery({
        queryKey: ["realtor", id],
        queryFn: () => getRealtor(id!),
        enabled: !!id,
    });

    const mutation = useMutation({
        mutationFn: (formData: any) => updateRealtor(id!, formData),
        onSuccess: () => router.push("/admin/perfil"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    React.useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    const onSubmit = (formData: any) => {
        mutation.mutate(formData);
    };

    if (isLoading) {
        return (
            <>
                <UserNav />

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
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-md-12">
                                <AdminSidebar
                                    show={sidebarOpen}
                                    setShow={setSidebarOpen}
                                />
                            </div>
                            <div className="col-lg-9 col-md-12">
                                <div className="submit-page">
                                    <div className="form-submit">
                                        <h4>Editar Perfil</h4>
                                        <LoadingSpinner />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
    return (
        <>
            <UserNav />

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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <AdminSidebar
                                show={sidebarOpen}
                                setShow={setSidebarOpen}
                            />
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="submit-page">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <RealtorForm
                                        realtorData={data}
                                        register={register}
                                        errors={errors}
                                    />
                                    <div className="d-flex justify-content-end mt-4">
                                        <button
                                            className="btn btn-primary px-5 rounded"
                                            type="submit"
                                            disabled={mutation.isPending}
                                        >
                                            {mutation.isPending
                                                ? "Salvando..."
                                                : "Atualizar Perfil"}
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
