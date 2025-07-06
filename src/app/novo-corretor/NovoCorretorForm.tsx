"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import AddImg from "../../components/add-img";

const createRealtor = async (data: any) => {
    const response = await fetch("/api/realtors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Falha ao criar corretor");
    return response.json();
};

export default function NovoCorretorForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        title: "",
        phone: "",
        landline: "",
        description: "",
        address: "",
        address2: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
    });
    const [gdprAgreed, setGdprAgreed] = useState(false);
    const [error, setError] = useState("");

    const mutation = useMutation({
        mutationFn: createRealtor,
        onSuccess: () => {
            router.push("/admin");
        },
        onError: (error: Error) => {
            setError(error.message);
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem");
            return;
        }

        if (!gdprAgreed) {
            setError("Você deve concordar com os termos GDPR");
            return;
        }

        mutation.mutate({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            title: formData.title,
            phone: formData.phone,
            landline: formData.landline,
            description: formData.description,
            address: formData.address,
            address2: formData.address2,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            zipCode: formData.zipCode,
            facebook: formData.facebook,
            twitter: formData.twitter,
            linkedin: formData.linkedin,
            instagram: formData.instagram,
        });
    };

    return (
        <form className="submit-page" onSubmit={handleSubmit}>
            <div className="form-submit middle-logo">
                <h3>Foto Profissional</h3>
                <div className="submit-section">
                    <div className="form-row">
                        <div className="form-group col-md-12 position-relative">
                            <AddImg />
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of the form JSX remains the same */}
            <div className="form-submit">
                <h3>Informações Básicas</h3>
                <div className="submit-section">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label className="mb-2">
                                Nome Completo
                                <span
                                    className="tip-topdata"
                                    data-tip="Nome Completo do Corretor"
                                >
                                    <i className="fa-solid fa-info"></i>
                                </span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* All other form fields remain the same */}
                        {/* ... */}
                    </div>
                </div>
            </div>

            {/* All other form sections remain the same */}
            {/* ... */}

            <div className="form-group col-lg-12 col-md-12">
                <label>Acordo GDPR *</label>
                <ul className="no-ul-list">
                    <li className="form-check">
                        <input
                            id="aj-1"
                            className="form-check-input"
                            name="gdprAgreed"
                            type="checkbox"
                            checked={gdprAgreed}
                            onChange={(e) => setGdprAgreed(e.target.checked)}
                        />
                        <label htmlFor="aj-1" className="form-check-label">
                            Eu concordo que este site armazene minhas
                            informações enviadas para que possam responder à
                            minha solicitação.
                        </label>
                    </li>
                </ul>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {mutation.isPending && (
                <div className="alert alert-info">Criando conta...</div>
            )}
            <div className="form-group col-lg-12 col-md-12">
                <button
                    className="btn btn-primary px-5 rounded"
                    type="submit"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? (
                        <span>Processando...</span>
                    ) : (
                        <span>Cadastrar Corretor e Continuar</span>
                    )}
                </button>
            </div>
        </form>
    );
}
