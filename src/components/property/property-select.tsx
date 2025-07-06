"use client";
import React from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const shorty = [
    { value: "1", label: "Menor Preço" },
    { value: "1", label: "Maior Preço" },
    { value: "1", label: "Mais Populares" },
];

export default function PropertySelect() {
    return (
        <Select
            options={shorty}
            className="form-control"
            placeholder="Mostrar Todos"
        />
    );
}
