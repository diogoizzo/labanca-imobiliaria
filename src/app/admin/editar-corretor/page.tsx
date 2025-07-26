"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SuspenseNavbar from "../../../components/navbar/SuspenseNavbar";
import FooterTop from "../../../components/footer-top";
import Footer from "../../../components/footer";
import AddImg from "../../../components/add-img";
import ScrollToTop from "../../../components/scroll-to-top";
import AdminSidebar from "@/components/admin-sidebar";
import { getRealtor, updateRealtor } from "@/services/realtorService";

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
        return <div>Carregando...</div>;
    }
    return (
        <>
            <SuspenseNavbar transparent={false} />

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
                                    <h3>Informações Básicas</h3>
                                    <div className="submit-section">
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <label className="mb-2">
                                                    Nome Completo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("name")}
                                                    defaultValue={
                                                        data?.fullName
                                                    }
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Cargo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("role")}
                                                    defaultValue={data?.role}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Telefone
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("phone")}
                                                    defaultValue={data?.phone}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    E-mail
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("email")}
                                                    defaultValue={data?.email}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Telefone Fixo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("landline")}
                                                    defaultValue={
                                                        data?.landline
                                                    }
                                                />
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label className="mb-2">
                                                    Descrição
                                                </label>
                                                <textarea
                                                    className="form-control h-120"
                                                    {...register("description")}
                                                    defaultValue={
                                                        data?.description
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-submit">
                                    <h3>Localização</h3>
                                    <div className="submit-section">
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Endereço
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("address")}
                                                    defaultValue={data?.address}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Endereço 2
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("address2")}
                                                    defaultValue={
                                                        data?.address2
                                                    }
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    País
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("country")}
                                                    defaultValue={data?.country}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Estado
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("state")}
                                                    defaultValue={data?.state}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    Cidade
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("city")}
                                                    defaultValue={data?.city}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">
                                                    CEP
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("zipCode")}
                                                    defaultValue={data?.zipCode}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-submit">
                                    <h3>Contas Sociais</h3>
                                    <div className="submit-section">
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Facebook
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("facebook")}
                                                    defaultValue={
                                                        data?.facebook
                                                    }
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Twitter
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("twitter")}
                                                    defaultValue={data?.twitter}
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    LinkedIn
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("linkedin")}
                                                    defaultValue={
                                                        data?.linkedin
                                                    }
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Google Plus
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("googlePlus")}
                                                    defaultValue={
                                                        data?.googlePlus
                                                    }
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Instagram
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("instagram")}
                                                    defaultValue={
                                                        data?.instagram
                                                    }
                                                />
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="mb-2">
                                                    Tumblr
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("tumblr")}
                                                    defaultValue={data?.tumblr}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-lg-12 col-md-12">
                                    <label className="mb-2">
                                        Acordo GDPR *
                                    </label>
                                    <ul className="no-ul-list">
                                        <li>
                                            <input
                                                id="aj-1"
                                                className="form-check-input"
                                                name="aj-1"
                                                type="checkbox"
                                            />
                                            <label
                                                htmlFor="aj-1"
                                                className="form-check-label ms-2"
                                            >
                                                Eu concordo que este site
                                                armazene minhas informações
                                                enviadas para que possam
                                                responder à minha solicitação.
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="form-group col-lg-12 col-md-12">
                                    <button
                                        className="btn btn-primary px-5 rounded"
                                        type="button"
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Atualizar Perfil e Continuar
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
        </>
    );
}
