// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "../assets/css/styles.css";
import "../assets/css/colors.css";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth"; // ajuste o caminho se necessário

import SessionWrapper from "@/components/auth/SessionWrapper";
import QueryClientProviders from "@/components/QueryClientProvider";

export const metadata: Metadata = {
    title: "Labanca Imobiliária - Seu Imóvel em Barra do Piraí",
    description:
        "Labanca Imobiliária: Compra, Venda e Locação de Imóveis em Barra do Piraí. Encontre a casa dos seus sonhos ou o investimento perfeito com a melhor imobiliária da região.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className="blue-skin">
                <SessionWrapper session={session}>
                    <QueryClientProviders>{children}</QueryClientProviders>
                </SessionWrapper>
            </body>
        </html>
    );
}
