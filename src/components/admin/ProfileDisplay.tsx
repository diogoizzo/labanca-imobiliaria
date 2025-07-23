"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getRealtor } from "@/services/realtorService";
import LoadingSpinner from "./LoadingSpinner";

export default function ProfileDisplay() {
    const { data: session } = useSession();
    //console.log("Session Data:", session);
    const {
        data: realtor,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["realtor", session?.user?.id],
        queryFn: async () => {
            if (!session?.user?.id) return null;
            return getRealtor(session.user.id);
        },
        enabled: !!session?.user?.id,
    });

    if (isLoading) {
        return (
            <div className="form-submit">
                <h4>Sua Conta Labanca Imobiliária</h4>
                <div className="submit-section">
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="form-submit">
                <h4>Sua Conta Labanca Imobiliária</h4>
                <div className="submit-section">
                    <p>Erro ao carregar dados</p>
                </div>
            </div>
        );
    }

    if (!realtor) {
        return (
            <div className="form-submit">
                <h4>Sua Conta Labanca Imobiliária</h4>
                <div className="submit-section">
                    <p>Nenhum dado encontrado</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-wraper">
            <div className="form-submit">
                <h4>Sua Conta Labanca Imobiliária</h4>
                <div className="submit-section">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label className="mb-2">Seu Nome</label>
                            <p className="form-control">
                                {realtor.fullName || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">E-mail</label>
                            <p className="form-control">
                                {realtor.email || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">Seu Título</label>
                            <p className="form-control">
                                {realtor.title || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">Telefone</label>
                            <p className="form-control">
                                {realtor.phone || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">Endereço</label>
                            <p className="form-control">
                                {realtor.address || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">Cidade</label>
                            <p className="form-control">
                                {realtor.city || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">Estado</label>
                            <p className="form-control">
                                {realtor.state || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">CEP</label>
                            <p className="form-control">
                                {realtor.zipCode || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="mb-2">Sobre</label>
                            <p className="form-control">
                                {realtor.description || "Não informado"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-submit">
                <h4>Contas Sociais</h4>
                <div className="submit-section">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label className="mb-2">Facebook</label>
                            <p className="form-control">
                                {realtor.facebook || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">Twitter</label>
                            <p className="form-control">
                                {realtor.twitter || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">Google Plus</label>
                            <p className="form-control">
                                {realtor.googlePlus || "Não informado"}
                            </p>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="mb-2">LinkedIn</label>
                            <p className="form-control">
                                {realtor.linkedin || "Não informado"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
