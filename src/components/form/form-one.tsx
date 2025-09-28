"use client";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Select = dynamic(() => import("react-select"), { ssr: false });

export interface FormOneRef {
    submit: () => void;
}

export default forwardRef<FormOneRef, {}>(function FormOne(props, ref) {
    const router = useRouter();
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const searchParams = new URLSearchParams();

        if (minPrice.trim()) {
            searchParams.set("minPrice", minPrice.trim());
        }
        if (maxPrice.trim()) {
            searchParams.set("maxPrice", maxPrice.trim());
        }
        if (propertyType) {
            searchParams.set("type", propertyType);
        }
        if (bedrooms) {
            searchParams.set("bedrooms", bedrooms);
        }
        if (location) {
            searchParams.set("location", location);
        }

        const queryString = searchParams.toString();
        router.push(`/imoveis${queryString ? `?${queryString}` : ""}`);
    };

    useImperativeHandle(ref, () => ({
        submit: () => {
            if (formRef.current) {
                formRef.current.requestSubmit();
            }
        },
    }));

    const formRef = React.useRef<HTMLFormElement>(null);

    const propertyTypeOptions = [
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

    const bedroomsOptions = [
        { value: "1", label: "1 Quarto" },
        { value: "2", label: "2 Quartos" },
        { value: "3", label: "3 Quartos" },
        { value: "4", label: "4 Quartos" },
        { value: "5+", label: "5+ Quartos" },
    ];

    const locationOptions = [
        { value: "BARRA DO PIRAI", label: "Barra do Piraí, RJ" },
        { value: "VALENÇA", label: "Valença, RJ" },
        { value: "VASSOURAS", label: "Vassouras, RJ" },
        { value: "VOLTA REDONDA", label: "Volta Redonda, RJ" },
        { value: "PINHEIRAL", label: "Pinheiral, RJ" },
        { value: "PIRAI", label: "Piraí, RJ" },
        { value: "RIO DAS FLORES", label: "Rio das Flores, RJ" },
    ];

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="mb-2">Preço Mínimo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: 50000"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="mb-2">Preço Máximo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: 100000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="mb-2">Tipo de Imóvel</label>
                        <Select
                            options={propertyTypeOptions}
                            className="form-control"
                            placeholder="Mostrar Todos"
                            value={
                                propertyTypeOptions.find(
                                    (option) => option.value === propertyType
                                ) || null
                            }
                            onChange={(selected: any) =>
                                setPropertyType(selected?.value || "")
                            }
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="mb-2">Quartos</label>
                        <Select
                            options={bedroomsOptions}
                            className="form-control"
                            placeholder="Quartos"
                            value={
                                bedroomsOptions.find(
                                    (option) => option.value === bedrooms
                                ) || null
                            }
                            onChange={(selected: any) =>
                                setBedrooms(selected?.value || "")
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                        <label className="mb-2">Localização do Imóvel</label>
                        <Select
                            options={locationOptions}
                            className="form-control"
                            placeholder="Todas as Cidades"
                            value={
                                locationOptions.find(
                                    (option) => option.value === location
                                ) || null
                            }
                            onChange={(selected: any) =>
                                setLocation(selected?.value || "")
                            }
                        />
                    </div>
                </div>
            </div>
        </form>
    );
});
