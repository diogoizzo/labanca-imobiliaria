"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UserNav from "@/components/navbar/user-nav";
import FooterTop from "../../components/footer-top";
import Footer from "../../components/footer";
import ScrollToTop from "../../components/scroll-to-top";
import AdminSidebar from "@/components/admin-sidebar";
import RealtorForm from "@/components/form/RealtorForm";
import { createRealtor } from "@/services/realtorService";

export default function Page() {
    const { data: session } = useSession();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <UserNav />

            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">
                                Cadastre um novo corretor
                            </h2>
                            <span className="ipn-subtitle">
                                Insira os dados no formulário abaixo para criar
                                um novo corretor.
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
                                                : "Criar perfil"}
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
