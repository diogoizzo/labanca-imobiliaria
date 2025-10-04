"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useChangePassword } from "../../../hooks/useChangePassword";
import LoadingSpinner from "../../../components/admin/LoadingSpinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserNav from "../../../components/navbar/user-nav";
import AdminSidebar from "../../../components/admin-sidebar";
import FooterTop from "../../../components/footer-top";
import Footer from "../../../components/footer";
import ScrollToTop from "../../../components/scroll-to-top";

export default function ChangePassword() {
    const { data: session, status } = useSession();
    const router = useRouter();
    let [show, setShow] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const mutation = useChangePassword();

    // Tratamento de loading e autenticação
    if (status === "loading") {
        return <div>Carregando...</div>;
    }

    if (!session || !session.user) {
        // Redireciona para login se não estiver autenticado
        router.push("/login");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validação do lado do cliente
        if (newPassword !== confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        if (newPassword.length < 8) {
            setError("A nova senha deve ter pelo menos 8 caracteres");
            return;
        }

        if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)) {
            setError("A nova senha deve conter letras e números");
            return;
        }

        try {
            const userId = session.user.id;

            await mutation.mutateAsync({
                id: userId,
                oldPassword,
                newPassword,
            });

            setSuccess("Senha atualizada com sucesso!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao atualizar senha");
            }
        }
    };

    return (
        <>
            <UserNav />

            <div className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h2 className="ipt-title">Segurança Labanca</h2>
                            <span className="ipn-subtitle">
                                Proteja seu acesso à plataforma
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-light">
                <div className="container-fluid">
                    <div className="row">
                        {/* Botão de navegação do painel removido para mobile */}
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <AdminSidebar show={show} setShow={setShow} />
                        </div>

                        <div className="col-lg-9 col-md-12">
                            <div className="dashboard-wraper">
                                <div className="form-submit">
                                    <h4>Atualize Sua Senha</h4>
                                    <div className="submit-section">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="form-group col-lg-12 col-md-6">
                                                    <label>Senha Antiga</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={oldPassword}
                                                        onChange={(e) =>
                                                            setOldPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={
                                                            mutation.isPending
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>Nova Senha</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={newPassword}
                                                        onChange={(e) =>
                                                            setNewPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={
                                                            mutation.isPending
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label>
                                                        Confirmar Senha
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        value={confirmPassword}
                                                        onChange={(e) =>
                                                            setConfirmPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={
                                                            mutation.isPending
                                                        }
                                                    />
                                                </div>
                                                {error && (
                                                    <div
                                                        className="alert alert-danger"
                                                        role="alert"
                                                    >
                                                        {error}
                                                    </div>
                                                )}
                                                {success && (
                                                    <div
                                                        className="alert alert-success"
                                                        role="alert"
                                                    >
                                                        {success}
                                                    </div>
                                                )}
                                                <div className="form-group col-lg-12 col-md-12">
                                                    <div className="d-flex justify-content-end w-100">
                                                        <button
                                                            className="btn btn-primary px-5 rounded"
                                                            type="submit"
                                                            disabled={
                                                                mutation.isPending
                                                            }
                                                        >
                                                            {mutation.isPending ? (
                                                                <>
                                                                    <LoadingSpinner />
                                                                    Atualizando...
                                                                </>
                                                            ) : (
                                                                "Atualizar e Proteger Minha Conta"
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
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
