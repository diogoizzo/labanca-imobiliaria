"use client";

import React from "react";
import AddImg from "@/components/add-img";

export interface RealtorFormData {
    fullName?: string;
    title?: string;
    phone?: string;
    email?: string;
    landline?: string;
    description?: string;
    address?: string;
    address2?: string;
    country?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    password?: string;
    confirmPassword?: string;
}

interface RealtorFormProps {
    realtorData?: RealtorFormData;
    register: any;
    errors: any;
}

export default function RealtorForm({
    realtorData,
    register,
    errors,
}: RealtorFormProps) {
    return (
        <>
            <div className="form-submit middle-logo">
                <h3>Sua Imagem Profissional</h3>
                <div className="submit-section">
                    <div className="form-row">
                        <div className="form-group col-md-12 position-relative">
                            <AddImg />
                        </div>
                    </div>
                </div>
            </div>

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
                                defaultValue={realtorData?.fullName}
                                {...register("fullName")}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">Cargo</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.title}
                                {...register("title")}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">Telefone</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.phone}
                                {...register("phone")}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">E-mail</label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.email ? "is-invalid" : ""
                                }`}
                                defaultValue={realtorData?.email}
                                {...register("email")}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">Telefone Fixo</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.landline}
                                {...register("landline")}
                            />
                        </div>

                        <div className="form-group col-md-12">
                            <label className="mb-2">Descrição</label>
                            <textarea
                                className={`form-control h-120 ${
                                    errors.description ? "is-invalid" : ""
                                }`}
                                defaultValue={realtorData?.description}
                                {...register("description")}
                            ></textarea>
                            {errors.description && (
                                <div className="invalid-feedback">
                                    {errors.description.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-submit">
                <h3>Credenciais de Acesso</h3>
                <div className="submit-section">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label className="mb-2">Senha</label>
                            <input
                                type="password"
                                className={`form-control ${
                                    errors.password ? "is-invalid" : ""
                                }`}
                                {...register("password")}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">Confirmar Senha</label>
                            <input
                                type="password"
                                className={`form-control ${
                                    errors.confirmPassword ? "is-invalid" : ""
                                }`}
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <div className="invalid-feedback">
                                    {errors.confirmPassword.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-submit">
                <h3>Localização</h3>
                <div className="submit-section">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label className="mb-2">Endereço</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.address}
                                {...register("address")}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">Endereço 2</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.address2}
                                {...register("address2")}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">País</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.country}
                                {...register("country")}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">Estado</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.state}
                                {...register("state")}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">Cidade</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.city}
                                {...register("city")}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label className="mb-2">CEP</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.zipCode}
                                {...register("zipCode")}
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
                            <label className="mb-2">Facebook</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.facebook}
                                {...register("facebook")}
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label className="mb-2">Twitter</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.twitter}
                                {...register("twitter")}
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label className="mb-2">LinkedIn</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.linkedin}
                                {...register("linkedin")}
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label className="mb-2">Instagram</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={realtorData?.instagram}
                                {...register("instagram")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group col-lg-12 col-md-12">
                <label className="mb-2">Acordo GDPR *</label>
                <ul className="no-ul-list">
                    <li>
                        <input
                            id="aj-1"
                            className="form-check-input"
                            name="aj-1"
                            type="checkbox"
                            required
                        />
                        <label htmlFor="aj-1" className="form-check-label ms-2">
                            Eu concordo que este site armazene minhas
                            informações enviadas para que possam responder à
                            minha solicitação.
                        </label>
                    </li>
                </ul>
            </div>
        </>
    );
}
