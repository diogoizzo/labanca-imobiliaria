import type { Metadata } from "next";
import "./globals.css";
import "../assets/css/styles.css";
import "../assets/css/colors.css";
import QueryClientProviders from "./QueryClientProvider";

export const metadata: Metadata = {
    title: "Labanca Imobiliária - Seu Imóvel em Barra do Piraí",
    description:
        "Labanca Imobiliária: Compra, Venda e Locação de Imóveis em Barra do Piraí. Encontre a casa dos seus sonhos ou o investimento perfeito com a melhor imobiliária da região.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="blue-skin">
                <QueryClientProviders>{children}</QueryClientProviders>
            </body>
        </html>
    );
}
