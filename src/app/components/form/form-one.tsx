"use client";
import React from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function FormOne() {
    const minprice = [
        { value: "1", label: "R$ 50.000" },
        { value: "2", label: "R$ 100.000" },
        { value: "3", label: "R$ 200.000" },
        { value: "4", label: "R$ 300.000" },
        { value: "5", label: "R$ 500.000" },
        { value: "6", label: "R$ 1.000.000" },
    ];
    const maxprice = [
        { value: "1", label: "R$ 100.000" },
        { value: "2", label: "R$ 200.000" },
        { value: "3", label: "R$ 300.000" },
        { value: "4", label: "R$ 500.000" },
        { value: "5", label: "R$ 1.000.000" },
        { value: "6", label: "Sem Limite" },
    ];

    const propertyType = [
        { value: "apartamento", label: "Apartamento" },
        { value: "casa", label: "Casa" },
        { value: "terreno", label: "Terreno" },
        { value: "comercial", label: "Comercial" },
        { value: "sitio", label: "Sítio" },
        { value: "chacara", label: "Chácara" },
        { value: "galpao", label: "Galpão" },
        { value: "loja", label: "Loja" },
        { value: "ponto", label: "Ponto Comercial" },
        { value: "sala", label: "Sala Comercial" },
        { value: "studio", label: "Studio" },
        { value: "pousada", label: "Pousada" },
        { value: "cobertura", label: "Cobertura" },
    ];
    const rooms = [
        { value: "1", label: "1 Quarto" },
        { value: "2", label: "2 Quartos" },
        { value: "3", label: "3 Quartos" },
        { value: "4", label: "4 Quartos" },
        { value: "5+", label: "5+ Quartos" },
    ];
    const loction = [
        { value: "barra-do-pirai", label: "Barra do Piraí, RJ" },
        { value: "valenca", label: "Valença, RJ" },
        { value: "vassouras", label: "Vassouras, RJ" },
        { value: "volta-redonda", label: "Volta Redonda, RJ" },
        { value: "pinheiral", label: "Pinheiral, RJ" },
        { value: "pirai", label: "Piraí, RJ" },
        { value: "rio-das-flores", label: "Rio das Flores, RJ" },
    ];
    return (
        <>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="mb-2">Preço Mínimo</label>
                        <Select
                            options={minprice}
                            className="form-control"
                            placeholder="Sem Mínimo"
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="mb-2">Preço Máximo</label>
                        <Select
                            options={maxprice}
                            className="form-control"
                            placeholder="Sem Máximo"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="mb-2">Tipo de Imóvel</label>
                        <Select
                            options={propertyType}
                            className="form-control"
                            placeholder="Mostrar Todos"
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="mb-2">Quartos</label>
                        <Select
                            options={rooms}
                            className="form-control"
                            placeholder="Quartos"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                        <label className="mb-2">Localização do Imóvel</label>
                        <Select
                            options={loction}
                            className="form-control"
                            placeholder="Todas as Cidades"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
