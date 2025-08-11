import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    throw new Error("Email and password are required");

                const user = await prisma.realtor.findUnique({
                    where: { email: credentials.email },
                });
                if (!user || !user.password)
                    throw new Error("Invalid credentials");

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isValid) throw new Error("Invalid credentials");

                return { id: user.id, email: user.email, name: user.fullName };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = (user as any).id;
            return token;
        },
        async session({ session, token }) {
            if (session.user) (session.user as any).id = token.id as string;
            return session;
        },
        async redirect({ baseUrl }) {
            return `${baseUrl}/admin/perfil`;
        },
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/" },
};
