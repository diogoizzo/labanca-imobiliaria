// components/SessionWrapper.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export default function SessionWrapper({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
