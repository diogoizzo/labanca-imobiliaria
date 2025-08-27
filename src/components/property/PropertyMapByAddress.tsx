"use client";
import React, { useMemo } from "react";

type Props = {
    endereco: {
        logradouro?: string;
        numero?: string | number;
        bairro?: string;
        cidade?: string;
        estado?: string;
        cep?: string;
        pais?: string;
    };
    zoom?: number; // 1..20
    ratio?: string | number; // "16/9" | "3/2" | 1.777...
    className?: string; // classes extras (ex.: w-100)
};

export default function PropertyMapByAddress({
    endereco,
    zoom = 15,
    ratio = "3/2", // mais alto que 16/9 para dar “corpo” ao mapa
    className = "w-100",
}: Props) {
    // monta endereço
    const partes = [
        endereco.logradouro,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.estado,
        endereco.cep,
        endereco.pais || "Brasil",
    ].filter(Boolean);

    const full = partes.join(", ").trim();
    if (!full) {
        return <p className="text-sm text-gray-500">Endereço indisponível.</p>;
    }

    // calcula a razão (largura/altura) como número
    const aspect = useMemo(() => {
        if (typeof ratio === "number") return ratio > 0 ? ratio : 16 / 9;
        const m = String(ratio).match(/^(\d+)\s*[:/]\s*(\d+)$/);
        if (m) {
            const w = Number(m[1]);
            const h = Number(m[2]);
            return w > 0 && h > 0 ? w / h : 16 / 9;
        }
        const n = Number(ratio);
        return Number.isFinite(n) && n > 0 ? n : 16 / 9;
    }, [ratio]);

    // iframe src
    const src = `https://www.google.com/maps?q=${encodeURIComponent(
        full
    )}&z=${zoom}&output=embed`;

    // wrapper no estilo "intrinsic ratio"
    return (
        <div
            className={className}
            style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                // zera qualquer altura herdada do tema:
                height: "auto",
                minHeight: 0,
            }}
        >
            {/* sizer: altura = largura / aspect */}
            <div aria-hidden style={{ paddingTop: `${100 / aspect}%` }} />
            <iframe
                src={src}
                title={`Mapa: ${full}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                    display: "block",
                }}
            />
        </div>
    );
}
